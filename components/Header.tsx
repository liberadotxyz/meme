

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
// import { WalletDialog } from './WalletSection';
import { WalletDialog } from './WalletComponent/WalletDalog';
// import { GitHubLogoIcon } from '@radix-ui/react-icons';
// import { RiTwitterXFill } from '@remixicon/react';




export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const [showTooltip, setShowTooltip] = useState(false);
    const [triggerLogin, setTriggerLogin] = useState(false);
    const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleCloseDialog() {
        setIsSendDialogOpen(false);
    }
    async function onTransferSuccess() {

    }

    return (
        <header className="fixed left-0 right-0 bg-white dark:bg-black">
            <div className="mx-auto  px-4 py-4">
                <div className="rounded-xl ">
                    <div className="flex items-center justify-between px-4 py-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative flex items-center gap-2 cursor-pointer justify-between">
                                {/* <Image src={'/phaser.png'} width={40} height={40} alt='scaller'></Image> */}
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

                            <Button  className="text-black hover:bg-green-400  justify-start cursor-pointer p-2 bg-green-500 w-[130px]">
                                <Plus color="black" size={10}></Plus>  create coin
                            </Button>
                            </Link>
                            <div>
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                    onClick={() => setIsSendDialogOpen(true)}
                                    disabled={isLoading}
                                >
                                    <WalletMinimal size={25} className=" h-8 w-8" />
                                </Button>

                            </div>
                            <div className='flex items-center gap-2'>
                                <Wallet />
                            </div>


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

        </header>

    );
};




