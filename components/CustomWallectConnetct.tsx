// components/CustomWalletConnect.tsx

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { signIn } from 'next-auth/react';

export function CustomWalletConnect() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div>
            {!connected ? (
              <div className="flex flex-col gap-4">
                {/* Wallet Connect */}
                <button onClick={openConnectModal} className="p-3 bg-black text-white rounded">
                  Connect Wallet
                </button>

                {/* Social logins */}
                <button
                  onClick={() => signIn('google')}
                  className="p-3 bg-red-500 text-white rounded"
                >
                  Continue with Google
                </button>

                <button
                  onClick={() => signIn('twitter')}
                  className="p-3 bg-blue-400 text-white rounded"
                >
                  Continue with Twitter
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button onClick={openAccountModal}>{account.displayName}</button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
