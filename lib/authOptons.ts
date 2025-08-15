import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import type { Account, Profile, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
            version: "2.0",
            authorization: {
                params: {
                    scope: "tweet.read users.read offline.access",
                },
            },
            profile(profile: any) {
                return {
                    id: profile.data.id,
                    name: profile.data.name,
                    email: null,
                    image: profile.data.profile_image_url,
                    username: profile.data.username,
                };
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),


        Credentials({
            credentials: {},
            async authorize({ username }: any) {

                try {
                    const res = await fetch("https://backends.phaser.bot/api/v1/user/save/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: username,
                            display_name: "",
                            display_image: ""
                        }),
                    });

                    // console.log("user k raixa", await res.json())
                    if (res.ok) {
                        const data = await res.json();
                        return { ...data }
                    } else {
                        console.error("Backend error saving user:", await res.text());
                    }
                } catch (error) {

                }
                // const users = await getUser(email);
                // if (users.length === 0) return null;
                // // biome-ignore lint: Forbidden non-null assertion.
                // const passwordsMatch = await compare(password, users[0].password!);
                // if (!passwordsMatch) return null;
                // return { ...users[0], privateKey: users[0].privateKey } as any;
            },
        }),
    ],

    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            session.user = {
                ...session.user,
                username: token.username,
                id: token.userId,
                address: token.address,
                quick_buy_amount: token.quick_buy_amount
            };
            return session;
        },

        async jwt({
            token,
            user,
            account,
            profile,
        }: {
            token: JWT;
            user?: User;
            account?: Account | null;
            profile?: Profile;
        }) {
            // Always try to set username from provider
            if (profile && (profile as any).data?.username) {
                token.username = (profile as any).data.username; // Twitter
            } else if (profile?.name) {
                token.username = profile.name.replace(/\s+/g, "_"); // Google name fallback
            } else if (profile?.email) {
                token.username = profile.email.split("@")[0];
            } else if (user && (user as any).username) {
                token.username = (user as any).username;
            } else {

            }

            if (account) {
                try {
                    const res = await fetch("https://backends.phaser.bot/api/v1/user/save/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: token.username,
                            display_name: user?.name,
                            display_image: user?.image
                        }),
                    });

                    if (res.ok) {
                        const data = await res.json();
                        token.userId = data.id;
                        token.address = data.address;
                        token.quick_buy_amount = data.quick_buy_amount;

                    } else {
                        console.error("Backend error saving user:", await res.text());
                    }
                } catch (error) {
                    console.error("Error saving user:", error);
                }
            }

            return token;
        }
        ,
    },

    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
