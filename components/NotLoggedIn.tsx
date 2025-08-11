"use client"
import { useDispatch } from "react-redux";
// import { updateLogin } from "../../store/login";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { memo } from 'react';
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { FaTwitter } from 'react-icons/fa';
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const MemoizedConnectButton = memo(ConnectButton);

export const NotLoggedIn = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [iswalletpopup, setWalletPopup] = useState(false);

    async function onTransferSuccess() {
        setWalletPopup(false)
    }

    return (
        <div className="flex justify-center items-center bg-black"> {/* ContainerBackground */}
            <div className="text-center mt-[25%] max-w-md mx-auto"> {/* ContainerExtended */}
                <div className="text-[32px] font-semibold mb-4 md:text-[42px] md:mb-5"> {/* Title */}
                    Connect Wallet
                </div>
                <div className="text-sm mb-5 leading-[22px] md:text-lg md:mb-10 md:leading-6"> {/* Subtitle */}
                    Please connect your wallet to view this page
                </div>
                <div className="flex justify-center">
                    {/* <MemoizedConnectButton /> */}

                   
                    <Button
                        onClick={() => setWalletPopup(true)}
                        disabled={isLoading}
                    >
                        Connect to wallet
                    </Button>
                </div>

            </div>
             <CustomDialog isOpen={iswalletpopup} onClose={() => setWalletPopup(false)}>
                <WalletType onClose={() => setWalletPopup(false)} />
            </CustomDialog>
        </div>
    );
};
const GoogleIcon = () => (
    <img src="/google.svg" alt="Google" width={30} height={30} />
);

const TwitterIcon = () => (
    <FaTwitter width={40} height={40} color='white' />
);
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

const WalletType = ({ onClose }: { onClose: any }) => {
    const [currentView, setCurrentView] = useState('main');
    const [activeTab, setActiveTab] = useState('balance');
    const handleBack = () => setCurrentView('main');
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const { address, isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();




    const [triggerLogin, setTriggerLogin] = useState(false);

    useEffect(() => {
        if (triggerLogin && isConnected && address) {
            const doRegister = async () => {
                try {
                    const payload = {
                        username: address,
                    };
                    await signIn("credentials", {
                        ...payload,
                        redirect: true 
                    });
                } catch (error) {
                    console.error('Login failed:', error);
                } finally {
                    setTriggerLogin(false); // reset
                }
            };
            doRegister();
        }
    }, [triggerLogin, isConnected, address]);

    const handleLogin = () => {
        if (!isConnected) {
            openConnectModal?.(); // open Metamask
            setTriggerLogin(true); // wait for connection to complete
        } else {
            setTriggerLogin(true); // already connected, proceed
        }
    };
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
                            <Button
                                className="h-14 min-w-[180px] group rounded-lg text-[#cdfb00] transition-all duration-300 hover:scale-105 border border-[#cdfb00] bg-[#4b5714] shadow-lg hover:bg-[#4b5714] relative" // Added 'relative' here
                                onClick={handleLogin}

                            >
                                {/* <Zap className='w-7 h-7' color='#cdfb00'></Zap> */}
                                Connect Wallet
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};