"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, Copy, EyeOff, Search, User, Crown, ChefHat, Plus, Dot, Globe, Sprout } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { CopyableEthText } from "../ui/copy-text";
import { useEffect, useState } from "react";
import SkeletonLoader from "../SkeletonLoader";
import Link from "next/link";
import { State } from '@/redux';
import { useSelector } from 'react-redux';
import { swap } from "@/api/topToken";
import { useSession } from "next-auth/react";
import { getRecent } from "@/api/topToken";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
export default function OurPlatform() {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<any[]>([]);

  const getToken = async () => {
    setLoading(true);
    try {
      const response = await getRecent();
      console.log("response", response)
      if (response && response.data) {
        setTokens(response.data);
      }
    } catch (error) {
      console.error("Error fetching tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (loading) {
    return (
      <SkeletonLoader></SkeletonLoader>
    );
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen gap-0 max-w-4xl">
      {tokens.length > 0 && tokens?.map((token) => {
        const tokenDetail = token?.token_detail;
        const tokenStats = token?.token_stats;
        const socailState = token?.social_info;
        const marketCap = tokenStats?.market_cap_usd
          ? `$${(parseFloat(tokenStats?.market_cap_usd) / 1000000).toFixed(2)}M`
          : "N/A";

        const formattedAddress = tokenDetail?.address
          ? `${tokenDetail?.address.slice(0, 4)}...${tokenDetail?.address.slice(-4)}`
          : "";



        // Get social links
        const discordUrl = tokenDetail?.discord_url || "";
        const twitterHandle = tokenDetail?.twitter_handle
          ? `https://twitter.com/${tokenDetail?.twitter_handle}`
          : "";
        const websiteUrl = tokenDetail?.websites?.[0] || "";

        // Get holder distribution
        const holderDistribution = tokenDetail?.holders?.distribution_percentage || {
          top_10: "0",
          "11_30": "0",
          "31_50": "0",
          rest: "0"
        };

        // Get price change percentage
        const priceChange24h = tokenStats?.price_change_percentage?.h24 || "0";
        const isPriceUp = parseFloat(priceChange24h) > 0;

        // Format volume
        const volume24h = tokenStats?.volume_usd?.h24
          ? `$${(parseFloat(tokenStats?.volume_usd.h24) / 1000000).toFixed(2)}M`
          : "N/A";

        return (
          <div key={tokenStats?.address} className="p-2 w-full max-w-4xl gap-0">
            <TokenCard
              name={tokenDetail?.name}
              symbol={tokenDetail?.symbol}
              icon={tokenDetail?.image_url || "/images/aaa.png"}
              marketCap={marketCap}
              address={tokenDetail?.address}
              formattedAddress={formattedAddress}
              priceChange24h={priceChange24h}
              pairAddress={tokenStats?.address}
              isPriceUp={isPriceUp}
              volume24h={volume24h}
              holdersCount={tokenDetail?.holders?.count || 0}
              top10Holders={holderDistribution.top_10}
              devHolders={holderDistribution["11_30"]} // Using 11-30% as proxy for dev holdings
              twitterHandle={twitterHandle}
              discordUrl={discordUrl}
              websiteUrl={websiteUrl}
              transactions24h={token.total_buys_24h + token.total_sells_24h}
            />
          </div>
        );
      })}
    </div>
  );
}

interface TokenCardProps {
  name: string;
  symbol: string;
  icon: string;
  marketCap: string;
  address?: string;
  formattedAddress?: string;
  priceChange24h?: string;
  isPriceUp?: boolean;
  volume24h?: string;
  holdersCount?: number;
  top10Holders?: string;
  devHolders?: string;
  twitterHandle?: string;
  discordUrl?: string;
  websiteUrl?: string;
  transactions24h?: number;
  pnl?: string;
  pnlPercentage?: string;
  showBoost?: boolean;
  showPnl?: boolean;
  pairAddress?: string
}

const TokenCard = ({
  name,
  symbol,
  icon,
  marketCap,
  address = "",
  formattedAddress = "",
  priceChange24h = "0",
  isPriceUp = false,
  volume24h = "N/A",
  holdersCount = 0,
  top10Holders = "0",
  devHolders = "0",
  twitterHandle = "",
  discordUrl = "",
  websiteUrl = "",
  transactions24h = 0,
  pnl,
  pnlPercentage,
  showBoost = false,
  showPnl = false,
  pairAddress
}: TokenCardProps) => {
  const tokenColor = getTokenColor(name);

  const isProfitable = pnl && parseFloat(pnl.replace(/[^0-9.-]/g, "")) > 0;
  const progress = 50;
  const radius = 20;
  const { data: session } = useSession()
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const { value } = useSelector((state: State) => state.buy)
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
    <Link href={`/detail/${pairAddress}`}>
      <Card className="bg-gradient-card border-border gap-0 p-4 shadow-card hover:border-primary/20 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-15 h-15 flex justify-center items-center relative">
              <div
                className="w-12 h-12 rounded-full border-2 border-primary/20"
                style={{ backgroundColor: tokenColor }}
              ></div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center">
                <h3 className="font-bold text-foreground text-sm">{name}</h3>
                <h3 className="font-bold text-muted-foreground text-sm ml-3">
                  {symbol}
                </h3>
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-muted-foreground text-xs flex gap-2">
                  {twitterHandle && (
                    <a href={twitterHandle} target="_blank" rel="noopener noreferrer">
                      <FaTwitter size={12} className="hover:text-blue-400" />
                    </a>
                  )}
                  {discordUrl && (
                    <a href={discordUrl} target="_blank" rel="noopener noreferrer">
                      <FaDiscord size={12} className="hover:text-purple-400" />
                    </a>
                  )}
                  {websiteUrl && (
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                      <Globe size={12} className="hover:text-green-400" />
                    </a>
                  )}
                </div>

                <div className="text-muted-foreground text-xs flex items-center mb-1 hover:text-green-500">
                  <CopyableEthText text={pairAddress || ""} />
                </div>

                <div className="text-muted-foreground text-xs flex gap-1 mt-1">
                  <div className="relative group">
                    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                      <User size={10} /> {holdersCount > 1000 ? `${(holdersCount / 1000).toFixed(1)}K` : holdersCount}
                    </Badge>
                    <div className="absolute bottom-full z-20 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      Total number of holders
                    </div>
                  </div>

                  <div className="relative group">
                    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                      <ChefHat size={10} /> {devHolders}%
                    </Badge>
                    <div className="absolute bottom-full z-20 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      The percentage held by dev team
                    </div>
                  </div>

                  <div className="relative group">
                    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                      <Crown size={10} /> {top10Holders}%
                    </Badge>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      Top 10 holder percentage
                    </div>
                  </div>

                  <div className="relative group">
                    <Badge className={`p-1 h-4 bg-transparent border border-gray-600 ${isPriceUp ? 'text-green-500' : 'text-red-500'} cursor-pointer`}>
                      <ArrowUp size={10} className={`inline mr-1 ${!isPriceUp && 'rotate-180'}`} />
                      {priceChange24h}%
                    </Badge>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      24h price change
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-muted-foreground text-sm flex items-center gap-1">
                <div>
                  V<span className="text-white text-sm font-medium"> {volume24h}</span>
                </div>
                MCAP<span className="text-white text-sm font-medium"> {marketCap}</span>
              </div>
              <div className="text-muted-foreground text-xs flex items-center gap-1 justify-end">
                TX<span className="text-white text-xs font-medium"> {transactions24h > 1000 ? `${(transactions24h / 1000).toFixed(1)}K` : transactions24h}</span>
              </div>
              <Button
                size="sm"
                className="h-6 gap-0 w-15 px-3 mt-2 p-0 bg-green-500 hover:bg-green-600 text-black"
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
        </div>

        {showPnl && pnl && pnlPercentage && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">P&L:</span>
                <div className={`flex items-center gap-1 ${isProfitable ? 'text-trading-success' : 'text-trading-danger'}`}>
                  <span className="font-bold">{pnl}</span>
                  <ArrowUp className={`h-4 w-4 ${!isProfitable && 'rotate-180'}`} />
                  <span className="font-semibold">{pnlPercentage}</span>
                </div>
              </div>
              <div className="text-muted-foreground text-sm">{marketCap} MC</div>
            </div>
          </div>
        )}
      </Card>
    </Link>

  );
};