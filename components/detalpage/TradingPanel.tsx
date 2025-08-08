import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Minus, Zap, BarChart3, PieChart, Fuel, Copy, Wallet } from "lucide-react";
import { Card } from "../ui/card";
const TradingPanel = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [amount, setAmount] = useState("");
  const [info, setInfo] = useState("info")
  const quickAmounts = ["0.1", "0.5", "1", "2", "5"];
  const quickSellAmount = ["10%", "25%", "50%", "75%", "MAX"];

  return (
    <div className=" bg-surface-elevated  p-1">

      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-2">
          <Card className="h-100  rounded-none">
            s
          </Card>
        </div>
        <div className="col-span-1">
          <div className="p-2 border border-gray">
            <div className="flex flex-col gap-2 items-center justify-between">
              <div className="flex  items-center gap-2">
                <h2 className="text-lg font-semibold">Deploy On Gtz </h2>

                <Copy className="h-4 w-4 cursor-pointer hover:text-green-500" />

              </div>
              <div className="flex items-center space-x-1">
                <Badge variant="secondary" className="text-xs">Uni v3</Badge>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          {/* middle */}
          <div className="p-2 border border-gray border-t-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col ">
              <TabsList className="grid w-full grid-cols-2 mt-4 mb-2">
                <TabsTrigger
                  value="buy"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white cursor-pointer"
                >
                  Buy
                </TabsTrigger>
                <TabsTrigger
                  value="sell"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white cursor-pointer"
                >
                  Sell
                </TabsTrigger>
              </TabsList>

              <div className="flex-1">
                <TabsContent value="buy" className="mt-0 space-y-4">
                  <div className="space-y-2 ">
                    <div className="flex items-center justify-end">
                      <div className="flex items-center">
                        <Wallet className="h-3 w-3"></Wallet>
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
                        className="h-8 text-xs cursor-pointer  border-border bg-surface hover:bg-surface-elevated hover:text-green-500"
                        onClick={() => setAmount(value)}
                        style={{
                          paddingLeft: "20px"
                        }}
                      >
                        {value}
                        <svg width="10" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1"><path d="M6.49212 0.024353V6.67596L0.870605 9.18778L6.49212 0.024353Z" fill="#6F7BA0"></path><path d="M6.49212 0.024353V6.67595L12.1123 9.18778L6.49212 0.024353ZM0.870605 9.18778L6.49212 6.67466V12.4502L0.870605 9.18778Z" fill="#47516A"></path><path d="M6.49219 6.67598V12.4502L12.1124 9.1878L6.49219 6.67598Z" fill="#212734"></path><path d="M0.870605 10.2334L6.49212 13.4958V18.016L0.870605 10.2334Z" fill="#6F7BA0"></path><path d="M6.49219 13.4971L12.1163 10.2334L6.49219 18.016V13.4971Z" fill="#47516A"></path></svg>
                      </Button>
                    ))}
                  </div>



                  {/* Additional Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Fuel size={10}></Fuel>
                      <span className="text-xs">2.2946 GWEI</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">5%</span>

                    </div>
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <Settings size={10} />
                      </Button>
                      <span className="text-primary text-xs">Advanced</span>
                    </div>

                  </div>
                  {/* You Receive */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">~</span>

                      <div className="text-right text-xs font-mono">
                        <span className="text-xs text-muted-foreground"> </span>0.0001800</div>


                    </div>
                  </div>


                  {/* Buy Button */}
                  <Button
                    className="w-full h-12 cursor-pointer  bg-green-500 hover:bg-green-400  text-white font-semibold"
                    size="lg"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Buy Now
                  </Button>
                </TabsContent>

                <TabsContent value="sell" className="mt-0 space-y-4">
                  <div className="space-y-2 ">
                    <div className="flex items-center justify-end">
                      <div className="flex items-center ">
                        <Wallet className="h-3 w-3"></Wallet>

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
                        className="h-8 text-xs cursor-pointer border-border bg-surface hover:bg-surface-elevated hover:text-green-500"
                        onClick={() => setAmount(value)}
                      >
                        {value}

                      </Button>
                    ))}
                  </div>



                  {/* Additional Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Fuel size={10}></Fuel>
                      <span className="text-xs">2.2946 GWEI</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">5%</span>

                    </div>
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <Settings size={10} />
                      </Button>
                      <span className="text-primary text-xs">Advanced</span>
                    </div>

                  </div>
                  {/* You Receive */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">~</span>

                      <div className="text-right text-xs font-mono">
                        <span className="text-xs text-muted-foreground">  </span>0 ETH</div>


                    </div>
                  </div>


                  {/* Buy Button */}
                  <Button
                    className="w-full h-12 cursor-pointer  bg-red-500  text-white font-semibold hover:bg-red-400"
                    size="lg"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Sell Now
                  </Button>
                </TabsContent>
              </div>


            </Tabs>
          </div>

          {/* last */}
          <div className="p-2 border border-gray mt-2">
            <Tabs value={info} onValueChange={setInfo} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 mt-4 mb-2">
                <TabsTrigger
                  value="info"
                  className="data-[state=active]:bg-green-500 cursor-pointer data-[state=active]:text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Token Info
                </TabsTrigger>
                <TabsTrigger
                  value="stats"
                  className="data-[state=active]:bg-red-500 cursor-pointer data-[state=active]:text-white"
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  Stats
                </TabsTrigger>
              </TabsList>

              <div className="flex-1">
                <TabsContent value="info" className="mt-0 space-y-4">
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
                </TabsContent>

                <TabsContent value="stats" className="mt-0 space-y-4">
                  kkk
                </TabsContent>
              </div>


            </Tabs>

          </div>


        </div>
      </div>

    </div>
  );
};

export default TradingPanel;