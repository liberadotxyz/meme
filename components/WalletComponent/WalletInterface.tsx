import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Send, ArrowDown, Copy, TrendingDown } from 'lucide-react';
import { WalletBalance } from './WalletBalance';
import { DepositScreen } from './DepositeScreen';
import { SendScreen } from './SendScreen';
import { ReceiveScreen } from './ReceiveScreen';
import { TransferScreen } from './Transfer';
import { getBalance } from '@/api/topToken';
import { useSession } from 'next-auth/react';
import { CopyableEthText } from '../ui/copy-text';
import Image from 'next/image';
type WalletView = 'main' | 'deposit' | 'send' | 'receive' | 'transfer';

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

interface BalanceProp  {
    token_address:string,
    name:string,
    symbol:string,
    balance:string,
    logo:string,
    balance_formatted:string;

}

export const WalletInterface = ({ onClose }: WalletInterfaceProps) => {
    const [currentView, setCurrentView] = useState<WalletView>('main');
    const [activeTab, setActiveTab] = useState('balance');
    const { data: session } = useSession();
    const [balance, setBalance] = useState<BalanceProp[]>([])
    const handleBack = () => {
        setCurrentView('main');
    };

    const getUserBalance = async () => {
        let {result} = await getBalance(session?.user.address || "");
        setBalance(result)
    }
    console.log("balance k aayo")
    useEffect(() => {
        getUserBalance()
    }, [])
    const renderCurrentView = () => {
        switch (currentView) {
            case 'deposit':
                return <DepositScreen onBack={handleBack} />;
            case 'send':
                return <SendScreen onBack={handleBack} />;
            case 'receive':
                return <ReceiveScreen onBack={handleBack} />;
            case 'transfer':
                return <TransferScreen onBack={handleBack}></TransferScreen>
            default:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">

                                <div>
                                    <h2 className="text-xl font-semibold">Address</h2>

                                    <div className="flex items-center gap-2 text-sm text-text-secondary">

                                        {/* <span>{session?.user.address?.slice(0,5)}...{session?.user.address?.slice(-4)}</span> */}
                                        <CopyableEthText text={session?.user.address || ""}></CopyableEthText>
                                        {/* <Copy className="w-4 h-4 cursor-pointer hover:text-foreground" /> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Balance */}
                        <WalletBalance balance={balance[0]} />

                        {/* Action Buttons */}
                        <div className="grid grid-cols-3 gap-4">
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 h-12 cursor-pointer"
                                onClick={() => setCurrentView('deposit')}
                            >
                                <Plus className="w-4 h-4" />
                                Deposit
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 h-12 cursor-pointer"
                                onClick={() => setCurrentView('send')}
                            >
                                <Send className="w-4 h-4" />
                                Send
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 h-12 cursor-pointer"
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
                                <div className='h-[352px] overflow-y-auto'>
                                    <h3 className="font-medium mb-2">Available balance</h3>
                                    <p className="text-sm text-text-secondary mb-4">
                                        These contribute to your total available balance
                                    </p>

                                    <div className="space-y-1">
                                        {balance.map((token) => (
                                            <div key={token.symbol} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#262626] cursor-pointer transition-colors"
                                                onClick={() => setCurrentView('transfer')}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <Image src={`${token.logo}`} width={30} height={30} alt='token'></Image>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {token.symbol }
                                                        </h4>
                                                        <p className="text-sm text-text-secondary">
                                                            {token.balance_formatted}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {/* <p className="font-medium">{token.value}</p> */}
                                                    {/* {token.change && (
                                                        <div className="flex items-center gap-1 text-sm text-destructive">
                                                            <TrendingDown className="w-3 h-3" />
                                                            {token.change}
                                                        </div>
                                                    )} */}
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
        <div className="w-full max-w-2xl mx-auto bg-wallet-surface rounded-2xl p-2">
            {renderCurrentView()}
        </div>
    );
};