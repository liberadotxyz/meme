import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUp, Copy } from "lucide-react";
import { TradingCard } from "@/components/TradingCard";
export default function SidebarTrending() {
  return (
    <div className="flex flex-col items-center justify-items-center gap-0 ">
      {
        [1, 2, 3, 4,6 ].map((item) => (
          <div className="p-2 w-full max-w-3xl gap-0">
            
            <TokenCard
              name="SAILANA"
              symbol="Shiba Inu"
              icon={"/images/aaa.png"}
              marketCap="$1.13M"
              address="dWd8...BAGS"
              showBoost={true}
            />
          </div>

        ))
      }

    </div>
  );
}



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
    const isProfitable = pnl && parseFloat(pnl.replace(/[^0-9.-]/g, "")) > 0;

    return (
        <Card className="bg-gradient-card border-border  p-4 shadow-card hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="">
                        <img
                            src={icon}
                            alt={name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-purple rounded-full border-2 border-background"></div>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="font-bold text-foreground text-lg">{name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-sm">{symbol}</span>
                            {/* {address && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0 hover:bg-primary/10"
                                    onClick={() => navigator.clipboard.writeText(address)}
                                >
                                    <Copy className="h-3 w-3" />
                                </Button>
                            )} */}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                        <div className="text-muted-foreground text-sm"> <span className="text-white text-md font-medium">{marketCap}</span> MCAP</div>
                    </div>

                    {/* {showBoost && (
                        <Button  size="sm" className="px-6">
                            Boost
                        </Button>
                    )} */}
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
    );
};
