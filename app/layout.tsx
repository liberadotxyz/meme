import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { TrendingSidebar } from "@/components/TrendingSidebar";
import WagmiProviders from "@/components/walletConnector/WalletProvider";
import StoreProvider from "@/redux/reduxProvider";

import { Toaster } from 'sonner';
import SessionProviderWrapper from "@/components/session-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bora: Create & Trade meme coins",
  description: "Create and trade meme coins with one click using Apple Pay, Google Pay or credit cards. Trade any coin on Base Chain. No crypto experience needed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProviderWrapper>
          <WagmiProviders>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <StoreProvider>
                <Header />
                <div className="flex pt-16 min-h-screen m-auto">
                  <main className="w-full mt-10">
                    <Toaster position="top-center" />
                    {children}
                  </main>
                </div>
              </StoreProvider>
            </ThemeProvider>
          </WagmiProviders>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
