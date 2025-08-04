'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Copy,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
// import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Progress } from '@/components/ui/progress';

interface RawToken {
  contractAddress: string;
  name: string;
  symbol: string;
  imageUrl?: string;
  metadata: {
    image?: string;
  };
  decimals: number;
  balance: {
    raw: string;
    decimal: number;
  };
  usdPrice?: number;
  usdValue?: number;
  contractVerified?: boolean;
}

interface TokenTransferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: RawToken[];
  onSuccess: () => Promise<void>;
}

interface TransactionResult {
  success: boolean;
  timestamp: Date;
  error?: string;
  hash?: string;
}

export function WalletDialog({
  isOpen,
  onClose,
  tokens,
  onSuccess,
}: TokenTransferDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null);

  const selectedTokenData = tokens.find(
    (token) => token.contractAddress === selectedTokenAddress
  );

  const handleSubmit = async () => {
    if (!selectedTokenData) {
    //   toast.error('Please select a token');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletId: "0xd8A36719e23063aCb395D589E6e69B56e9adDb0c",
          receiverAddress: address,
          tokenAddress: selectedTokenAddress,
          amount: amount,
          tokenSymbol: selectedTokenData.symbol,
          network: "asbtract"
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Transaction failed');
      }

      setTransactionResult({
        success: true,
        timestamp: new Date(),
        hash: result?.transactionHash,
      });
      setStep(5);
      await onSuccess();
    //   toast.success('Transfer completed successfully!');
    } catch (error) {
      console.error('Transfer error:', error);
      setTransactionResult({
        success: false,
        timestamp: new Date(),
        error: error instanceof Error ? error.message : 'Transaction failed',
      });
      setStep(5);
    //   toast.error('Transaction failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setSelectedTokenAddress('');
    setAmount('');
    setAddress('');
    setTransactionResult(null);
  };

  const formatBalance = (balance: string, decimals: number) => {
    return (parseFloat(balance) / Math.pow(10, decimals)).toFixed(4);
  };

  const calculateUsdValue = (
    balance: string,
    decimals: number,
    quoteRate: number = 1
  ) => {
    return (parseFloat(balance) / Math.pow(10, decimals)) * quoteRate;
  };

  // const handleQuickAmount = (percentage: number) => {
  //   if (selectedTokenData) {
  //     const maxAmount = parseFloat(selectedTokenData.balance.raw) / Math.pow(10, selectedTokenData.decimals);
  //     const newAmount = maxAmount * (percentage / 100);
  //     setAmount(newAmount.toString());
  //   }
  // };

  const handleQuickAmount = (percentage: number) => {
  if (selectedTokenData) {
    const maxAmount = parseFloat(selectedTokenData.balance.raw) / Math.pow(10, selectedTokenData.decimals);

    // Use 99% if the percentage is 100
    const effectivePercentage = percentage === 100 ? 97.5 : percentage;
    const newAmount = maxAmount * (effectivePercentage / 100);

    setAmount(newAmount.toString());
  }
};

  const handleAmountChange = (newValue: string) => {
    if (selectedTokenData) {
      const decimalRegex = new RegExp(`^(\\d+)(\\.(\\d{0,${selectedTokenData.decimals}}))?$`);
      if (newValue === '' || decimalRegex.test(newValue)) {
        setAmount(newValue);
      }
    } else {
      setAmount(newValue);
    }
  };

  const renderTokenInfo = (showSelectedAmount: boolean = false) => {
    if (!selectedTokenData) return null;

    const tokenBalance = showSelectedAmount
      ? parseFloat(amount)
      : parseFloat(selectedTokenData.balance.raw) / Math.pow(10, selectedTokenData.decimals);

    const usdValue = tokenBalance * (selectedTokenData.usdPrice || 1);

    return (
      <Card className="mb-4 p-4 bg-muted/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={selectedTokenData.metadata.image || '/placeholder.svg'}
              alt={selectedTokenData.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            {selectedTokenData.contractVerified && (
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">
              {selectedTokenData.name} <span className="text-muted-foreground">({selectedTokenData.symbol})</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {showSelectedAmount
                ? `Sending: ${amount} ${selectedTokenData.symbol}`
                : `Balance: ${formatBalance(selectedTokenData.balance.raw, selectedTokenData.decimals)}`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-base font-medium">${usdValue.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">
              ${(selectedTokenData.usdPrice || 1).toFixed(2)} per token
            </p>
          </div>
        </div>
      </Card>
    );
  };

  const renderStepContent = () => {
    const tokenSymbol = selectedTokenData?.symbol || '';

    switch (step) {
      case 1:
        return (
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Select Token</Label>
              <span className="text-xs text-muted-foreground">
                {tokens.length} tokens available
              </span>
            </div>
            
          </div>
        );

      case 2:
        return (
          <div className="grid gap-4 py-4">
            {renderTokenInfo()}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Amount</Label>
                <span className="text-xs text-muted-foreground">
                  Max: {selectedTokenData ? formatBalance(selectedTokenData.balance.raw, selectedTokenData.decimals) : '0'} {tokenSymbol}
                </span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e:any) => handleAmountChange(e.target.value)}
                  className="text-lg py-6 pl-4 pr-20"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {tokenSymbol}
                </div>
              </div>
              {selectedTokenData && amount && (
                <p className="text-sm text-muted-foreground text-right">
                  ≈ ${(parseFloat(amount) * (selectedTokenData.usdPrice || 1)).toFixed(2)}
                </p>
              )}
              <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                {[25, 50, 75, 100].map((percent) => (
                  <Button
                    key={percent}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAmount(percent)}
                    className="flex-1 min-w-[60px]"
                  >
                    {percent === 100 ? 'Max' : `${percent}%`}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid gap-4 py-4">
            {renderTokenInfo(true)}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Recipient Address</Label>
              <Input
                placeholder="0x..."
                value={address}
                onChange={(e:any) => setAddress(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Double check the address before sending
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="grid gap-4 py-4">
            <h3 className="font-semibold text-center">Review Transaction</h3>
            <Card className="space-y-4 p-4 bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="text-sm font-medium">Your Wallet</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">To</span>
                <span className="text-sm font-medium font-mono break-all">{address}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <div className="text-right">
                    <span className="text-sm font-medium">
                      {amount} {tokenSymbol}
                    </span>
                    {selectedTokenData?.usdPrice && (
                      <span className="block text-xs text-muted-foreground">
                        ≈ ${(parseFloat(amount) * selectedTokenData.usdPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  {/* <span className="text-sm text-muted-foreground">Network Fee</span> */}
                  {/* <span className="text-sm font-medium">~$0.50</span> */}
                </div>
              </div>
            </Card>
          </div>
        );

      case 5:
        if (!transactionResult) return null;

        return (
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              {transactionResult.success ? (
                <>
                  <div className="relative">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                    <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-xl font-semibold">
                    Transfer Complete
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your transaction was successful
                  </p>
                </>
              ) : (
                <>
                  <AlertCircle className="h-16 w-16 text-red-500" />
                  <h3 className="text-xl font-semibold">
                    Transfer Failed
                  </h3>
                  {transactionResult.error && (
                    <p className="text-sm text-red-500 max-w-xs">
                      {transactionResult.error}
                    </p>
                  )}
                </>
              )}
            </div>

            <Card className="p-4 space-y-4 bg-muted/50">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Token</p>
                  <p className="font-medium">
                    {selectedTokenData?.name} ({tokenSymbol})
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">
                    {amount} {tokenSymbol}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Recipient</p>
                  <p className="font-medium font-mono break-all">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {transactionResult.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>

              {transactionResult.hash && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Transaction</p>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://abscan.org/tx/${transactionResult.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View on Explorer
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          navigator.clipboard.writeText(transactionResult.hash || '');
                        //   toast.success('Copied to clipboard');
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 5 ? 'Transaction Details' : `Send Tokens ${step > 1 ? `(${step}/4)` : ''}`}
          </DialogTitle>
        </DialogHeader>

        {/* {step > 1 && step < 5 && (
          <Progress value={(step / 4) * 100} className="h-1 mb-4" />
        )} */}

        {renderStepContent()}

        <div className="flex justify-between gap-3">
          {step === 5 ? (
            <Button className="w-full" onClick={handleClose}>
              Done
            </Button>
          ) : (
            <>
              {step > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={() => setStep((s:any) => s - 1)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              )}
              {step < 4 ? (
                <Button
                  className="ml-auto"
                  onClick={() => setStep((s:any) => s + 1)}
                  disabled={
                    (step === 1 && !selectedTokenAddress) ||
                    (step === 2 && !amount) ||
                    (step === 3 && !address)
                  }
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  className="ml-auto"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    'Confirm & Send'
                  )}
                </Button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}