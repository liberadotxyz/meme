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
    };
  }

  interface User {
    username?: string | null;
    id?: string | null;
    address?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string | null;
    userId?: string | null;     // Matches `id` returned from backend
    address?: string | null;    // Matches `address` returned from backend
  }
}
