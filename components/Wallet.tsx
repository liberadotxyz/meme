'use client';

import { startTransition, useOptimistic, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Settings,
    HelpCircle,
    Moon,
    TrendingUp,
    LogOut,
    ChevronUp,
    User
} from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react";

export function Wallet() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession()
    const [clickBuy, setClickBuy] = useState(false);
    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>

            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-3 px-4 py-1 h-auto rounded-md border border-border bg-card hover:bg-accent transition-colors"
                >
                    <Avatar className="w-8 h-7">
                        <AvatarImage src="/lovable-uploads/1440f4c0-7c35-4b80-ad71-a260ff5985b7.png" alt="Sardor" />
                        <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">0X12222</span>

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
                            {/* <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs font-semibold px-2 py-0.5">
                PRO
              </Badge> */}
                        </div>
                        <div className="text-sm text-muted-foreground">{session?.user?.username || session?.user?.email}</div>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <div className="p-1">
                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Quick Buy</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer">
                        <HelpCircle className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Preference</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Settings</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer">
                        <Moon className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Dark Mode</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer">
                        <TrendingUp className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Upgrade Plan</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-3 cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => {
                            signOut()
                        }}
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 