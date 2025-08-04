import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

interface SendScreenProps {
  onBack: () => void;
}

export const SendScreen = ({ onBack }: SendScreenProps) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('0');
  const [selectedToken, setSelectedToken] = useState('ETH');

  const percentageButtons = ['10%', '25%', '50%', '100%'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-semibold">Send</h2>
      </div>

      {/* Recipient Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">To</label>
        <Input
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter a username or address"
          className="h-12"
        />
      </div>

      {/* Amount Input */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-wallet-bg rounded-lg">
          <div className="flex-1">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-4xl font-light border-none bg-transparent px-0 h-auto"
              placeholder="$0"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-crypto-blue text-crypto-blue-foreground rounded-lg">
            <div className="w-4 h-4 rounded-full bg-white"></div>
            <span className="font-medium">ETH</span>
          </div>
        </div>

        {/* Percentage Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {percentageButtons.map((percentage) => (
            <Button
              key={percentage}
              variant="outline"
              size="sm"
              onClick={() => {
                // Handle percentage selection
                console.log(`Selected ${percentage}`);
              }}
              className="text-sm"
            >
              {percentage}
            </Button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <Button 
        className="w-full bg-wallet-bg text-text-secondary h-12" 
        disabled
      >
        Next
      </Button>
    </div>
  );
};