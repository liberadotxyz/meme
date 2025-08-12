"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Minus, Zap, BarChart3, PieChart, Fuel, Copy, Wallet } from "lucide-react";
import { Card } from "../ui/card";
import { swap } from "@/api/topToken";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { formatEther } from "viem";
import { fetchBalance } from "@/api/topToken";
import { getBalance } from "viem/actions";
import { createPublicClient } from "viem";
import { createConfig, http } from 'wagmi';

import {
  base,
} from 'wagmi/chains';

interface TokenHeaderProps {
  token: any;
  stats: any;
}

const TradingPanel = ({ token, stats }: TokenHeaderProps) => {

  const client = createPublicClient({
    chain: base,
    transport: http(),
  })

  // "6.942"
  const [activeTab, setActiveTab] = useState("buy");
  const [balance, setBalance] = useState("0")
  const [selectedTokenAmount, setSelectedTokenAddress] = useState()
  const [amount, setAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("")
  const [info, setInfo] = useState("info");
  const quickAmounts = ["0.1", "0.5", "1", "2", "5"];
  const quickSellAmount = ["10%", "25%", "50%", "75%", "MAX"];

  // Extract token details
  const tokenDetails = token;
  const tokenStats = stats;
  const priceChange = tokenStats?.price_change_percentage;
  const transactions = tokenStats?.transactions;
  const volume = tokenStats?.volume_usd;
  const holders = tokenDetails?.holders;
  const { data: session } = useSession()

  // Format numbers
  const formatNumber = (num: string | number) => {
    const number = typeof num === 'string' ? parseFloat(num) : num;
    if (number >= 1000000) {
      return `$${(number / 1000000).toFixed(2)}M`;
    }
    if (number >= 1000) {
      return `$${(number / 1000).toFixed(2)}K`;
    }
    return `$${number}`;
  };

  const buyToken = async () => {
    let payload = {
      "username": session?.user.username,
      "address_swapping_from": "0x0000000000000000000000000000000000000000",
      "address_swapping_to": tokenDetails?.address,
      "amount": Number(amount),
      // "slippage": 50
    }
    let result = await swap(payload);
    console.log("result k aayo", result)
    // toast(`succssfully buy worth of ${amount} of ${name}`)
  }

  const sellToken = async () => {
    let payload = {
      "username": session?.user.username,
      "address_swapping_from": tokenDetails?.address,
      "address_swapping_to": "0x0000000000000000000000000000000000000000",
      "amount": Number(amount),
      // "slippage": 50
    }
    let result = await swap(payload);
    console.log("result k aayo", result)
    // toast(`succssfully buy worth of ${amount} of ${name}`)
  }

  const getBalances = async () => {
    const balance = await getBalance(client, {
      address: session?.user?.address as `0x${string}`,
    });

    console.log("aaaaa", balance)
    const balanceAsEther = formatEther(balance)
    console.log("aaaaa", balance, balanceAsEther)
    setBalance(balanceAsEther)

  }

  useEffect(() => {
    if (!session?.user) return
    getBalances()
  }, [session])


  const userWallet = async () => {
    let data = await fetchBalance(session?.user.address || "");
    data.map((item:any, index:any) => {
      if(item.token_address == token.address) {
        setSelectedTokenAddress(token.balance)
      }
    })
    // setBalance(data)
  }
  useEffect(() => {
    if (!session?.user) return
    userWallet()
  }, [session])
  return (
    <div className="bg-surface-elevated p-1">
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-2">
          <Card className="h-110 rounded-none border border-green-500">
            {/* Chart would go here */}
            Chart Area
          </Card>
        </div>
        <div className="col-span-1">
          {/* Header Section */}
          <div className="p-2 border border-green-500">
            <div className="flex flex-col gap-2 items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{tokenDetails?.name || 'Token'}</h2>
                <Copy className="h-4 w-4 cursor-pointer hover:text-green-500" />
              </div>
              <div className="flex items-center space-x-1">
                <Badge variant="secondary" className="text-xs">
                  {tokenDetails?.symbol || 'SYMBOL'}
                </Badge>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Trading Section */}
          <div className="p-2 border border-green-500 border-t-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-end">
                      <div className="flex items-center">
                        <Wallet className="h-3 w-3"></Wallet>
                        <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          (${balance})
                        </span>
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
                        {tokenDetails?.symbol || 'TOKEN'}
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
                      <span className="text-muted-foreground text-xs">
                        {priceChange?.h24 || '0'}%
                      </span>
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
                        <span className="text-xs text-muted-foreground"></span>
                        {amount ? (parseFloat(amount) * parseFloat(tokenStats?.base_token_price_quote_token || '1')).toFixed(7) : '0.0000000'}
                      </div>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <Button
                    className="w-full h-12 cursor-pointer bg-green-500 hover:bg-green-400 text-white font-semibold"
                    size="lg"
                    onClick={() => {
                      buyToken()
                    }}
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Buy Now
                  </Button>
                </TabsContent>

                <TabsContent value="sell" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-end">
                      <div className="flex items-center">
                        <Wallet className="h-3 w-3"></Wallet>
                        <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          (${selectedTokenAmount || 0})
                         
                        </span>
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
                        {tokenDetails?.symbol || 'TOKEN'}
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
                      <span className="text-muted-foreground text-xs">
                        {priceChange?.h24 || '0'}%
                      </span>
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
                        <span className="text-xs text-muted-foreground"></span>
                        {amount ? (parseFloat(amount) * parseFloat(tokenStats?.base_token_price_quote_token || '1')).toFixed(7) : '0.0000000'}
                      </div>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <Button
                    className="w-full h-12 cursor-pointer bg-green-500 hover:bg-green-400 text-white font-semibold"
                    size="lg"
                    onClick={() => {
                      sellToken()
                    }}
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Sell Now
                  </Button>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Info Section */}
          <div className="p-2 border border-green-500 mt-2">
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
                      <div className="text-sm font-semibold">
                        ${parseFloat(tokenStats?.base_token_price_usd || '0').toFixed(6)}
                      </div>
                      <div className="text-xs text-muted-foreground">Price USD</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {parseFloat(tokenStats?.base_token_price_native_currency || '0').toFixed(6)}
                      </div>
                      <div className="text-xs text-muted-foreground">Price ETH</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">1B</div>
                      <div className="text-xs text-muted-foreground">Supply</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm font-semibold text-green-500">
                        {formatNumber(tokenStats?.reserve_in_usd || 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Liquidity</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {formatNumber(tokenStats?.fdv_usd || 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">FDV</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {formatNumber(tokenStats?.market_cap_usd)}
                      </div>
                      <div className="text-xs text-muted-foreground">MKT Cap</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stats" className="mt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-semibold">
                        {holders?.count?.toLocaleString() || '0'}
                      </div>
                      <div className="text-xs text-muted-foreground">Holders</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {transactions?.h24?.buys?.toLocaleString() || '0'}
                      </div>
                      <div className="text-xs text-muted-foreground">24h Buys</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {transactions?.h24?.sells?.toLocaleString() || '0'}
                      </div>
                      <div className="text-xs text-muted-foreground">24h Sells</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {formatNumber(volume?.h24 || 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">24h Volume</div>
                    </div>
                  </div>
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