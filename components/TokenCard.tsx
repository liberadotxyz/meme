"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUp, Copy, ArrowUpDown, Plus, User } from "lucide-react";
import { Badge } from "lucide-react";
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

export const TokenCard = ({
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
        <Card className="bg-gradient-card border-border gap-1 p-2 shadow-card hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="">
                        <img
                            src={icon}
                            alt={name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                        />
                        {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-purple rounded-full border-2 border-background"></div> */}
                    </div>

                    <div className="flex flex-col">
                        <h3 className="font-bold text-foreground text-sm">{name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-xs">{symbol}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                        <div className="text-muted-foreground text-sm"> <span className="text-white text-md font-medium">{marketCap}</span> MCAP</div>
                    </div>


                </div>
            </div>


            <div className="flex items-center justify-between mt-1">

                <div>
                    <div className="text-md text-muted-foreground">
                        Holders
                    </div>
                    <div className="text-sm">
                        1,234
                    </div>
                </div>
                <div>
                    <div className="text-md text-muted-foreground">
                        24H Volume
                    </div>
                    <div className="text-sm">
                        $12,345
                    </div>
                </div>
                <div>
                    <div className="text-md text-muted-foreground">
                        Created
                    </div>
                    <div className="text-sm">
                        2023-10-01
                    </div>
                </div>
                <div>
                    <div className="text-md text-muted-foreground flex items-center gap-1">
                        24H <ArrowUpDown color="green" size={20}></ArrowUpDown>
                    </div>
                    <div className="text-sm text-green-500">
                        10%
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <Button
                    // variant="ghost"
                    size="sm"
                    className="h-6 gap-0 w-13 px-3 mt-2 p-0 bg-green-500 hover:bg-green-600 text-black"
                >
                    <Plus color="black"></Plus>
                    0.01
                </Button>
            </div>


        </Card>
    );
};