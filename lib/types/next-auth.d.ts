import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
      id?: string | null;       // Added user ID from backend
      address?: string | null;  // Added wallet address from backend
      quick_buy_amount?: string | null;
    };
  }

  interface User {
    username?: string | null;
    id?: string | null;
    address?: string | null;
    quick_buy_amount?: string | null;

  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string | null;
    userId?: string | null;     // Matches `id` returned from backend
    address?: string | null;    // Matches `address` returned from backend
    quick_buy_amount?: string | null;

  }
}
