import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
// import type { NextAuthConfig } from "next-auth";
import type { Account, Profile, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { Provider } from "next-auth/providers/index";
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
    ],
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            if (token?.username && typeof token.username === "string") {
                session.user = {
                    ...session.user,
                    username: token.username,
                };
            }
            return session;
        },

        async jwt({
            token,
            user,
            account,
            profile,
            isNewUser,
            trigger,
        }: {
            token: JWT;
            user?: User;
            account?: Account | null;
            profile?: Profile;
            isNewUser?: boolean;
            trigger?: "signIn" | "signUp" | "update";
        }) {
            if (profile && (profile as any).data?.username) {
                token.username = (profile as any).data.username;
            } else if (user && (user as any).username) {
                token.username = (user as any).username;
            }

            return token;

        },
    },
    pages: {
        signIn: "/auth/signin", // 👈 Add this line to specify your custom sign-in page

        error: "/auth/error",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

