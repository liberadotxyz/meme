import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy } from 'lucide-react';

interface ReceiveScreenProps {
  onBack: () => void;
}

export const ReceiveScreen = ({ onBack }: ReceiveScreenProps) => {
  const walletAddress = '0xcc0c...e129';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('0xcc0c1234567890abcdef1234567890abcdef1e129');
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-semibold">Receive</h2>
      </div>

      {/* Description */}
      <div className="text-center">
        <p className="text-text-secondary">
          Use this address to receive ETH on Base network
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center">
        <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center relative">
          {/* QR Code placeholder - you can replace this with an actual QR code generator */}
          <div className="w-full h-full bg-gradient-to-br from-black to-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <div className="grid grid-cols-8 gap-1 w-48 h-48">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 ${
                      Math.random() > 0.5 ? 'bg-white' : 'bg-black'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Centered wallet icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-crypto-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Address Info */}
      <div className="p-4 bg-wallet-bg rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm">Ξ</span>
            </div>
            <div>
              <h3 className="font-medium">{walletAddress}</h3>
              <p className="text-sm text-text-secondary">Balance: 0 ETH</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyAddress}
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Base address
          </Button>
        </div>
      </div>
    </div>
  );
};