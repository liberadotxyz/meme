"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown,  } from "lucide-react";
import { ArrowUp, Copy, EyeOff, Search, User, Crown, ChefHat, Plus, Dot, Globe, Sprout } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";
import { Card } from "@/components/ui/card";
export default function Trending() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen gap-0 ">
      {
        [1, 2, 3, 4, 5].map((item) => (
          <div className="p-2 w-full max-w-3xl gap-0">
            
            <TokenCard
              name="SAILANA"
              symbol="123..3456"
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
    let progress = 50;
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    return (
        <Card className="bg-gradient-card border-border gap-0 p-4 shadow-card hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-15 h-15 flex justify-center items-center relative " >
                          
                        <img
                            src={icon}
                            alt={name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 relative"
                        />
                        
                    </div>


                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <h3 className="font-bold text-foreground text-sm">{name}

                            </h3>
                            <h3 className="font-bold text-muted-foreground text-sm ml-3">
                                Rocket Guy
                            </h3>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-muted-foreground text-xs flex gap-2">
                                <FaTelegram size={12}></FaTelegram>
                                <FaTwitter size={12}></FaTwitter>
                                <FaDiscord size={12}></FaDiscord>
                                <Globe size={12}></Globe>
                            </div>
                             <div className="text-muted-foreground text-xs flex items-center mb-1 hover:text-green-500">
                                Awqr...dx11
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 hover:text-green-500 ml-1"
                                >
                                    <Copy className="h-3 w-3" />
                                </Button>
                            </div>

                            <div className="text-muted-foreground text-xs flex gap-1 mt-1">
                                <div className="relative group">
                                    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                        <User size={10}></User>14
                                    </Badge>
                                    <div className="absolute bottom-full z-20 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                        Total number of holder
                                    </div>
                                </div>
                                <div className="relative group">
                                    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                        <ChefHat size={10}></ChefHat>1%
                                    </Badge>
                                    <div className="absolute bottom-full z-20 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                        The percentage hold by dev team
                                    </div>
                                </div>
                                <div className="relative group">
                                    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                        <Crown size={10}></Crown>2%
                                    </Badge>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                        Top 10 holder percentage
                                    </div>
                                </div>
                                <div className="relative group">
                                    <Badge className="p-1 h-4 bg-transparent border border-gray-600 text-green-500 cursor-pointer">
                                        <Sprout size={10} className="inline mr-1" />3s
                                    </Badge>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                        created 3s before
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
                                V
                                <span className="text-white text-sm font-medium"> 15K</span>

                            </div>
                            MCAP
                            <span className="text-green-500 text-sm font-medium"> {marketCap}</span>
                        </div>
                        <div className="text-muted-foreground text-xs flex items-center gap-1 justify-end">
                            TX
                            <span className="text-white text-xs font-medium"> 25K</span>

                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 gap-0 w-13 px-3 mt-2 p-0 bg-green-500 hover:bg-green-600 text-black"
                        >
                            <Plus color="black"></Plus>
                            0.01
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
    );
};



