"use client";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronUp, ChevronDown, ImagePlus } from "lucide-react";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

type FormData = {
  image: File | null;
  name: string;
  ticker: string;
  description: string;
  twitterFeeShare: string;
  initialBuy: string;
  websiteLink: string;
  twitterLink: string;
  telegramLink: string;
  discordLink: string;
};

const TokenCreationForm = () => {
    const [isLessOptionsOpen, setIsLessOptionsOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        image: null,
        name: "",
        ticker: "",
        description: "",
        twitterFeeShare: "",
        initialBuy: "0.00",
        websiteLink: "",
        twitterLink: "",
        telegramLink: "",
        discordLink: ""
    });
    
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prepare the payload
        const payload = {
            ...formData,
            // Convert image to base64 if needed for backend
            image: imagePreview,
            initialBuy: parseFloat(formData.initialBuy) || 0
        };
        
        console.log("Submitting form with payload:", payload);
        // Here you would typically send the payload to your API
        // Example:
        // try {
        //     const response = await fetch('/api/create-token', {
        //         method: 'POST',
        //         body: JSON.stringify(payload),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     const data = await response.json();
        //     console.log("Token created:", data);
        // } catch (error) {
        //     console.error("Error creating token:", error);
        // }
        
        // For demo purposes, we'll just log to console
        alert("Form submitted successfully! Check console for payload.");
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto ">
                <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-card border-none rounded-md">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <div
                            onClick={triggerFileInput}
                            className="upload-area flex flex-col items-center justify-center h-32 rounded-lg cursor-pointer border border-dashed border-border hover:border-primary transition-colors"
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
                                    <span className="text-sm text-muted-foreground">Upload image</span>
                                </>
                            )}
                            <input
                                ref={fileInputRef}
                                id="image-upload"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Name Field */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-md text-muted-foreground">Name</label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Token name"
                            className="form-input bg-input border-border text-foreground p-2 h-12"
                            required
                        />
                    </div>

                    {/* Ticker Field */}
                    <div className="space-y-2">
                        <label htmlFor="ticker" className="text-md text-muted-foreground">Ticker</label>
                        <Input
                            id="ticker"
                            name="ticker"
                            value={formData.ticker}
                            onChange={handleInputChange}
                            placeholder="Token symbol"
                            className="form-input bg-input border-border text-foreground h-12 p-2"
                            required
                        />
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-md text-muted-foreground">Description</label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Token description"
                            className="form-input bg-input border-border text-foreground min-h-[80px] resize-none"
                            required
                        />
                    </div>

                    {/* Share Fees Section */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="twitterFeeShare" className="text-md text-muted-foreground">
                                @ Share fees with a twitter account (optional)
                            </label>
                            <Input
                                id="twitterFeeShare"
                                name="twitterFeeShare"
                                value={formData.twitterFeeShare}
                                onChange={handleInputChange}
                                placeholder="Twitter username"
                                className="form-input bg-input border-border text-foreground h-12 p-2"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            The twitter user above will be able to claim 90% of the fees generated by this coin, you will receive the remaining 10%
                        </p>
                    </div>

                    {/* Initial Buy Section */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="initialBuy" className="text-md text-muted-foreground">Initial Buy</label>
                            <div className="relative flex">
                                <Input
                                    id="initialBuy"
                                    name="initialBuy"
                                    type="number"
                                    value={formData.initialBuy}
                                    onChange={handleInputChange}
                                    className="form-input bg-input border-border text-foreground pl-8 p-2 h-12"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                    ETH
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Make sure to leave ~0.05 ETH for tx fees
                        </p>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                <span className="text-muted-foreground">0 ETH</span>
                            </div>
                            <span className="text-foreground">$0</span>
                        </div>

                        {/* Less Options */}
                        <Collapsible open={isLessOptionsOpen} onOpenChange={setIsLessOptionsOpen}>
                            <CollapsibleTrigger className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                                {isLessOptionsOpen ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                                <span className="text-sm font-medium">Less options</span>
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
                    </div>

                    {/* Submit Button */}
                    <Button 
                        type="submit"
                        className="w-full gradient-button text-primary-foreground font-medium py-3 rounded-lg bg-green-500 hover:bg-green-600 transition-colors"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default TokenCreationForm;