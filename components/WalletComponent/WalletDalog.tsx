import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { WalletInterface } from './WalletInterface';

interface WalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tokens?: any[];
  onSuccess?: () => void;
}

export const WalletDialog = ({ isOpen, onClose, tokens, onSuccess }: WalletDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[420px] p-0  rounded-3xl shadow-none">
        <WalletInterface onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};