"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SidebarTrending from "./sidebar-trending/sidebarTrending";
import { Plus } from "lucide-react";
const trendingTopics = [
    { topic: "Technology", hashtag: "#AI", tweets: "125K" },
    { topic: "Sports", hashtag: "#WorldCup", tweets: "89K" },
    { topic: "Music", hashtag: "#NewMusic", tweets: "67K" },
];

const whoToFollow = [
    { name: "React", username: "reactjs", avatar: "https://github.com/facebook.png", verified: true },
    { name: "Vercel", username: "vercel", avatar: "https://github.com/vercel.png", verified: true },
];

export function TrendingSidebar() {
    return (
        <div className="w-full space-y-2 mt-4">
            <Card className="bg-muted/50 gap-0 py-2">
                <CardHeader className="">
                    <CardTitle className="text-xl font-bold">Trending</CardTitle>
                </CardHeader>
                <CardContent className="px-2 space-y-3">
                    <SidebarTrending></SidebarTrending>
                </CardContent>
            </Card>

            <Card className="bg-muted/50 gap-3">
                <CardHeader className="pb-3 gap-0">
                    <CardTitle className="text-3xl font-bold text-center">Launch on Bora</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 flex-col flex items-center gap-2">
                    <div className="text-center"> Earn royalties when peeple buy and sell</div>
                    <Button  className="text-black hover:bg-green-400  justify-start p-2 bg-green-500 w-[130px]">
                        <Plus color="black" size={10}></Plus>  create coin
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}