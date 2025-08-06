// WalletType.tsx

"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Send, ArrowDown, Copy, TrendingDown } from 'lucide-react';
import Image from 'next/image';
import { ArrowRight, Fingerprint } from "lucide-react";
// Import the hook instead of the component
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { memo, useMemo, useCallback } from "react";
 
type WalletView = 'main' | 'deposit' | 'send' | 'receive';

interface WalletInterfaceProps {
    onClose: () => void;
}

export const WalletType = ({ onClose }: WalletInterfaceProps) => {
    const [currentView, setCurrentView] = useState<WalletView>('main');
    const [activeTab, setActiveTab] = useState('balance');

    // Get the function to open the connect modal
    const { openConnectModal } = useConnectModal();

    const handleBack = () => {
        setCurrentView('main');
    };

    // New handler to close the shadcn/ui dialog and open the rainbowkit dialog
    const handleConnectWalletClick = () => {
        // First, close the shadcn/ui dialog
        onClose();
        // Then, open the RainbowKit modal
        openConnectModal?.();
    };

    return (
        <div className="w-full max-w-md mx-auto bg-wallet-surface rounded-2xl p-6">
            <div className="space-y-6">
                <div className=" flex items-center justify-center bg-background p-4">
                    <div className="w-full max-w-sm space-y-8 mx-8">
                        <div className="grid grid-cols-2 gap-4">
                            <Button className='bg-transparent h-15 p-6 border border-gray-500'>
                                <Image src="/google.svg" width={30} height={30} alt=""></Image>
                            </Button>
                            <Button className='bg-transparent h-15 p-6 border border-gray-500'>
                                <Image src="/google.svg" width={30} height={30} alt=""></Image>
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">or</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full h-16 bg-passkey-button hover:bg-passkey-button-hover border-none text-white transition-colors duration-200"
                                // Use the new handler here
                                onClick={handleConnectWalletClick}
                            >
                                <div className="flex items-center justify-center space-x-3">
                                    <span>Connect Wallet</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};