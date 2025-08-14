import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Copy } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
interface DepositScreenProps {
  onBack: () => void;
}

export const DepositScreen = ({ onBack }: DepositScreenProps) => {
  const [amount, setAmount] = useState('0');
  const [selectedToken, setSelectedToken] = useState('ETH');
  const { data: session } = useSession()
  const presetAmounts = ['0.001 ETH', '0.01 ETH', '0.1 ETH', 'Max'];
  const handleCopyAddress = () => {
    if (session?.user.address) {
      navigator.clipboard.writeText(session.user.address)
        .then(() => {
          // Optional: Show a toast/notification (e.g., "Copied!")
          toast("address copied!!!")
          console.log("Address copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy address:", err);
        });
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-semibold">Deposit ETH</h2>
      </div>

      {/* Ethereum Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center relative">
          <span className="text-2xl">Ξ</span>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-foreground rounded-full flex items-center justify-center">
            <span className="text-white text-xs">+</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-center space-y-2">
        <p className="text-text-secondary">
          Top up your balance from your external wallet or send Base ETH to the address below.
        </p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 p-3 bg-wallet-bg rounded-lg">
        {/* <div className="w-4 h-4 rounded-full bg-crypto-blue"></div> */}
        <span className="text-sm font-mono">{session?.user.address?.slice(0, 4)}...{session?.user.address?.slice(-4)}</span>
        <Copy
          className="w-4 h-4 ml-auto cursor-pointer  hover:text-green-500"
          onClick={handleCopyAddress}
        />      </div>

      {/* Amount Input */}
      <div className="space-y-4 ">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Amount</span>
          <span className="text-sm text-text-secondary">Balance 0.0002949484 ETH</span>
        </div>

        <div className="flex group items-center gap-4 p-2 bg-[#262626] rounded-md  focus-within:outline-2 focus-within:outline-white">
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-4xl font-light border-none bg-[#262626] px-0 h-auto text-left focus:outline-none focus:ring-0"
            placeholder="0"
            style={{
              background: "#262626",

            }}
          />
          <div className="flex items-center gap-2 px-3 py-2 bg-crypto-blue text-crypto-blue-foreground rounded-lg bg-black">
            <div className="w-4 h-4 rounded-full bg-white"></div>
            <span className="font-medium">ETH</span>
            <span className="text-xs">▼</span>
          </div>
        </div>

        {/* Preset Amounts */}
        <div className="grid grid-cols-4 gap-2">
          {presetAmounts.map((preset) => (
            <Button
              key={preset}
              variant="outline"
              size="sm"
              onClick={() => setAmount(preset.includes('ETH') ? preset.split(' ')[0] : '0.0002949484')}
              className="text-xs"
            >
              {preset}
            </Button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <Button className="w-full bg-foreground text-background hover:bg-foreground/90 h-12">
        Choose ETH amount
      </Button>
    </div>
  );
};