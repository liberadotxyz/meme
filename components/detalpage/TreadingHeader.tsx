// components/detalpage/TreadingHeader.tsx
"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Globe } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { FaTwitter, FaDiscord, FaTelegram } from "react-icons/fa";
import Image from "next/image";
interface TokenHeaderProps {
  token: any;
  stats: any;
}

const TokenHeader = ({ token, stats }: TokenHeaderProps) => {
  const { data: session } = useSession()
  const handleCopyAddress = () => {
    if (session?.user?.address) {
      navigator.clipboard.writeText(token?.address)
        .then(() => {
          // Optional: Show a toast/notification (e.g., "Copied!")
          toast("address copied!!!")
          console.log("Address copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy address:", err);
        });
    }
  };
  return (
    <div className="bg-surface-elevated border-b border-1 border-[#4a4747] p-4 mb-1">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center space-x-4">
          {/* Token Logo */}
          <div className="flex items-center space-x-3">
            {token?.image_url ? (
              <img
                src={token.image_url}
                alt={token.name}
                className="w-10 h-10 rounded-lg"
              />
            ) : (
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  {token?.symbol?.[0] ?? "?"}
                </span>
              </div>
            )}

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-semibold text-foreground">
                  {token?.name}
                </h1>
                <Badge variant="secondary" className="text-xs">
                  {token?.symbol}
                </Badge>
                {/* <Button  size="sm" className="h-6 w-6 p-0"> */}
                <Copy className="h-3 w-3 hover:text-green-500 cursor-pointer" onClick={() => {
                  handleCopyAddress()
                }} />
                {/* </Button> */}
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>
                  ${Number(stats?.market_cap_usd).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <span className="text-trading-green">
                  ${Number(stats?.base_token_price_usd).toFixed(6)}
                </span>
                <span
                  className={
                    Number(stats?.price_change_percentage.h24) >= 0
                      ? "text-trading-green"
                      : "text-red-500"
                  }
                >
                  {stats?.price_change_percentage.h24}%
                </span>
              </div>
            </div>
          </div>

          {/* Liquidity / Holders / Audit */}
          <div className="flex items-center space-x-6 ml-8">
            <div>
              <div className="text-xs text-muted-foreground">Liquidity</div>
              <div className="text-sm font-medium">
                ${Number(stats?.reserve_in_usd).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Holders</div>
              <div className="text-sm font-medium">
                {token?.holders.count || ""}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">DEX Audit</div>
              <div className="text-sm text-trading-green font-medium">DYOR</div>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          <div className="text-muted-foreground text-xs flex gap-2">
            {token?.twitter_handle && (
              <a href={token.twitter_handle} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                <FaTwitter size={18} className="hover:text-blue-400" />
              </a>
            )}
            {token?.discord_url && (
              <a href={token.discord_url} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                <FaDiscord size={18} className="hover:text-purple-400" />
              </a>
            )}
            {token?.telegram_handle && (
              <a href={token.telegram_handle} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                <FaTelegram size={18} className="hover:text-purple-400" />
              </a>
            )}
            {token?.websites.length > 0 && (
              <a href={token.websites[0]} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                <Globe size={18} className="hover:text-green-400" />
              </a>
            )}

          </div>
          <a href={`https://dexscreener.com/base/${token?.address}`}
            target="_blank"
            className="cursor-pointer"
          >
            <Image
              src={`/images/dex.jpg`}
              width={25}
              height={25}
              className="rounded-full"
              alt=""
            ></Image>
          </a>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenHeader;
