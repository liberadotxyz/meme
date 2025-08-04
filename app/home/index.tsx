import { TokenCard } from "@/components/TokenCard";
import { TradingCard } from "@/components/TradingCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBarStacked, TrendingUpDown, BadgeDollarSign, Codesandbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import Trending from "@/components/trending/TrendingComponent";
import PresaleComponent from "@/components/presale/PresaleComponent";
export default function Home() {
    return (
        <div>
            <Card className="bg-muted/50 gap-3 mb-3">
                <CardHeader className="pb-3 gap-0">
                    <CardTitle className="text-3xl font-bold text-center">Launch on Bora</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 flex-col flex items-center gap-2">
                    <div className="text-center"> Earn royalties when peeple buy and sell</div>
                    <Button className="text-black hover:bg-green-400  justify-start p-2 bg-green-500 w-[130px]">
                        <Plus color="black" size={10}></Plus>  create coin
                    </Button>
                </CardContent>
            </Card>
            <Tabs defaultValue="trade" className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-12 sticky top-20 z-10 ">
                    <TabsTrigger value="trade">
                        <div className="flex items-center gap-2">
                            <span><ChartBarStacked></ChartBarStacked></span>
                            <span>Trades</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="trending">
                        <div className="flex items-center gap-2">
                            <span><TrendingUpDown></TrendingUpDown></span>
                            <span>Trending</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="presale">
                        <div className="flex items-center gap-2">
                            <span><BadgeDollarSign></BadgeDollarSign></span>
                            <span>Pre-sale</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="topGainers">
                        <div className="flex items-center gap-2">
                            <span><Codesandbox></Codesandbox></span>
                            <span>Graduated</span>
                        </div>
                    </TabsTrigger>

                </TabsList>

                {/* Tab contents would go here */}
                <TabsContent value="trade">
                    {/* Content for newly launched */}

                    <div className="flex flex-col items-center justify-items-center min-h-screen gap-3 ">
                        {
                            [1, 2, 3, 4, 5].map((item) => (
                                <Card className="p-2 w-full max-w-3xl gap-0">
                                    <TradingCard
                                        tokenName="DAREALFNTRAP"
                                        tokenIcon={"/images/aaa.png"}
                                        price="0.06 ETH"
                                        marketCap="$1.14M"
                                        timestamp="26m"
                                    />
                                    <TokenCard
                                        name="SAILANA"
                                        symbol="Shiba Inu"
                                        icon={"/images/aaa.png"}
                                        marketCap="$1.13M"
                                        address="dWd8...BAGS"
                                        showBoost={true}
                                    />
                                </Card>

                            ))
                        }

                    </div>
                </TabsContent>
                <TabsContent value="trending">
                    <Trending></Trending>
                </TabsContent>
                <TabsContent value="presale">
                        <PresaleComponent></PresaleComponent>
                </TabsContent>
                <TabsContent value="topGainers">
                    {/* Content for top gainers */}
                </TabsContent>

            </Tabs>
        </div>


    );
}
