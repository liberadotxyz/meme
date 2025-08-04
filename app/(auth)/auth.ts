import { compare } from 'bcrypt-ts';
import NextAuth, { type DefaultSession, } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// import { authConfig } from './auth.config';
import { authConfig } from './auth.config';

declare module 'next-auth' {
  interface User {
    privateKey: string;
    earlyAccess: boolean;
    address: string
  }
  interface Session extends DefaultSession {
    user: User & {
      privateKey: string;
      earlyAccess: boolean;
      address: string

    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        // Example: Replace with your actual user lookup and password check logic
        // const users = await getUser(email);
        // if (users.length === 0) return null;
        // const passwordsMatch = await compare(password, users[0].password!);
        // if (!passwordsMatch) return null;
        // return { ...users[0], privateKey: users[0].privateKey, earlyAccess: users[0].earlyAccess, address: users[0].address } as any;

        // Temporary mock user for demonstration (remove in production)
        return {
          privateKey: "mockPrivateKey",
          earlyAccess: false,
          address: "mockAddress"
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.privateKey = user.privateKey;
        token.earlyAccess = user.earlyAccess;
        token.address = user.address
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.privateKey = token.privateKey as string;
        session.user.earlyAccess = token.earlyAccess as boolean;
        session.user.address = token.address as string;
      }
      return session;
    },
  },
});