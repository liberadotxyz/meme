// components/detalpage/TreadingHeader.tsx
"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2 } from "lucide-react";

interface TokenHeaderProps {
  token: any;
  stats: any;
}

const TokenHeader = ({ token, stats }: TokenHeaderProps) => {
  return (
    <div className="bg-surface-elevated border-b border-green-500 p-4 mb-1">
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
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Copy className="h-3 w-3" />
                </Button>
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
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenHeader;
