"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyableEthText } from "../ui/copy-text";
import { getLatestToken } from "@/api/topToken";
import { useEffect, useState } from "react";
import SkeletonLoader from "../SkeletonLoader";
import { User, Crown, ChefHat, Globe, Sprout, Plus } from "lucide-react";
import { FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";
import { swap } from "@/api/topToken";
import { useSelector } from "react-redux";
import { State } from "@/redux";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
interface TokenData {
  address: string;
  name: string;
  pool_created_at: string;
  fdv_usd: string;
  market_cap_usd: string | null;
  base_token_price_usd: string;
  price_change_percentage: { h24: string };
  transactions: { h24: { buys: number; sells: number; buyers: number; sellers: number } };
  volume_usd: { h24: string };
  token_address: string;
  social_info: {
    address: string;
    name: string;
    symbol: string;
    logo: string | null;
    total_supply_formatted: string;
    market_cap: string;
    thumbnail: string;
    created_at: string;
    links: {
      telegram?: string;
      twitter?: string;
      discord?: string;
      website?: string;
    };
  }[];
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
export default function LatestComponent() {
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
        const baseInfo = token.social_info?.[0] || {};
        return (
          <div key={index} className="p-2 w-full max-w-4xl">
            <TokenCard
              name={baseInfo.name || token.name.split(" / ")[0]}
              symbol={baseInfo.symbol || token.name.split(" / ")[1] || "WETH"}
              icon={baseInfo.thumbnail || "/images/aaa.png"}
              marketCap={formatNumber(token.fdv_usd)}
              pnl={token.price_change_percentage.h24}
              address={token.token_address}
              pariaddress={token.address}
              holders={formatNumber(token.transactions.h24.buyers + token.transactions.h24.sellers)}
              devHold="1%" // placeholder if no API value
              topHolders="2%" // placeholder if no API value
              createdAgo={timeAgo(baseInfo.created_at || token.pool_created_at)}
              volume={formatNumber(token.volume_usd.h24)}
              txCount={formatNumber(token.transactions.h24.buys + token.transactions.h24.sells)}
              socialLinks={baseInfo.links || {}}
            />
          </div>
        );
      })}
    </div>
  );
}

// Helpers
function formatNumber(numStr: string | number): string {
  const num = typeof numStr === "string" ? parseFloat(numStr) : numStr;
  if (isNaN(num)) return "0";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toFixed(2);
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

interface TokenCardProps {
  name: string;
  symbol: string;
  icon: string;
  marketCap: string;
  pnl?: string;
  address: string;
  holders: string;
  devHold: string;
  topHolders: string;
  createdAgo: string;
  volume: string;
  txCount: string;
  pariaddress: string;
  socialLinks: {
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
  pnl,
  address,
  holders,
  devHold,
  topHolders,
  createdAgo,
  volume,
  txCount,
  socialLinks,
  pariaddress,
}: TokenCardProps) => {
  const isProfitable = pnl && parseFloat(pnl) > 0;
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
    // toast(`succssfully buy worth of ${value} of ${name}`)
  }
  const tokenColor = getTokenColor(name);

  return (
    <Link href={`/detail/${pariaddress}`}>
      <Card className="bg-gradient-card border-border p-4 shadow-card hover:border-primary/20 transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            {/* <img src={icon} alt={name} className="w-12 h-12 rounded-full border-2 border-primary/20" /> */}
            <div
              className="w-8 h-8 rounded-full border-2 border-primary/20"
              style={{ backgroundColor: tokenColor }}
            ></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-foreground text-sm">{name}</h3>
                <h3 className="font-bold text-muted-foreground text-sm">{symbol}</h3>
              </div>

              <div className="flex flex-col gap-1">
                {/* Conditional Social Media Icons */}
                <div className="text-muted-foreground text-xs flex gap-2">
                  {socialLinks.telegram && <a href={socialLinks.telegram} target="_blank"><FaTelegram size={12} /></a>}
                  {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank"><FaTwitter size={12} /></a>}
                  {socialLinks.discord && <a href={socialLinks.discord} target="_blank"><FaDiscord size={12} /></a>}
                  {socialLinks.website && <a href={socialLinks.website} target="_blank"><Globe size={12} /></a>}
                </div>

                <div className="text-muted-foreground text-xs flex items-center mb-1">
                  <CopyableEthText text={shortenAddress(address)} />
                </div>

                <div className="text-muted-foreground text-xs flex gap-1 mt-1">
                  <TooltipBadge icon={<User size={10} />} text={holders} tooltip="Total number of holders" />
                  <TooltipBadge icon={<ChefHat size={10} />} text={devHold} tooltip="Dev team holdings" />
                  <TooltipBadge icon={<Crown size={10} />} text={topHolders} tooltip="Top 10 holder percentage" />
                  <TooltipBadge icon={<Sprout size={10} />} text={createdAgo} tooltip="Token creation time" />
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-muted-foreground text-sm flex items-center gap-1">
              V <span className="text-white">{volume}</span> MCAP
              <span className={`text-${isProfitable ? "green" : "red"}-500`}>{marketCap}</span>
            </div>
            <div className="text-muted-foreground text-xs">TX <span className="text-white">{txCount}</span></div>
            {pnl && <div className={`text-xs mt-1 ${isProfitable ? "text-green-500" : "text-red-500"}`}>{parseFloat(pnl) > 0 ? "+" : ""}{pnl}%</div>}
            <Button className="h-6 px-3 bg-green-500 hover:bg-green-600 text-black"
              onClick={(e) => {
                e.preventDefault(); // prevents navigation
                e.stopPropagation();
                buyToken()
              }}
            >
              <Plus size={14} /> {value}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const TooltipBadge = ({ icon, text, tooltip }: { icon: any; text: string; tooltip: string }) => (
  <div className="relative group">
    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer flex items-center gap-1">
      {icon} {text}
    </Badge>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {tooltip}
    </div>
  </div>
);
