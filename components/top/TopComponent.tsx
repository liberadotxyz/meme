"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Crown, ChefHat, Plus, Globe, Sprout } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";
import { CopyableEthText } from "../ui/copy-text";
import { getTopToken } from "@/api/topToken";
import { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader";
import { State } from "@/redux";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { swap } from "@/api/topToken";
import { useSelector } from "react-redux";
import Link from "next/link";
// API types
interface PoolInfo {
  id: string;
  name: string;
  address: string;
  market_cap_usd: number;
  pool_created_at: string;
}

interface TokenDetail {
  address: string;
  name: string;
  symbol: string;
  image_url: string;
  websites: string[];
  discord_url: string | null;
  telegram_handle: string | null;
  twitter_handle: string | null;
  holders: {
    count: number;
    distribution_percentage: {
      top_10: string;
    };
  };
}

interface ApiResponseItem {
  pool_info: PoolInfo;
  token_detail: TokenDetail;
}

interface TokenCardProps {
  name: string;
  symbol: string;
  icon: string;
  marketCap: string;
  address: string;
  holdersCount: number;
  top10Percent: string;
  devPercent: string;
  createdAgo: string;
  pairAddress:string;
  social: {
    telegram?: string;
    twitter?: string;
    discord?: string;
    website?: string;
  };
}

const TokenCard = ({
  name,
  symbol,
  icon,
  marketCap,
  address,
  holdersCount,
  top10Percent,
  devPercent,
  createdAgo,
  social,
  pairAddress
}: TokenCardProps) => {
  const { data: session } = useSession()

  const { value } = useSelector((state: State) => state.buy)
  const buyToken = async () => {
    let payload = {
      "username": session?.user.username,
      "address_swapping_from": "0x0000000000000000000000000000000000000000",
      "address_swapping_to": address,
      "amount": Number(value),
      // "slippage": 50
    }
    let result = await swap(payload);
    console.log("result k aayo", result)
    toast(`succssfully buy worth of ${value} of ${name}`)
  }
  return (
    <Link href={`/detail/${pairAddress}`}>
    <Card className="bg-gradient-card border-border p-4 shadow-card hover:border-primary/20 transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div
            className="w-15 h-15 flex justify-center items-center relative"
            style={{
              borderRadius: "100%",
              border: `2px solid gray`,
            }}
          >
            <img
              src={icon}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 relative"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center">
              <h3 className="font-bold text-foreground text-sm">{name}</h3>
              <h3 className="font-bold text-muted-foreground text-sm ml-3">
                {symbol}
              </h3>
            </div>

            <div className="flex flex-col gap-1">
              {/* Social Links — only show if available */}
              <div className="text-muted-foreground text-xs flex gap-2">
                {social.telegram && (
                  <a
                    href={`https://t.me/${social.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTelegram size={12} />
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={`https://twitter.com/${social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter size={12} />
                  </a>
                )}
                {social.discord && (
                  <a
                    href={social.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDiscord size={12} />
                  </a>
                )}
                {social.website && (
                  <a
                    href={social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe size={12} />
                  </a>
                )}
              </div>

              <div className="text-muted-foreground text-xs flex items-center mb-1 hover:text-green-500">
                <CopyableEthText text={address} />
              </div>

              <div className="text-muted-foreground text-xs flex gap-1 mt-1">
                <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                  <User size={10} />
                  {holdersCount}
                </Badge>
                <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                  <ChefHat size={10} />
                  {devPercent}%
                </Badge>
                <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                  <Crown size={10} />
                  {top10Percent}%
                </Badge>
                <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                  <Sprout size={10} className="inline mr-1" />
                  {createdAgo}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-muted-foreground text-sm flex items-center gap-1">
              MCAP
              <span className="text-green-500 text-sm font-medium">{marketCap}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 gap-0 w-13 px-3 mt-2 p-0 bg-green-500 hover:bg-green-600 text-black"
              onClick={(e) => {
                  e.preventDefault(); // prevents navigation
                  e.stopPropagation();
                  buyToken()
                }}
            >
              <Plus color="black" /> 0.01
            </Button>
          </div>
        </div>
      </div>
    </Card>
    </Link>
  );
};

// Helper to calculate "time ago"
function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default function TopComponent() {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<ApiResponseItem[]>([]);

  const getToken = async () => {
    setLoading(true);
    try {
      const { data } = await getTopToken();
      setTokens(data);
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
    return <SkeletonLoader />;
  }

  return (
    <div className="flex flex-col items-center justify-items-center gap-0">
      {tokens.map(({ pool_info, token_detail }) => (
        <div key={pool_info.id} className="p-2 w-full max-w-4xl gap-0">
          <TokenCard
            name={token_detail?.name}
            symbol={token_detail?.symbol}
            icon={token_detail?.image_url}
            marketCap={`$${(pool_info?.market_cap_usd / 1_000_000).toFixed(2)}M`}
            address={token_detail?.address}
            pairAddress={pool_info.address}
            holdersCount={token_detail?.holders.count}
            devPercent={"1"} // placeholder
            top10Percent={token_detail?.holders.distribution_percentage?.top_10}
            createdAgo={timeAgo(pool_info?.pool_created_at)}
            social={{
              telegram: token_detail?.telegram_handle || undefined,
              twitter: token_detail?.twitter_handle || undefined,
              discord: token_detail?.discord_url || undefined,
              website: token_detail?.websites[0] || undefined,
            }}
          />
        </div>
      ))}
    </div>
  );
}
