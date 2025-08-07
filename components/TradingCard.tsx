"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Zap, BarChart3 } from "lucide-react";
import { useState } from "react";

interface TradingCardProps {
  tokenName: string;
  tokenIcon: string;
  price: string;
  marketCap: string;
  timestamp?: string;
}

const getTokenColor = (tokenName: string) => {
  let hash = 0;
  for (let i = 0; i < tokenName.length; i++) {
    hash = tokenName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Adjusted for more natural colors:
  const h = Math.abs(hash) % 360;       // Keep full hue range
  const s = 30 + Math.abs(hash) % 40;   // Reduced saturation (30-70%)
  const l = 40 + Math.abs(hash) % 30;   // Adjusted lightness (40-70%)

  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const TradingCard = ({
  tokenName,
  tokenIcon,
  price,
  marketCap,
  timestamp = "26m",
}: TradingCardProps) => {
  const [tradeAmount, setTradeAmount] = useState("0.01");
  const tokenColor = getTokenColor(tokenName); // Generate color based on name

  return (
    <div className="space-y-4">
      <div className="bg-gradient-card p-1 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div
              className={`w-8 h-8 rounded-full object-cover border-2 border-primary/20 bg-[dyanmic]`}
              style={{ backgroundColor: tokenColor }}
            >
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">{tokenName}  <Button className="px-4 text-xs bg-green-400 h-4">
                BUY
              </Button></h3>
              <div className="text-xs text-foreground">
                {price} at {marketCap} market cap
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">

            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
        </div>
      </div>


    </div>
  );
};