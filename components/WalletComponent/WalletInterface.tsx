import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Send, ArrowDown, Copy, TrendingDown } from 'lucide-react';
import { WalletBalance } from './WalletBalance';
import { DepositScreen } from './DepositeScreen';
import { SendScreen } from './SendScreen';
import { ReceiveScreen } from './ReceiveScreen';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';

type WalletView = 'main' | 'deposit' | 'send' | 'receive';

interface Token {
    symbol: string;
    balance: string;
    icon: string;
    value: string;
    change?: string;
}

const mockTokens: Token[] = [
    {
        symbol: 'ETH',
        balance: '0',
        icon: 'ethereum',
        value: '$0',
    },
    {
        symbol: 'ZORA',
        balance: '0',
        icon: 'zora',
        value: '$0',
        change: '-0.01%',
    },
    {
        symbol: 'USDC',
        balance: '0',
        icon: 'usdc',
        value: '$0',
    },
];

interface WalletInterfaceProps {
    onClose: () => void;
}

export const WalletInterface = ({ onClose }: WalletInterfaceProps) => {
    const [currentView, setCurrentView] = useState<WalletView>('main');
    const [activeTab, setActiveTab] = useState('balance');

    const handleBack = () => {
        setCurrentView('main');
    };

    const renderCurrentView = () => {
        switch (currentView) {
            case 'deposit':
                return <DepositScreen onBack={handleBack} />;
            case 'send':
                return <SendScreen onBack={handleBack} />;
            case 'receive':
                return <ReceiveScreen onBack={handleBack} />;
            default:
                return (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">

                                <div>
                                    <h2 className="text-xl font-semibold">gyatz</h2>

                                    <div className="flex items-center gap-2 text-sm text-text-secondary">

                                        <span>0xcc0c...e129</span>
                                        <Copy className="w-4 h-4 cursor-pointer hover:text-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Balance */}
                        <WalletBalance />

                        {/* Action Buttons */}
                        <div className="grid grid-cols-3 gap-4">
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 h-12"
                                onClick={() => setCurrentView('deposit')}
                            >
                                <Plus className="w-4 h-4" />
                                Deposit
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 h-12"
                                onClick={() => setCurrentView('send')}
                            >
                                <Send className="w-4 h-4" />
                                Send
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 h-12"
                                onClick={() => setCurrentView('receive')}
                            >
                                <ArrowDown className="w-4 h-4" />
                                Receive
                            </Button>
                        </div>

                        {/* Creator Coin Section */}
                        {/* <Card className="p-4 bg-wallet-surface">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-crypto-green flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">💰</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Creator coin</h3>
                                        <p className="text-sm text-text-secondary">13,901,573</p>
                                    </div>
                                </div>
                                <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                                    Claim
                                </Button>
                            </div>
                        </Card> */}

                        {/* Holdings Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="w-full h-12">
                                <TabsTrigger value="balance" className="flex-1">Balance</TabsTrigger>
                                <TabsTrigger value="holdings" className="flex-1">Transaction</TabsTrigger>
                            </TabsList>

                            <TabsContent value="balance" className="space-y-4 mt-6">
                                <div>
                                    <h3 className="font-medium mb-2">Available balance</h3>
                                    <p className="text-sm text-text-secondary mb-4">
                                        These contribute to your total available balance
                                    </p>

                                    <div className="space-y-1">
                                        {mockTokens.map((token) => (
                                            <div key={token.symbol} className="flex items-center justify-between p-3 rounded-lg hover:bg-wallet-bg transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                        {token.symbol === 'ETH' && <span className="text-sm">Ξ</span>}
                                                        {token.symbol === 'ZORA' && <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>}
                                                        {token.symbol === 'USDC' && <span className="text-xs font-bold">US</span>}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {token.symbol === 'ETH' ? 'Ethereum' : token.symbol === 'ZORA' ? 'Zora' : 'USDC'}
                                                        </h4>
                                                        <p className="text-sm text-text-secondary">
                                                            {token.balance} {token.symbol}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">{token.value}</p>
                                                    {token.change && (
                                                        <div className="flex items-center gap-1 text-sm text-destructive">
                                                            <TrendingDown className="w-3 h-3" />
                                                            {token.change}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="holdings" className="mt-6">
                                <div className="text-center py-8 text-text-secondary">
                                    <p>No holdings to display</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                );
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-wallet-surface rounded-2xl p-6">
            {renderCurrentView()}
        </div>
    );
};