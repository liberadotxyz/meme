import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBarStacked, TrendingUpDown, BadgeDollarSign, Codesandbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import Trending from "@/components/trending/TrendingComponent";
import TopComponent from "@/components/top/TopComponent";
import LatestComponent from "@/components/latest/LatestComponent";
import Link from "next/link";
import TradeComponent from "@/components/trade/TradeComponent";
import OurPlatform from "@/components/our/OurPlatform";
export default function Home() {
    return (
        <div>
            <Card className="bg-muted/50 gap-3 mb-3">
                <CardHeader className="pb-3 gap-0">
                    <CardTitle className="text-3xl font-bold text-center">Launch on Bora</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 flex-col flex items-center gap-2">
                    <div className="text-center"> Earn royalties from every buy and sell of your meme coin.
                    </div>
                    <Link href={'/launch'} className="cursor-pointer">
                        <Button className="text-black hover:bg-green-400 cursor-pointer justify-start p-2 bg-green-500 w-[130px]">
                            <Plus color="black" size={10}></Plus>  create coin
                        </Button>
                    </Link>

                </CardContent>
            </Card>
            <Tabs defaultValue="trade" className="max-w-4xl">
                <TabsList className="grid w-full grid-cols-5 h-12 sticky top-22 z-1 ">
                    <TabsTrigger value="trade" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <span><ChartBarStacked></ChartBarStacked></span>
                            <span>Trades</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="trending" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <span><TrendingUpDown></TrendingUpDown></span>
                            <span>Trending</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <span><TrendingUpDown></TrendingUpDown></span>
                            <span>Platform</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="presale" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <span><BadgeDollarSign></BadgeDollarSign></span>
                            <span>Top Tokens</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="topGainers" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <span><Codesandbox></Codesandbox></span>
                            <span>Latest</span>
                        </div>
                    </TabsTrigger>

                </TabsList>

                <TabsContent value="trade">

                    <TradeComponent></TradeComponent>

                </TabsContent>
                <TabsContent value="trending">
                    <Trending></Trending>
                </TabsContent>
                 <TabsContent value="recent">
                    <OurPlatform></OurPlatform>
                </TabsContent>
                <TabsContent value="presale">
                    <TopComponent></TopComponent>
                </TabsContent>
                <TabsContent value="topGainers">
                    <LatestComponent></LatestComponent>
                </TabsContent>

            </Tabs>
        </div>


    );
}
