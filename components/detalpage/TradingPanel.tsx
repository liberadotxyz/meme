import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Minus, Zap, BarChart3, PieChart } from "lucide-react";

const TradingPanel = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [amount, setAmount] = useState("");

  const quickAmounts = ["0.1", "0.5", "1", "2", "5"];
    const quickSellAmount = ["10%", "25%", "50%", "75%", "MAX"];

  return (
    <div className="w-80 bg-surface-elevated border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Deploy On Gtz</h2>
          <div className="flex items-center space-x-1">
            <Badge variant="secondary" className="text-xs">Uni v3</Badge>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Buy/Sell Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 m-4 mb-2">
          <TabsTrigger 
            value="buy" 
            className="data-[state=active]:bg-trading-green data-[state=active]:text-white"
          >
            Buy
          </TabsTrigger>
          <TabsTrigger 
            value="sell"
            className="data-[state=active]:bg-trading-red data-[state=active]:text-white"
          >
            Sell
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 px-4">
          <TabsContent value="buy" className="mt-0 space-y-4">
            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-xs text-muted-foreground">($-)</span>
                </div>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter a custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-surface border-border"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  ETH
                </div>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-5 gap-2">
              {quickAmounts.map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs border-border bg-surface hover:bg-surface-elevated"
                  onClick={() => setAmount(value)}
                >
                  {value}
                </Button>
              ))}
            </div>

            {/* You Receive */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">You receive</span>
                <span className="text-xs text-muted-foreground">~</span>
              </div>
              <div className="text-right text-xl font-mono">0.0001800</div>
              <div className="text-right text-xl font-mono">0.0001600</div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Balance</span>
                <div className="flex items-center space-x-1">
                  <span>2.2946 GWEI</span>
                  <span className="text-muted-foreground">5%</span>
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                    <Settings className="h-3 w-3" />
                  </Button>
                  <span className="text-primary">Advanced</span>
                </div>
              </div>
              <div className="text-center text-muted-foreground">0 DOK</div>
            </div>

            {/* Buy Button */}
            <Button 
              className="w-full h-12  bg-green-500  text-white font-semibold"
              size="lg"
            >
              <Zap className="h-5 w-5 mr-2" />
              Buy Now
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="mt-0 space-y-4">
            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-xs text-muted-foreground">($-)</span>
                </div>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter a custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-surface border-border"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  ETH
                </div>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-5 gap-2">
              {quickSellAmount.map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs border-border bg-surface hover:bg-surface-elevated"
                  onClick={() => setAmount(value)}
                >
                  {value}
                </Button>
              ))}
            </div>

            {/* You Receive */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">You receive</span>
                <span className="text-xs text-muted-foreground">~</span>
              </div>
              <div className="text-right text-xl font-mono">0.0001800</div>
              <div className="text-right text-xl font-mono">0.0001600</div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Balance</span>
                <div className="flex items-center space-x-1">
                  <span>2.2946 GWEI</span>
                  <span className="text-muted-foreground">5%</span>
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                    <Settings className="h-3 w-3" />
                  </Button>
                  <span className="text-primary">Advanced</span>
                </div>
              </div>
              <div className="text-center text-muted-foreground">0 DOK</div>
            </div>

            {/* Buy Button */}
            <Button 
              className="w-full h-12 bg-green-500 text-white font-semibold"
              size="lg"
            >
              <Zap className="h-5 w-5 mr-2" />
              Sell Now
            </Button>
          </TabsContent>
        </div>

        {/* Token Info Section */}
        <div className="border-t border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="h-8">
              <BarChart3 className="h-4 w-4 mr-2" />
              Token Info
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <PieChart className="h-4 w-4 mr-2" />
              Stats
            </Button>
          </div>

          {/* Token Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-semibold">$0.0₃10</div>
              <div className="text-xs text-muted-foreground">Price USD</div>
            </div>
            <div>
              <div className="text-sm font-semibold">0.0₃29</div>
              <div className="text-xs text-muted-foreground">Price WETH</div>
            </div>
            <div>
              <div className="text-sm font-semibold">1B</div>
              <div className="text-xs text-muted-foreground">Supply</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-semibold text-trading-green">$44K</div>
              <div className="text-xs text-muted-foreground">Liquidity</div>
            </div>
            <div>
              <div className="text-sm font-semibold">$107.95K</div>
              <div className="text-xs text-muted-foreground">FDV</div>
            </div>
            <div>
              <div className="text-sm font-semibold">$107.95K</div>
              <div className="text-xs text-muted-foreground">MKT Cap</div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default TradingPanel;