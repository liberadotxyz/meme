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
// ========== Trading Card Component ==========
interface TradingCardProps {
    tokenName: string;
    tokenIcon?: string;
    price: string;
    marketCap?: string;
    timestamp?: string;
    buyer?: string;
    type: string
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
    type
}: TradingCardProps) => {
    const tokenColor = getTokenColor(tokenName);
    return (
        <div className="space-y-4">
            <div className="bg-gradient-card p-1 shadow-card">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-full border-2 border-primary/20"
                            style={{ backgroundColor: tokenColor }}
                        ></div>
                        <div>
                            <h3 className="font-bold text-foreground text-sm">
                                {buyer?.slice(0, 4)}...{buyer?.slice(-4)}{" "}
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
                    <span className="text-xs text-muted-foreground">{timestamp}</span>
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
}

const TokenCard = ({
    name,
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
    const [buyLoading, setBuyLoading] = useState(false)
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
    return (
        <Link href={`/detail/${pool_address}`}>
            <Card className="bg-gradient-card w-full border-border p-4 shadow-card hover:border-primary/20 transition-all duration-300 mt-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-full border-2 border-primary/20"
                            style={{ backgroundColor: tokenColor }}
                        ></div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-foreground text-sm">{name}</h3>
                                <h3 className="font-bold text-muted-foreground text-sm ml-3">{symbol}</h3>

                            </div>

                            {/* Social Icons */}
                            <div className="text-muted-foreground text-xs flex gap-2 mt-1">
                                {telegram && (
                                    <a href={telegram} target="_blank">
                                        <FaTelegram size={12} />
                                    </a>
                                )}
                                {twitter && (
                                    <a href={`https://twitter.com/${twitter}`} target="_blank">
                                        <FaTwitter size={12} />
                                    </a>
                                )}
                                {discord && (
                                    <a href={discord} target="_blank">
                                        <FaDiscord size={12} />
                                    </a>
                                )}
                                {website && (
                                    <a href={website} target="_blank">
                                        <Globe size={12} />
                                    </a>
                                )}
                            </div>

                            {/* Address */}
                            {address && (
                                <div className="text-muted-foreground text-xs flex items-center mb-1 hover:text-green-500">
                                    <CopyableEthText text={address} />
                                </div>
                            )}

                            {/* Badges */}
                            <div className="text-muted-foreground text-xs flex gap-1 mt-1">
                                <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                    <User size={10} />14
                                </Badge>
                                <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                    <ChefHat size={10} />1%
                                </Badge>
                                <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                    <Crown size={10} />2%
                                </Badge>
                                <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                    <Sprout size={10} className="inline mr-1" />3s
                                </Badge>
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
                            className="h-6 gap-0 w-13 px-3 mt-2 p-0 bg-green-500 hover:bg-green-600 text-black"
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
                            />
                            <TokenCard
                                pool_address={item?.pool_address}
                                name={token?.name || ""}
                                symbol={token?.symbol || ""}
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
