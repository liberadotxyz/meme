

'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { Menu, WalletMinimal, Plus } from 'lucide-react';
import { Wallet } from './Wallet';
import { WalletDialog } from './WalletComponent/WalletDalog';
import { PopupWalletDialog } from './walletSection/Wallet';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CustomWalletConnect } from './CustomWallectConnetct';
import { FaTwitter } from 'react-icons/fa';
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation';

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const [showTooltip, setShowTooltip] = useState(false);
    const [triggerLogin, setTriggerLogin] = useState(false);
    const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [iswalletpopup, setWalletPopup] = useState(false);
    const { data: session } = useSession();
    async function handleCloseDialog() {
        setIsSendDialogOpen(false);
    }
    async function onTransferSuccess() {
        setWalletPopup(false)
    }

    async function handleClosePopupDialog() {
        setIsSendDialogOpen(false);
    }

    return (
        <header className="fixed left-0 right-0 bg-white dark:bg-black z-10">
            <div className="mx-auto  px-4 py-4">
                <div className="rounded-xl ">
                    <div className="flex items-center justify-between px-4 py-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative flex items-center gap-2 cursor-pointer justify-between">
                                <p className='text-xl font-medium'>Gtz</p>
                            </div>
                        </Link>
                        <div
                            className="max-w-xl w-full flex items-center gap-1 bg-[#f5f5f5] dark:bg-[#323232] p-2 rounded-md border border-gray-300 dark:border-gray-500 focus-within:border-black dark:focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-gray-400"
                            tabIndex={-1}
                        >
                            <span className="text-gray-500 dark:text-gray-400">
                                <Search size={18} />
                            </span>
                            <input
                                className="w-full border-0 bg-transparent font-bold focus:outline-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                placeholder="Search"
                                onFocus={(e) => e.currentTarget.parentElement?.focus()}
                            />
                        </div>

                        <div className='flex items-center gap-2'>
                            <Link href={'/launch'} className="cursor-pointer">

                                <Button className="text-black hover:bg-green-400  justify-start cursor-pointer p-2 bg-green-500 w-[130px]">
                                    <Plus color="black" size={10}></Plus>  create coin
                                </Button>

                            </Link>

                            <div>

                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto cursor-pointer"
                                    onClick={() => setIsSendDialogOpen(true)}
                                    disabled={isLoading}
                                >
                                    <WalletMinimal size={25} className=" h-8 w-8" />
                                </Button>

                            </div>

                            {
                                session?.user ?
                                    <>
                                        <div className='flex items-center gap-2'>
                                            <Wallet />
                                        </div>
                                    </> : <div>
                                        <Button
                                            onClick={() => setWalletPopup(true)}
                                            disabled={isLoading}
                                        >
                                            Connect
                                        </Button>
                                    </div>

                            }




                        </div>

                    </div>
                </div>


            </div>

            <WalletDialog
                isOpen={isSendDialogOpen}
                onClose={handleCloseDialog}
                tokens={[]}
                onSuccess={onTransferSuccess}
            ></WalletDialog>

            <CustomDialog isOpen={iswalletpopup} onClose={() => setWalletPopup(false)}>
                <WalletType onClose={() => setWalletPopup(false)} />
            </CustomDialog>


        </header>

    );
};

const CustomDialog = ({ isOpen, onClose, children }: { isOpen: any, onClose: any, children: any }) => {
    const dialogRef = useRef(null);

    // Close on escape key press
    useEffect(() => {
        const handleEscape = (event: any) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >

            <div
                ref={dialogRef}
                className="bg-white rounded-3xl shadow-2xl transition-transform duration-300 transform scale-95 opacity-0"
                style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)', opacity: isOpen ? 1 : 0 }}
            >
                {children}
            </div>
        </div>
    );
};

const GoogleIcon = () => (
    <img src="/google.svg" alt="Google" width={30} height={30} />
);

const TwitterIcon = () => (
    <FaTwitter width={40} height={40} color='white' />
);

// WalletType component is now the content for our custom dialog
const WalletType = ({ onClose }: { onClose: any }) => {
    const [currentView, setCurrentView] = useState('main');
    const [activeTab, setActiveTab] = useState('balance');
    const handleBack = () => setCurrentView('main');
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    return (
        <div className="w-full 
        max-w-md 
        mx-auto
         bg-gray-900
          rounded-2xl
           p-6
            text-white h-[320px]
            flex
            flex-direction
            ">

            <div className=" flex flex-col items-center justify-center bg-gray-900 p-4">
                <div className="w-full max-w-sm space-y-8 mx-8">
                    <div className="grid grid-cols-2 gap-4">
                        <Button className='bg-gray-800 h-15 p-6 border border-gray-700 hover:bg-gray-700' onClick={() => signIn("google")}>
                            <GoogleIcon />
                        </Button>
                        <Button className='bg-gray-800 h-15 p-6 border border-gray-700 hover:bg-gray-700' onClick={() => {
                            signIn("twitter", {
                                callbackUrl: "/", // or any specific route you want to return to
                            })
                        }}>
                            <TwitterIcon />
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-gray-900 px-2 text-gray-400">or</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-center w-full">
                            <ConnectButton />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};




