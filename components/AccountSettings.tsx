"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Info } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

const AccountSettings = () => {
    //   const { toast } = useToast();
    const [username, setUsername] = useState("gyatz");
    const [email, setEmail] = useState("lobsang1765@gmail.com");
    const [displayName, setDisplayName] = useState("gyatz");
    const [bio, setBio] = useState("lets explore and build somethings beautiful together.");
    const [website, setWebsite] = useState("yourwebsite.xyz");
    const [marketingNotifications, setMarketingNotifications] = useState(true);
    const [inAppNotifications, setInAppNotifications] = useState(true);

    const zoraWallet = "0xcc0cf880e45ed2beff843faa24d62fee3a8fe129";
    const privyWallet = "0x9cdd15ee3aea5afec6dbc9d1d3a90d98600c661b";

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        // toast({
        //   title: "Copied!",
        //   description: `${label} copied to clipboard`,
        // });
    };

    return (
        <div className="min-h-screen bg-background text-foreground mt-10 mx-auto max-w-2xl p-6">
            <p className="text-2xl font-semibold mb-3">
                Settings
            </p>
            <div className=" ">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-muted h-12">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        {/* <TabsTrigger value="hidden">Hidden</TabsTrigger> */}
                    </TabsList>

                    <TabsContent value="account" className="space-y-8 mt-8">
                        {/* Username Section */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Info className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                                    <Input
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="pl-8 bg-input border-border h-12"
                                    />
                                </div>
                                <Button variant="secondary" size="sm" className="px-6 h-12">
                                    Save username
                                </Button>
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="space-y-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-input border-border h-12"
                                readOnly
                            />
                            <p className="text-sm text-muted-foreground">
                                The email address linked to your account.
                            </p>
                            <Button variant="outline" size="sm" className="w-fit h-12">
                                Update email
                            </Button>
                        </div>

                        {/* Wallet Addresses */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label>Zora wallet address</Label>
                                <div className="relative">
                                    <Input
                                        value={zoraWallet}
                                        className="bg-input border-border pr-12 h-12"
                                        readOnly
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-12"
                                        onClick={() => copyToClipboard(zoraWallet, "Zora wallet address")}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* <div className="space-y-3">
                                <Label>Privy wallet address</Label>
                                <Input
                                    value={privyWallet}
                                    className="bg-input border-border"
                                    readOnly
                                />
                                <Button variant="outline" size="sm" className="w-fit">
                                    Export privy wallet
                                </Button>
                            </div> */}
                        </div>

                        {/* Notifications */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium">Notifications</h3>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id="marketing"
                                        checked={marketingNotifications}
                                        onCheckedChange={(checked) => setMarketingNotifications(checked === true)}
                                    />
                                    <div className="space-y-1">
                                        <Label htmlFor="marketing" className="text-sm font-medium">
                                            Marketing email notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            You will receive updates on new features and promotions from Zora to your email address
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id="inapp"
                                        checked={inAppNotifications}
                                        onCheckedChange={(checked) => setInAppNotifications(checked === true)}
                                    />
                                    <div className="space-y-1">
                                        <Label htmlFor="inapp" className="text-sm font-medium">
                                            In-app notifications for creators
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Someone minted your edition, minting rewards for shared editions and first minter rewards
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button variant="secondary" size="sm" className="w-fit h-12">
                                Save settings
                            </Button>
                        </div>

                        {/* Backup Account */}
                        {/* <div className="space-y-4">
                            <h3 className="text-lg font-medium">Backup account</h3>
                            <p className="text-sm text-muted-foreground">
                                Ensure access to your account, secure your assets, and log in seamlessly
                                onto the Zora app without using a password.{" "}
                                <span className="underline cursor-pointer">Learn more</span>
                            </p>
                            <Button variant="outline" size="sm" className="w-fit">
                                Get started
                            </Button>
                        </div> */}

                        {/* Delete Account */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Delete Account</h3>
                            <p className="text-sm text-muted-foreground">
                                Deleting your account will permanently remove your offchain data from
                                Zora. Click the button below to initiate account deletion.
                            </p>
                            <Button variant="destructive" size="sm" className="w-fit">
                                Delete Account
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="profile" className="space-y-8 mt-8">
                        {/* Avatar */}
                        <div className="flex items-center gap-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="bg-accent-green text-accent-green-foreground text-2xl font-bold">
                                    人
                                </AvatarFallback>
                            </Avatar>
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-muted rounded-full" />
                            </div>
                        </div>

                        {/* Display Name */}
                        <div className="space-y-3">
                            <Label htmlFor="displayName">Display name</Label>
                            <Input
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="bg-input border-border h-12"
                            />
                        </div>

                        {/* Bio */}
                        <div className="space-y-3">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="bg-input border-border min-h-24 resize-none"
                                maxLength={250}
                            />
                            <p className="text-sm text-muted-foreground text-right">
                                Max 250
                            </p>
                        </div>

                        {/* Website */}
                        <div className="space-y-3">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="bg-input border-border h-12"
                            />
                            <Button variant="secondary" size="sm" className="w-fit h-12">
                                Save
                            </Button>
                        </div>

                        {/* Verify */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Verify</h3>

                            <div className="space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-3 h-12 bg-input border-border"
                                >
                                    <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center">
                                        <span className="text-background text-xs font-bold">𝕏</span>
                                    </div>
                                    Verify Twitter
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-3 h-12 bg-input border-border"
                                >
                                    <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                                        <span className="text-white text-xs">ⓕ</span>
                                    </div>
                                    Verify Farcaster
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-3 h-12 bg-input border-border"
                                >
                                    <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center">
                                        <span className="text-background text-xs font-bold">♪</span>
                                    </div>
                                    Verify TikTok
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="hidden" className="space-y-8 mt-8">
                        <div className="text-center text-muted-foreground">
                            Hidden content section
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AccountSettings;