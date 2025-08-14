"use client";
import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronUp, ChevronDown, ImagePlus } from "lucide-react";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { deployToken } from "@/api/topToken";
import { Loader2 } from "lucide-react";
import { saveToken } from "@/api/topToken";
import { NotLoggedIn } from "@/components/NotLoggedIn";
const PINATA_API_KEY = process.env.PINATA_API_KEY!;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET!;
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ethers } from 'ethers'
type FormData = {
    image: File | null;
    name: string;
    symbol: string;
    description: string;
    twitterLink: string;
    websiteLink: string;
    telegramLink: string;
    discordLink: string;
    eth_amount_eth: string;
};

const TokenCreationForm = () => {
    const router = useRouter();
    const { data: session } = useSession()
    const [formData, setFormData] = useState<FormData>({
        image: null,
        name: "",
        symbol: "",
        description: "",
        twitterLink: "",
        websiteLink: "",
        telegramLink: "",
        discordLink: "",
        eth_amount_eth: "0.00",
    });
    const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLessOptionsOpen, setIsLessOptionsOpen] = useState(false);
    const [errors, setErrors] = useState({
        image: "",
        name: "",
        symbol: ""
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, image: file }));
        setErrors(prev => ({ ...prev, image: "" }));
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "name" || name === "symbol") {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            image: "",
            name: "",
            symbol: ""
        };

        if (!formData.image) {
            newErrors.image = "Token image is required";
            valid = false;
        }
        if (!formData.name.trim()) {
            newErrors.name = "Token name is required";
            valid = false;
        }
        if (!formData.symbol.trim()) {
            newErrors.symbol = "Token symbol is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const uploadFileToPinata = async (file: File) => {
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

        const data = new FormData();
        data.append("file", file);

        const metadata = JSON.stringify({
            name: file.name,
        });
        data.append("pinataMetadata", metadata);

        const res = await axios.post(url, data, {
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "multipart/form-data",
                pinata_api_key: "d86aa0fa71d8ae0e415b",
                pinata_secret_api_key: "c1cbfd9c7eb3ac8ece55a90d3e26c8d1cee24136104ae452285b316621c216fd",
            },
        });

        return res.data.IpfsHash;
    };

    const uploadJSONToPinata = async (json: object) => {
        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

        const res = await axios.post(url, json, {
            headers: {
                pinata_api_key: "d86aa0fa71d8ae0e415b",
                pinata_secret_api_key: "c1cbfd9c7eb3ac8ece55a90d3e26c8d1cee24136104ae452285b316621c216fd",
            },
        });

        return res.data.IpfsHash;
    };

    const uploadToPinata = async () => {
        // Upload image first
        const imageCID = await uploadFileToPinata(formData.image!);

        // Create metadata JSON linking to imageCID
        const metadata = {
            name: formData.name,
            description: formData.description || "",
            image: `ipfs://${imageCID}`,
            properties: {
                website: formData.websiteLink,
                twitter: formData.twitterLink,
                telegram: formData.telegramLink,
                discord: formData.discordLink,
            },
        };

        // Upload metadata JSON
        const metadataCID = await uploadJSONToPinata(metadata);

        return {
            imageCID,
            metadataCID,
            metadataURI: metadataCID,
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const { metadataURI } = await uploadToPinata();
            console.log("Metadata URI:", metadataURI);

            const payload = {
                username: session?.user.address,
                name: formData.name,
                symbol: formData.symbol,
                metadata: metadataURI,
                eth_amount_eth: parseFloat(formData.eth_amount_eth) || 0,
            };

            console.log("Payload:", payload);
            const data = await deployToken(payload);
            console.log("deployed response", data);

            if (data.error) {
                try {
                    const errorObj = JSON.parse(data.error.replace(/'/g, '"'));
                    let errorMessage = errorObj.message;

                    if (errorMessage.includes('insufficient funds')) {
                        errorMessage = "Your wallet doesn't have enough ETH to cover the transaction costs.";
                    }

                    toast.error(errorMessage);
                } catch (e) {
                    toast.error("Transaction failed. Please try again.");
                }

                setLoading(false);
                return;
            }
            let payload2 = {
                username: session?.user.address,
                token_address: data.token_address,
                pool_address: data.pool_address,
                name: formData.name,
                symbol: formData.symbol
            }

            await saveToken(payload2);
            alert("Successfully launched!!!")
            // router.push(`/detail/${data.pool_address}`);
        } catch (error) {
            console.error("Pinata upload failed:", error);
            alert("Upload failed: " + (error as Error).message);
            setLoading(false);
        }
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    if (!session?.user.address) {
        return (
            <NotLoggedIn />
        )
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className="p-6 bg-card space-y-6 rounded-md"
                >
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-1">
                            <label className="text-md text-muted-foreground">Token Image</label>
                            <span className="text-red-500">*</span>
                        </div>
                        <div
                            onClick={triggerFileInput}
                            className={`upload-area flex items-center justify-center h-32 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors ${errors.image ? "border-red-500 border-2" : "border border-white"
                                }`}
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <>
                                    <ImagePlus className="w-8 h-8 text-primary mb-2" />
                                    <span className="text-sm text-muted-foreground">
                                        Upload image (required)
                                    </span>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                ref={fileInputRef}
                                required
                            />
                        </div>
                        {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image}</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-muted-foreground">Name</label>
                                <span className="text-red-500">*</span>
                            </div>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`h-12 ${errors.name ? "border-red-500" : ""}`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name}</p>
                            )}
                        </div>

                        {/* Symbol Field */}
                        <div>
                            <div className="flex items-center gap-1">
                                <label className="text-md text-muted-foreground">Ticker</label>
                                <span className="text-red-500">*</span>
                            </div>
                            <Input
                                name="symbol"
                                value={formData.symbol}
                                onChange={handleInputChange}
                                className={`h-12 ${errors.symbol ? "border-red-500" : ""}`}
                            />
                            {errors.symbol && (
                                <p className="text-red-500 text-sm">{errors.symbol}</p>
                            )}
                        </div>

                        {/* Description Field */}
                        <div>
                            <label className="text-md text-muted-foreground">
                                Description
                            </label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="h-20"
                            />
                        </div>
                    </div>

                    {/* ETH amount */}
                    <div>
                        <label className="text-md text-muted-foreground">Initial Buy</label>
                        <div className="relative flex">
                            <Input
                                type="number"
                                name="eth_amount_eth"
                                value={formData.eth_amount_eth}
                                onChange={handleInputChange}
                                step="0.01"
                                min="0"
                                required
                                className="h-12"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                                ETH
                            </span>
                        </div>
                    </div>

                    {/* Optional links */}
                    <Collapsible
                        open={isLessOptionsOpen}
                        onOpenChange={setIsLessOptionsOpen}
                    >
                        <CollapsibleTrigger className="flex items-center gap-2">
                            {isLessOptionsOpen ? <ChevronUp /> : <ChevronDown />}
                            <span>More Options</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-4">
                            {/* Website Link */}
                            <div className="space-y-2">
                                <label htmlFor="websiteLink" className="text-sm text-muted-foreground">Website link (optional)</label>
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <TbWorld />
                                    </span>
                                    <Input
                                        id="websiteLink"
                                        name="websiteLink"
                                        value={formData.websiteLink}
                                        onChange={handleInputChange}
                                        placeholder="https://yourwebsite.com"
                                        className="pl-8 bg-input border-border h-12"
                                    />
                                </div>
                            </div>

                            {/* Twitter/X Link */}
                            <div className="space-y-2">
                                <label htmlFor="twitterLink" className="text-sm text-muted-foreground">Twitter/X link (optional)</label>
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <FaTwitter />
                                    </span>
                                    <Input
                                        id="twitterLink"
                                        name="twitterLink"
                                        value={formData.twitterLink}
                                        onChange={handleInputChange}
                                        placeholder="https://twitter.com/username"
                                        className="pl-8 bg-input border-border h-12"
                                    />
                                </div>
                            </div>

                            {/* Telegram Link */}
                            <div className="space-y-2">
                                <label htmlFor="telegramLink" className="text-sm text-muted-foreground">Telegram link (optional)</label>
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <FaTelegram />
                                    </span>
                                    <Input
                                        id="telegramLink"
                                        name="telegramLink"
                                        value={formData.telegramLink}
                                        onChange={handleInputChange}
                                        placeholder="https://t.me/username"
                                        className="pl-8 bg-input border-border h-12"
                                    />
                                </div>
                            </div>

                            {/* Discord Link */}
                            <div className="space-y-2">
                                <label htmlFor="discordLink" className="text-sm text-muted-foreground">Discord link (optional)</label>
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <FaDiscord />
                                    </span>
                                    <Input
                                        id="discordLink"
                                        name="discordLink"
                                        value={formData.discordLink}
                                        onChange={handleInputChange}
                                        placeholder="https://discord.gg/invitecode"
                                        className="pl-8 bg-input border-border h-12"
                                    />
                                </div>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>

                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                        {
                            loading ? <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Uploading...
                            </> : "Submit"
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default TokenCreationForm;