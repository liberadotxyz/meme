"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronUp, ChevronDown, ImagePlus } from "lucide-react";
import { FaDiscord, FaTelegram, FaTwitter, } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import TokenHeader from "@/components/detalpage/TreadingHeader";
import TradingPanel from "@/components/detalpage/TradingPanel";
const TokenCreationForm = () => {
    const [isLessOptionsOpen, setIsLessOptionsOpen] = useState(false);
    const [solAmount, setSolAmount] = useState("0.00");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Handle image upload logic here
            console.log("Image uploaded:", file);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className=" space-y-6 bg-card border-none">

                    <TokenHeader></TokenHeader>

                    <TradingPanel></TradingPanel>


                </div>
            </div>
        </div>
    );
};

export default TokenCreationForm;