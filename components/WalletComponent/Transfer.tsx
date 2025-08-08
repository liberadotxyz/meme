import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SendScreenProps {
    onBack: () => void;
}

export const TransferScreen = ({ onBack }: SendScreenProps) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('0');
    const [selectedToken, setSelectedToken] = useState('ETH');
    const [activeTab, setActiveTab] = useState("sell")
    const percentageButtons = ['10%', '25%', '50%', '100%'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold">Trade</h2>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full h-12 gap-3 bg-[#262626]">
                    <TabsTrigger 
                        value="buy" 
                        className={`flex-1 ${activeTab =='buy' ? 'bg-green-500 text-black' : 'bg-transparent'}`}
                    >
                        Buy
                    </TabsTrigger>
                    <TabsTrigger 
                        value="sell" 
                        className={`flex-1 ${activeTab == 'sell' ? 'bg-red-500 text-black' : 'bg-transparent'}`}
                    >
                        Sell
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="space-y-4 mt-6">
                    {/* Amount Input */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-wallet-bg rounded-lg bg-[#262626] group  focus-within:outline-1 focus-within:outline-white">
                            <div className="flex-1 bg-[#262626]">
                                <Input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="text-4xl font-light border-none bg-[#262626] px-0 h-auto focus:outline-none"
                                    placeholder="$0"
                                    style={{
                                        background: "#262626"
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-black text-crypto-blue-foreground rounded-lg">
                                <div className="w-4 h-4 rounded-full bg-white"></div>
                                <span className="font-medium">ETH</span>
                            </div>
                        </div>

                        {/* Percentage Buttons */}
                        <div className="grid grid-cols-4 gap-2">
                            {percentageButtons.map((percentage) => (
                                <Button
                                    key={percentage}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        // Handle percentage selection
                                        console.log(`Selected ${percentage}`);
                                    }}
                                    className="text-sm bg-green-500"
                                >
                                    {percentage}
                                </Button>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="sell" className="mt-6">
                    {/* Amount Input */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-wallet-bg rounded-lg bg-[#262626] group  focus-within:outline-1 focus-within:outline-white">
                            <div className="flex-1 bg-[#262626]">
                                <Input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="text-4xl font-light border-none bg-[#262626] px-0 h-auto focus:outline-none"
                                    placeholder="$0"
                                    style={{
                                        background: "#262626"
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-black text-crypto-blue-foreground rounded-lg">
                                <div className="w-4 h-4 rounded-full bg-white"></div>
                                <span className="font-medium">ETH</span>
                            </div>
                        </div>

                        {/* Percentage Buttons */}
                        <div className="grid grid-cols-4 gap-2">
                            {percentageButtons.map((percentage) => (
                                <Button
                                    key={percentage}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        // Handle percentage selection
                                        console.log(`Selected ${percentage}`);
                                    }}
                                    className="text-sm"
                                >
                                    {percentage}
                                </Button>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            
            {/* Next Button */}
            <Button
                className="w-full bg-wallet-bg text-text-secondary h-12"
                disabled
            >
                Next
            </Button>
        </div>
    );
};