"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
// import { config } from "./config";
import { config } from './WallectConfig';
import { lightTheme, RainbowKitProvider, type Locale } from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient();

function WagmiProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}  >
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider  theme={lightTheme({
          accentColor: '#00a63e', 
          accentColorForeground: 'white',
          borderRadius: 'medium',
        })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default WagmiProviders;
