'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { signOut, useSession } from "next-auth/react";
import { useDisconnect } from 'wagmi';
import {
    Settings,
    HelpCircle,
    Moon,
    TrendingUp,
    LogOut,
    ChevronUp,
    User,
    ArrowLeft,
    ArrowRight,
    Landmark
} from 'lucide-react';
import { quickBuySetting } from '@/api/topToken';
import { useDispatch } from 'react-redux';
import { setBuy } from '@/redux/quickbuy';
import Image from 'next/image';
export function Wallet() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const [clickBuy, setClickBuy] = useState(false);
    const { disconnect } = useDisconnect();
    const [value, setValue] = useState("0.001")
    const dispatch = useDispatch()
    const setPrice = async () => {
        let payload = {
            "username": session?.user.address,
            "amount": value
        }
        await quickBuySetting(payload);
        dispatch(setBuy({
            value: value

        }));
        setClickBuy(false)
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-3 px-4 py-1 h-auto rounded-md border border-border bg-card hover:bg-accent transition-colors"
                >
                    <Avatar className="w-8 h-7">
                        <AvatarFallback>
                            {
                                session?.user.image ? <>
                                    <Image src={`${session?.user.image}`}
                                        alt={""}
                                        height={30}
                                        width={30}
                                    ></Image></> :
                                    <User className="w-4 h-4" />
                            }
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{session?.user.address?.slice(0, 4)}...{session?.user.address?.slice(-4)}</span>
                    <ChevronUp className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-[300px] p-0">
                {/* User Profile Section */}
                <div className="flex items-center gap-3 p-4 pb-3">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={`${session?.user.image}`} alt="Sardor" />
                        <AvatarFallback><User className="w-6 h-6" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{session?.user?.username || session?.user?.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{session?.user?.username || session?.user?.email}</div>
                    </div>
                </div>

                <DropdownMenuSeparator />

                {clickBuy ? (
                    <div className='p-3 flex flex-col gap-3'>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setClickBuy(false)}>
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back</span>
                        </div>
                        <div className="space-y-2">
                            <Label>Quick buy amount</Label>
                            <Input value={value} onChange={(e) => {
                                setValue(e.target.value)
                            }} />
                            <Button onClick={(e) => {
                                e.preventDefault(); // prevents navigation
                                e.stopPropagation();
                                setPrice();
                            }}>Set</Button>
                        </div>
                    </div>
                ) : (
                    <div className="p-1">
                        <DropdownMenuItem
                            className="flex items-center gap-3 px-3 py-3 cursor-pointer"
                            onSelect={(e) => {
                                e.preventDefault(); // keep dropdown open
                                setClickBuy(true);
                            }}
                        >
                            <div className='flex items-center justify-between w-full'>
                                <div className='flex gap-1'>
                                    <Landmark className="w-5 h-5 text-muted-foreground" />
                                    <span className="font-medium">Quick Buy</span>
                                </div>
                                <div>
                                    <ArrowRight size={15} color='white'></ArrowRight>
                                </div>
                            </div>

                        </DropdownMenuItem>

                        {/* <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer">
                            <HelpCircle className="w-5 h-5 text-muted-foreground" />
                            <span className="font-medium">Preference</span>
                        </DropdownMenuItem> */}

                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer">
                            <Settings className="w-5 h-5 text-muted-foreground" />
                            <span className="font-medium">Settings</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer">
                            <Moon className="w-5 h-5 text-muted-foreground" />
                            <span className="font-medium">Dark Mode</span>
                        </DropdownMenuItem>

                        {/* <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer">
                            <TrendingUp className="w-5 h-5 text-muted-foreground" />
                            <span className="font-medium">Upgrade Plan</span>
                        </DropdownMenuItem> */}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            className="flex items-center gap-3 px-3 py-3 cursor-pointer text-destructive focus:text-destructive"
                            onClick={() => {
                                disconnect();
                                localStorage.removeItem('wagmi.connected');
                                localStorage.removeItem('wagmi.wallet');
                                signOut();
                            }}
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sign Out</span>
                        </DropdownMenuItem>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
