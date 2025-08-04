import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/', 
    newUser: '/', 
  },
  providers: [
  
  ],
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isTryingToAccessApp = nextUrl.pathname.startsWith('/chat'); 
      const isRootPath = nextUrl.pathname === '/'; 


      if (isLoggedIn && isRootPath) {
        return Response.redirect(new URL('/chat', nextUrl));
      }

      if (isTryingToAccessApp && !isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      if (!isLoggedIn && isRootPath) {
        return true;
      }

      if (isLoggedIn && isTryingToAccessApp) {
        return true;
      }
      
      
      return true;
    },
  },
} satisfies NextAuthConfig;