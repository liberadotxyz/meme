"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { State } from "@/redux";
import { getTradeToken } from "@/api/topToken";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUp, User, Crown, ChefHat, Plus, Globe, Sprout } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";
import { CopyableEthText } from "../ui/copy-text";
import Link from "next/link";
import SkeletonLoader from "../SkeletonLoader";
import { Loader2 } from "lucide-react";
import { swap } from "@/api/topToken";
import { toast } from "sonner";
import { getMetaData } from "@/api/topToken";
import Image from "next/image";
import { formatDistanceToNow } from 'date-fns';
import { getTokenDetailHolder } from "@/api/topToken";

// ========== Trading Card Component ==========

type NFTMetadata = {
    description: string;
    image: string;
    name: string;
    properties: {
        discord: string;
        telegram: string;
        twitter: string;
        website: string;
    };
};

interface TradingCardProps {
    tokenName: string;
    tokenIcon?: string;
    price: string;
    marketCap?: string;
    timestamp?: string;
    buyer?: string;
    type: string;
    created_at: string;
    display_image: string;
    display_name: string;
}

const getTokenColor = (tokenName: string) => {
    let hash = 0;
    for (let i = 0; i < tokenName.length; i++) {
        hash = tokenName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    const s = 30 + Math.abs(hash) % 40;
    const l = 40 + Math.abs(hash) % 30;
    return `hsl(${h}, ${s}%, ${l}%)`;
};
const getTokenColors = (tokenName: string) => {
    let hash = 0;
    for (let i = 0; i < tokenName.length; i++) {
        hash = tokenName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    const s = 30 + Math.abs(hash) % 40;
    const l = 40 + Math.abs(hash) % 30;
    return `hsl(${h}, ${s}%, ${l}%)`;
};

export const TradingCard = ({
    buyer,
    tokenName,
    tokenIcon,
    price,
    marketCap,
    timestamp = "26m",
    type,
    created_at,
    display_image,
    display_name
}: TradingCardProps) => {
    const tokenColor = getTokenColor(tokenName);
    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
        if (!created_at) return;

        const updateTimeAgo = () => {
            const createdDate = new Date(created_at); // UTC time
            const now = new Date();
            const diffSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

            let display = "";
            if (diffSeconds < 60) {
                display = `${diffSeconds}s ago`;
            } else if (diffSeconds < 3600) {
                const minutes = Math.floor(diffSeconds / 60);
                const seconds = diffSeconds % 60;
                display = `${minutes}m ${seconds}s ago`;
            } else if (diffSeconds < 86400) {
                const hours = Math.floor(diffSeconds / 3600);
                const minutes = Math.floor((diffSeconds % 3600) / 60);
                display = `${hours}h ${minutes}m ago`;
            } else {
                const days = Math.floor(diffSeconds / 86400);
                const hours = Math.floor((diffSeconds % 86400) / 3600);
                display = `${days}d ${hours}h ago`;
            }

            setTimeAgo(display);
        };

        updateTimeAgo();
        const interval = setInterval(updateTimeAgo, 1000); // refresh every second
        return () => clearInterval(interval);
    }, [created_at]);

    return (
        <div className="space-y-4">
            <div className="bg-gradient-card p-1 shadow-card">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {
                            display_image == "" ? <div
                                className="w-8 h-8 rounded-full border-2 border-primary/20"
                                style={{ backgroundColor: tokenColor }}
                            ></div> : <>
                                <Image
                                    src={display_image}
                                    alt=""
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                ></Image>
                            </>
                        }

                        <div>
                            <h3 className="font-bold text-foreground text-sm ml-2">
                                {display_name}
                                {
                                    type == "buy" ? <Button className="px-4 text-xs bg-green-400 h-4">{type}</Button> :
                                        <Button className="px-4 text-xs bg-red-400 h-4">{type}</Button>
                                }
                            </h3>
                            <div className="text-xs text-foreground">
                                {price} USD at {marketCap} market cap
                            </div>
                        </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {timeAgo}

                    </span>
                </div>
            </div>
        </div>
    );
};

// ========== Token Card Component ==========
interface TokenCardProps {
    name: string;
    symbol: string;
    icon: string;
    pool_address: string;
    marketCap: string;
    address?: string;
    telegram?: string;
    twitter?: string;
    discord?: string;
    website?: string;
    showBoost?: boolean;
    created_at: String;
}

const TokenCard = ({
    name,
    created_at,
    symbol,
    icon,
    marketCap,
    address,
    telegram,
    twitter,
    discord,
    website,
    pool_address,
    showBoost = false,
}: TokenCardProps) => {
    const tokenColor = getTokenColors(symbol);

    const { data: session } = useSession();
    const { value } = useSelector((state: State) => state.buy);
    const [buyLoading, setBuyLoading] = useState(false);
    const [metadata, setMetaData] = useState<NFTMetadata>();
    type HolderDetail = {
        totalHolders: number;
        holdersByAcquisition: {
            swap: number;
            transfer: number;
            airdrop: number;
        };
        holderChange: {
            "5min": {
                change: number;
                changePercent: number;
            };
            "1h": {
                change: number;
                changePercent: number;
            };
            "6h": {
                change: number;
                changePercent: number;
            };
            "24h": {
                change: number;
                changePercent: number;
            };
            "3d": {
                change: number;
                changePercent: number;
            };
            "7d": {
                change: number;
                changePercent: number;
            };
            "30d": {
                change: number;
                changePercent: number;
            };
        };
        holderSupply: {
            top10: {
                supply: string;
                supplyPercent: number;
            };
            top25: {
                supply: string;
                supplyPercent: number;
            };
            top50: {
                supply: string;
                supplyPercent: number;
            };
            top100: {
                supply: string;
                supplyPercent: number;
            };
            top250: {
                supply: string;
                supplyPercent: number;
            };
            top500: {
                supply: string;
                supplyPercent: number;
            };
        };
        holderDistribution: {
            whales: number;
            sharks: number;
            dolphins: number;
            fish: number;
            octopus: number;
            crabs: number;
            shrimps: number;
        };
    };


    const [holderDetail, setHolderDetail] = useState<HolderDetail>();
    const buyToken = async () => {
        setBuyLoading(true);
        try {
            let payload = {
                "username": session?.user.username,
                "address_swapping_from": "0x0000000000000000000000000000000000000000",
                "address_swapping_to": address,
                "amount": value,
            }
            let { message } = await swap(payload);
            toast(message)
        } catch (error) {

        } finally {
            setBuyLoading(false)
        }

    }
    const getMedia = async () => {
        try {
            let { data } = await getMetaData(address?.toLowerCase() || "")
            console.log("result k xa", data);
            let url = `https://ipfs.io/ipfs/${data.metadata}`
            let result = await fetch(url, {
                method: "GET"
            });
            let a = await result.json();
            console.log("aaaaa", a)
            setMetaData(a)
        } catch (error) {

        }
    }

    useEffect(() => {
        getMedia()
    }, [address])

    const getHolder = async () => {
        try {
            let { data } = await getTokenDetailHolder(address?.toLowerCase() || "");
            setHolderDetail(data)
        } catch (error) {

        }

    }

    useEffect(() => {
        getHolder()
    }, [address])

    return (
        <Link href={`/detail/${pool_address}`}>
            <Card className="bg-gradient-card w-full border-border p-4 shadow-card hover:border-primary/20 transition-all duration-300 mt-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {
                            metadata?.image ? <>
                                <Image
                                    src={`https://ipfs.io/ipfs/${metadata?.image.split("//")[1]}`}
                                    alt=""
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                ></Image>
                            </> : <div className="w-13 h-13 rounded-full" style={{ background: `${tokenColor}` }}>
                            </div>
                        }
                        {/* <Image
                            src={`https://ipfs.io/ipfs/${metadata?.image.split("//")[1]}`}
                            alt=""
                            width={50}
                            height={50}
                            className="rounded-full"
                        ></Image> */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-foreground text-sm">{name}</h3>
                                <h3 className="font-bold text-muted-foreground text-sm ml-3">{symbol}</h3>

                            </div>

                            {/* Social Icons */}
                            <div className="text-muted-foreground text-xs flex gap-2 mt-1">
                                {metadata?.properties.telegram && (
                                    <a href={metadata?.properties.telegram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <FaTelegram size={12} className="hover:text-blue-400" />
                                    </a>
                                )}
                                {metadata?.properties.twitter && (
                                    <a href={metadata?.properties.twitter} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                                        <FaTwitter size={12} className="hover:text-blue-400" />
                                    </a>
                                )}
                                {metadata?.properties.discord && (
                                    <a href={metadata?.properties.discord} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                                        <FaDiscord size={12} className="hover:text-purple-400" />
                                    </a>
                                )}
                                {metadata?.properties.website && (
                                    <a href={metadata?.properties.website} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                                        <Globe size={12} className="hover:text-green-400" />
                                    </a>
                                )}
                                <a href={`https://dexscreener.com/base/${address}`}
                                    target="_blank"
                                    className="cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Image
                                        src={`/images/dex.jpg`}
                                        width={15}
                                        height={15}
                                        className="rounded-full"
                                        alt=""
                                    ></Image>
                                </a>
                            </div>

                            {/* Address */}
                            {address && (
                                <div className="text-muted-foreground text-xs flex items-center mb-1 hover:text-green-500">
                                    <CopyableEthText text={address} />
                                </div>
                            )}

                            {/* Badges */}
                            <div className="text-muted-foreground text-xs flex gap-1 mt-1">
                                <div className="relative group">
                                    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                        <User size={10} /> {holderDetail?.totalHolders}
                                    </Badge>
                                    <div className="absolute bottom-full z-20 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                        Total number of holders
                                    </div>
                                </div>

                                {/* <div className="relative group">
                                    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                        <ChefHat size={10} /> {devHolders}%
                                    </Badge>
                                    <div className="absolute bottom-full z-20 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                        The percentage held by dev team
                                    </div>
                                </div> */}

                                <div className="relative group">
                                    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                        <Crown size={10} /> {holderDetail?.holderSupply?.top10.supplyPercent || ""}%
                                    </Badge>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                        Top 10 holder percentage
                                    </div>
                                </div>

                                {/* <div className="relative group">
                                    <Badge className={`p-1 h-4 bg-transparent border border-gray-600 ${isPriceUp ? 'text-green-500' : 'text-red-500'} cursor-pointer`}>
                                        <ArrowUp size={10} className={`inline mr-1 ${!isPriceUp && 'rotate-180'}`} />
                                        {priceChange24h}%
                                    </Badge>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                        24h price change
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Right Side Info */}
                    <div className="text-right">
                        <div className="text-muted-foreground text-sm flex items-center gap-1">
                            MCAP <span className="text-green-500 text-sm font-medium">{marketCap}</span>
                        </div>
                        <Button
                            size="sm"
                            className="h-6 gap-0 min-w-13 px-3 mt-2 p-0 bg-green-500 hover:bg-green-600 text-black"
                            onClick={(e) => {
                                e.preventDefault(); // prevents navigation
                                e.stopPropagation();
                                buyToken()
                            }}
                        >


                            {
                                buyLoading ? <Loader2></Loader2> :
                                    <>
                                        <Plus color="black" size={14} />{value}
                                    </>
                            }

                        </Button>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

// ========== Main Trade Component ==========
export default function TradeComponent() {
    const [loading, setLoading] = useState(false);
    const [tokens, setTokens] = useState<any[]>([]);

    const fetchTokens = async () => {
        setLoading(true);
        try {
            const { data } = await getTradeToken();
            console.log("aaaaaaaaaaaa trade", data)
            setTokens(data || []);
        } catch (err) {
            console.error("Failed to fetch tokens", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTokens();
    }, []);

    if (loading) {
        return (
            <SkeletonLoader></SkeletonLoader>
        )
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full">

            {!loading &&
                tokens.map((item, idx) => {
                    const token = item?.social_info[0];
                    // const stats = item.token_details?.token_stats;

                    return (
                        <div key={idx} className="p-2 w-full max-w-4xl">
                            <TradingCard
                                buyer={item?.buyer}
                                tokenName={token?.name || "Unknown"}
                                // tokenIcon={token?.image?.large || "/images/aaa.png"}
                                price={`${Number(item?.amount_usd || 0).toFixed(3)}`}
                                // marketCap={`$${Number(stats?.fdv_usd || 0).toLocaleString()}`}
                                // timestamp="26m"
                                type={item?.trade_type}
                                created_at={item?.created_at}
                                display_image={item?.display_image || ""}
                                display_name={item?.display_name || ""}

                            />
                            <TokenCard
                                pool_address={item?.pool_address}
                                name={token?.name || ""}
                                symbol={token?.symbol || ""}
                                created_at={item?.created_at}
                                icon={token?.image?.large || "/images/aaa.png"}
                                marketCap={`$${Number(token?.fdv_usd || 0).toLocaleString()}`}
                                address={token?.address || ""}
                                telegram={
                                    token?.telegram_handle
                                        ? `https://t.me/${token.telegram_handle}`
                                        : undefined
                                }
                                twitter={token?.twitter_handle || undefined}
                                discord={token?.discord_url || undefined}
                                website={token?.websites?.[0] || undefined}
                                showBoost={true}
                            />
                        </div>
                    );
                })}
        </div>
    );
}
