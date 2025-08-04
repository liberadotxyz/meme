import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

function NotificationPage() {
    return (
        <div className="flex w-full max-w-3xl m-auto flex-col gap-6 mt-10">
            <p className="text-2xl font-semibold">
                Notification
            </p>
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Trade</TabsTrigger>
                    <TabsTrigger value="password">Follow</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardContent className="grid gap-6 mx-auto">
                            <div className="grid gap-3">
                                <p className="text-center font-md">No Trades</p>
                                <p className="text-sm text-muted-foreground text-center">
                                    Show the Zora community what you're about.
                                </p>
                            </div>

                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>

                        <CardContent className="grid gap-6 mx-auto">
                            <div className="grid gap-3 items-center">
                                <p className="tabs-demo-current text-center font-md">No Follow</p>
                                <p className="text-sm text-muted-foreground text-center">
                                    Every post is a coin. Create one to start trading.
                                </p>
                            </div>

                        </CardContent>

                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}


export default NotificationPage;