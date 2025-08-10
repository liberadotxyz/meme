"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowUp,
  Copy,
  EyeOff,
  Search,
  User,
  Crown,
  ChefHat,
  Plus,
  Dot,
  Globe,
  Sprout,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";
import { CopyableEthText } from "../ui/copy-text";
import { getTopToken } from "@/api/topToken";
import { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader";

interface TokenCardProps {
  name: string;
  symbol: string;
  icon: string;
  marketCap: string;
  pnl?: string;
  pnlPercentage?: string;
  address?: string;
  showBoost?: boolean;
  showPnl?: boolean;
}

const TokenCard = ({
  name,
  symbol,
  icon,
  marketCap,
  pnl,
  pnlPercentage,
  address,
  showBoost = false,
  showPnl = false,
}: TokenCardProps) => {
  const isProfitable =
    pnl && parseFloat(pnl.replace(/[^0-9.-]/g, "")) > 0;
  let progress = 50;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <Card className="bg-gradient-card border-border p-4 shadow-card hover:border-primary/20 transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          
            <img
              src={icon}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 relative"
            />

          <div className="flex flex-col">
            <div className="flex items-center">
              <h3 className="font-bold text-foreground text-sm">
                {name}
              </h3>
              <h3 className="font-bold text-muted-foreground text-sm ml-3">
                {symbol}
              </h3>
            </div>

            <div className="flex flex-col gap-1">
              {/* Social Links */}
              <div className="text-muted-foreground text-xs flex gap-2">
                <FaTelegram size={12} />
                <FaTwitter size={12} />
                <FaDiscord size={12} />
                <Globe size={12} />
              </div>

              {/* Address */}
              <div className="text-muted-foreground text-xs flex items-center mb-1 hover:text-green-500">
                <CopyableEthText
                  text={address || "Awqr...dx11"}
                />
              </div>

              {/* Badges */}
              <div className="text-muted-foreground text-xs flex gap-1 mt-1">
                <div className="relative group">
                  <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                    <User size={10} />
                    14
                  </Badge>
                  <div className="absolute bottom-full z-20 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Total number of holder
                  </div>
                </div>
                <div className="relative group">
                  <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                    <ChefHat size={10} />
                    1%
                  </Badge>
                  <div className="absolute bottom-full z-20 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    The percentage hold by dev team
                  </div>
                </div>
                <div className="relative group">
                  <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                    <Crown size={10} />
                    2%
                  </Badge>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Top 10 holder percentage
                  </div>
                </div>
                <div className="relative group">
                  <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                    <Sprout
                      size={10}
                      className="inline mr-1"
                    />
                    3s
                  </Badge>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    created 3s before
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-muted-foreground text-sm flex items-center gap-1">
              <div>
                V
                <span className="text-white text-sm font-medium">
                  {" "}
                  15K
                </span>
              </div>
              MCAP
              <span className="text-green-500 text-sm font-medium">
                {" "}
                {marketCap}
              </span>
            </div>
            <div className="text-muted-foreground text-xs flex items-center gap-1 justify-end">
              TX
              <span className="text-white text-xs font-medium">
                25K
              </span>
            </div>
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

export default function PresaleComponent() {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<any[]>([]);

  const getToken = async () => {
    setLoading(true);
    try {
      const res = await getTopToken();
      setTokens(res.data || []);
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
      {tokens.map((token, idx) => {
        const social = token.social_info?.[0] || {};
        return (
          <div
            key={idx}
            className="p-2 w-full max-w-4xl gap-0"
          >
            <TokenCard
              name={social.name || token.name || "Unknown"}
              symbol={social.symbol || "N/A"}
              icon={
                social.logo ||
                "https://via.placeholder.com/40x40.png?text=?"
              }
              marketCap={`$${(
                parseFloat(
                  social.market_cap ||
                    token.fdv_usd ||
                    "0"
                )
              ).toLocaleString()}`}
              pnl={`${
                token.price_change_percentage?.h24 || "0"
              }%`}
              pnlPercentage={`${
                token.price_change_percentage?.h24 || "0"
              }%`}
              address={token.token_address}
              showBoost={true}
              showPnl={true}
            />
          </div>
        );
      })}
    </div>
  );
}
