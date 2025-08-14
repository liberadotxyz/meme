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
import { ArrowUp } from "lucide-react";
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
  const [ethDeatil, setEthDetail] = useState<any>({})
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
  // 24
  const priceChange24h = tokenStats?.price_change_percentage?.h24 || "0";
  console.log("priceChange24h", priceChange24h)
  const isPriceUp24hr = parseFloat(priceChange24h) > 0;
  // 5min
  const priceChange5min = tokenStats?.price_change_percentage?.m5 || "0";
  const isPriceUpFor5min = parseFloat(priceChange5min) > 0;


  // 1hr

  const priceChange1hr = tokenStats?.price_change_percentage?.h1 || "0";
  const isPriceUpFor1hr = parseFloat(priceChange1hr) > 0;


  // 6hr
  const priceChange6hr = tokenStats?.price_change_percentage?.h6 || "0";
  const isPriceUpFor6hr = parseFloat(priceChange6hr) > 0;



  // Format numbers
  const formatNumber = (num: string | number) => {
    const number = typeof num === 'string' ? parseFloat(num) : num;
    if (number >= 1000000) {
      return `$${(number / 1000000).toFixed(2)}M`;
    }
    if (number >= 1000) {
      return `$${(number / 1000).toFixed(2)}K`;
    }
    return `$${Number(number).toFixed(3)}`;
  };

  const buyToken = async () => {
    let payload = {
      "username": session?.user.username,
      "address_swapping_from": "0x0000000000000000000000000000000000000000",
      "address_swapping_to": tokenDetails?.address,
      "amount": Number(amount),
      // "slippage": 50
    }
    let { message } = await swap(payload);
    // console.log("result k aayo", result);
    getBalances();
    userWallet();
    toast(message)
  }

  const sellToken = async () => {
    let payload = {
      "username": session?.user.username,
      "address_swapping_from": tokenDetails?.address,
      "address_swapping_to": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      "amount": selectedTokenAmount == sellAmount ? Number(sellAmount) - Number(sellAmount) % 99 : Number(sellAmount),
      // "slippage": 50
    }
    let { message } = await swap(payload);
    // console.log("result k aayo", result)
    getBalances();
    userWallet();
    toast(message)

    // toast(`succssfully buy worth of ${amount} of ${name}`)
  }

  const getBalances = async () => {
    const balance = await getBalance(client, {
      address: session?.user?.address as `0x${string}`,
      // address:"0xAaff28f22ED65DdEE1a9e9cAF7c53E2721f26936"
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
    let { result } = await fetchBalance(session?.user.address || "");
    result.map((item: any, index: any) => {
      if (item.token_address == tokenDetails.address) {
        setSelectedTokenAddress(item.balance_formatted)
      }
    })
    setEthDetail(result[0])
  }
  useEffect(() => {
    if (!session?.user) return
    userWallet()
  }, [session])
  return (
    <div className="bg-surface-elevated p-1">
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-2">
          <Card className="h-full rounded-none border-1 border-[#4a4747] py-0">

            <iframe className="h-full w-full" src={`https://dexscreener.com/base/${token.address}?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15`}></iframe>


          </Card>
        </div>
        <div className="col-span-1">
          {/* Header Section */}
          <div className="p-5 border-1 border-[#4a4747]">
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


          {/* ddd */}
          <div className="border border-[#4a4747] mt-2 mb-2 mx-auto">
            <div className="flex items-stretch"> {/* Changed to items-stretch to ensure equal height */}
              {/* Price USD */}
              <div className="h-[60px] w-[95px] justify-center p-1 flex flex-col items-center border-r border-b border-[#4a4747]">
                <div className="text-sm font-semibold p-1">
                  ${parseFloat(tokenStats?.base_token_price_usd || '0').toFixed(3)}
                </div>
                <div className="text-xs text-muted-foreground">Price USD</div>
              </div>

              {/* Liquidity */}
              <div className="h-[60px] w-[95px] justify-center p-1 flex flex-col items-center border-r border-b border-[#4a4747]">
                <div className="text-sm font-semibold text-green-500 p-1">
                  {formatNumber(tokenStats?.reserve_in_usd || 0)}
                </div>
                <div className="text-xs text-muted-foreground">Liquidity</div>
              </div>

              {/* Market Cap */}
              <div className="h-[60px] w-[95px] p-1  justify-center flex flex-col items-center border-b border-[#4a4747]">
                <div className="text-sm font-semibold p-1">
                  {formatNumber(tokenStats?.market_cap_usd)}
                </div>
                <div className="text-xs text-muted-foreground">MKT Cap</div>
              </div>

              {/* Volume */}
              <div className="h-[60px] w-[95px] p-1 flex justify-center flex-col items-center border-l border-b border-[#4a4747]">
                <div className="text-sm font-semibold p-1">
                  {formatNumber(volume?.h24 || 0)}
                  {/* {volume?.h24} */}
                </div>
                <div className="text-xs text-muted-foreground">Volume</div>
              </div>
            </div>

            {/* Time period changes */}
            <div className="flex items-stretch"> {/* Changed to items-stretch */}
              {/* 5min */}
              <div className="h-[60px] w-[95px] flex justify-center flex-col items-center border-r border-[#4a4747]">
                <div className={`p-1 w-full flex justify-center text-sm items-center ${isPriceUpFor5min ? 'text-green-500' : 'text-red-500'} cursor-pointer`}>
                  {priceChange5min}%
                </div>
                <div className="text-muted-foreground text-xs">
                  5min
                </div>
              </div>

              {/* 1H */}
              <div className="h-[60px] w-[95px] flex justify-center flex-col items-center border-r border-[#4a4747]">
                <div className={`p-1 w-full flex justify-center text-sm items-center ${isPriceUpFor1hr ? 'text-green-500' : 'text-red-500'} cursor-pointer`}>
                  {priceChange1hr}%
                </div>
                <div className="text-muted-foreground text-xs ">
                  1H
                </div>
              </div>

              {/* 6H */}
              <div className="h-[60px] w-[95px] flex flex-col items-center border-r border-[#4a4747] justify-center">
                <div className={`p-1 w-full flex justify-center text-sm items-center ${isPriceUpFor6hr ? 'text-green-500' : 'text-red-500'} cursor-pointer`}>
                  {priceChange6hr}%
                </div>
                <div className="text-muted-foreground text-xs">
                  6H
                </div>
              </div>

              {/* 24H */}
              <div className="h-[60px] w-[95px] flex flex-col items-center border-[#4a4747] justify-center">
                <div className={`p-1 w-full flex justify-center text-sm items-center ${isPriceUp24hr ? 'text-green-500' : 'text-red-500'} cursor-pointer`}>
                  {priceChange24h}%
                </div>
                <div className="text-muted-foreground text-xs">
                  24H
                </div>
              </div>
            </div>
          </div>

          {/* Trading Section */}
          <div className="p-5 border-1 border-[#4a4747] border-t-1">
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
                        {'ETH'}
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
                        {/* {tokenStats?.base_token_price_usd } */}
                        {tokenDetails?.symbol} {(ethDeatil?.usd_price * Number(amount)) / parseFloat(tokenStats?.base_token_price_usd || '1')}
                        {/* {amount ? (parseFloat( ethDeatil.usd_price * Number(amount)) * parseFloat(tokenStats?.base_token_price_quote_token || '1')).toFixed(7) : '0.0000000'} */}
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
                          ({selectedTokenAmount || 0})

                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter a custom amount"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
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
                        onClick={() => {
                          if (value === "MAX") {
                            setSellAmount(selectedTokenAmount || "0");
                          } else {
                            const percent = parseFloat(value) / 100;
                            const tokenToSell = (parseFloat(selectedTokenAmount || "0") * percent).toFixed(7);
                            setSellAmount(tokenToSell);
                          }
                        }}
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
                        $ {sellAmount
                          ? (parseFloat(sellAmount) * parseFloat(tokenStats?.base_token_price_usd || '1')).toFixed(7)
                          : '0.0000000'
                        }                      </div>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <Button
                    className="w-full h-12 cursor-pointer bg-red-500 hover:bg-red-400 text-white font-semibold"
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
          <div className="p-5 border-1 border-[#4a4747] mt-2">
            <Tabs value={info} onValueChange={setInfo} className="flex-1 flex flex-col">
              <TabsList className="grid w-full mb-2 justify-center">

                <TabsTrigger
                  value="stats"
                  className="data-[state=active]:bg-red-500 cursor-pointer data-[state=active]:text-white"
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  Stats
                </TabsTrigger>
              </TabsList>

              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4 items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-semibold">
                      {holders?.count?.toLocaleString() || '0'}
                    </div>
                    <div className="text-xs text-muted-foreground">Holders</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-semibold">
                      {transactions?.h24?.buys?.toLocaleString() || '0'}
                    </div>
                    <div className="text-xs text-muted-foreground">24h Buys</div>
                  </div>
                   <div className="flex flex-col items-center">
                    <div className="text-sm font-semibold">
                      {transactions?.h24?.sells?.toLocaleString() || '0'}
                    </div>
                    <div className="text-xs text-muted-foreground">24h Sells</div>
                  </div>
                   <div className="flex flex-col items-center">
                    <div className="text-sm font-semibold">
                      {formatNumber(volume?.h24 || 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">24h Volume</div>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;