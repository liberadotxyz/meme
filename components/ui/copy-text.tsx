// copyable-eth-text.tsx
import { Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface Props {
  text: string;
  showExplorer?: boolean;
}

export const CopyableEthText = ({ text, showExplorer = false }: Props) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Address copied to clipboard');
  };

  const isValidEthAddress = /^0x[a-fA-F0-9]{40}$/.test(text);
  const shouldShowExplorerLink = showExplorer && isValidEthAddress;

  return (
    <div className="flex w-full select-none items-center gap-2 rounded-lg  p-2">
      <div className="min-w-0 flex truncate">
        <span className="block font-mono text-sm">{text}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          onClick={() => handleCopy(text)}
          className="h-4 w-6 hover:bg-sidebar-accent/50"
        >
          <Copy className="h-3.5 w-3.5" />
        </Button>
       
      </div>
    </div>
  );
};