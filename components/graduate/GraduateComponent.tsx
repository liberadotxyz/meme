"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyableEthText } from "../ui/copy-text";
import { getLatestToken } from "@/api/topToken";
import { useEffect, useState } from "react";
import SkeletonLoader from "../SkeletonLoader";

import {
  User,
  Crown,
  ChefHat,
  Globe,
  Sprout,
  Plus,
} from "lucide-react";
import { FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";

interface TokenData {
  address: string; // pool address
  name: string; // pair name e.g. "NOTICE / WETH"
  pool_created_at: string;
  fdv_usd: string;
  market_cap_usd: string | null;
  base_token_price_usd: string;
  price_change_percentage: {
    m5: string;
    m15: string;
    m30: string;
    h1: string;
    h6: string;
    h24: string;
  };
  transactions: {
    h24: {
      buys: number;
      sells: number;
      buyers: number;
      sellers: number;
    };
  };
  volume_usd: {
    h24: string;
  };
  token_address: string;
  social_info: {
    address: string;
    name: string;
    symbol: string;
    logo: string | null;
    total_supply_formatted: string;
    market_cap: string;
    thumbnail:string
  }[];
}

export default function GraduateComponent() {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<TokenData[]>([]);

  const getToken = async () => {
    setLoading(true);
    try {
      const { data } = await getLatestToken();
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

  if (loading) return <SkeletonLoader />;

  return (
    <div className="flex flex-col items-center gap-0">
      {tokens.map((token, index) => {
        const baseInfo = token.social_info?.[0];
        return (
          <div key={index} className="p-2 w-full max-w-4xl">
            <TokenCard
              name={baseInfo?.name || token.name.split(" / ")[0]}
              symbol={baseInfo?.symbol || token.name.split(" / ")[1] || "WETH"}
              icon={baseInfo?.thumbnail || "/images/aaa.png"}
              marketCap={`$${formatNumber(token.fdv_usd)}`}
              pnl={token.price_change_percentage.h24}
              address={shortenAddress(token.token_address)}
              showBoost={true}
              showPnl={true}
              
            />
          </div>
        );
      })}
    </div>
  );
}

// Helpers
function formatNumber(numStr: string): string {
  const num = parseFloat(numStr);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toFixed(2);
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

interface TokenCardProps {
  name: string;
  symbol: string;
  icon: string;
  marketCap: string;
  pnl?: string;
  address?: string;
  showBoost?: boolean;
  showPnl?: boolean;
  logo?: string
}

const TokenCard = ({
  name,
  symbol,
  icon,
  marketCap,
  pnl,
  address,
  showBoost = false,
  showPnl = false,
  logo,
}: TokenCardProps) => {
  const isProfitable = pnl && parseFloat(pnl.replace(/[^0-9.-]/g, "")) > 0;

  return (
    <Card className="bg-gradient-card border-border p-4 shadow-card hover:border-primary/20 transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div>
            <img
              src={icon}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
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
              <div className="text-muted-foreground text-xs flex gap-2">
                <FaTelegram size={12} />
                <FaTwitter size={12} />
                <FaDiscord size={12} />
                <Globe size={12} />
              </div>
              <div className="text-muted-foreground text-xs flex items-center mb-1 hover:text-green-500">
                <CopyableEthText text={address || ""} />
              </div>

              {/* Stats badges */}
              <div className="text-muted-foreground text-xs flex gap-1 mt-1">
                <TooltipBadge icon={<User size={10} />} text="14" tooltip="Total number of holder" />
                <TooltipBadge icon={<ChefHat size={10} />} text="1%" tooltip="The percentage held by dev team" />
                <TooltipBadge icon={<Crown size={10} />} text="2%" tooltip="Top 10 holder percentage" />
                <TooltipBadge icon={<Sprout size={10} className="inline mr-1" />} text="3s" tooltip="Created 3s before" />
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-muted-foreground text-sm flex items-center gap-1">
              <div>
                V <span className="text-white text-sm font-medium">15K</span>
              </div>
              MCAP
              <span className={`text-${isProfitable ? "green" : "red"}-500 text-sm font-medium`}>
                {marketCap}
              </span>
            </div>
            <div className="text-muted-foreground text-xs flex items-center gap-1 justify-end">
              TX
              <span className="text-white text-xs font-medium">25K</span>
            </div>
            {showPnl && pnl && (
              <div className={`text-xs mt-1 ${isProfitable ? "text-green-500" : "text-red-500"}`}>
                {parseFloat(pnl) > 0 ? "+" : ""}
                {pnl}%
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 gap-0 w-13 px-3 mt-2 p-0 bg-green-500 hover:bg-green-600 text-black"
            >
              <Plus color="black" />
              0.01
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const TooltipBadge = ({ icon, text, tooltip }: { icon: any; text: string; tooltip: string }) => (
  <div className="relative group">
    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer flex items-center gap-1">
      {icon}
      {text}
    </Badge>
    <div className="absolute bottom-full z-20 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
      {tooltip}
    </div>
  </div>
);
