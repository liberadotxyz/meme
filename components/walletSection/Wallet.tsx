import {
    Dialog,
    DialogContent,
    DialogHeader,
} from '@/components/ui/dialog';
import { WalletType } from './WalletType';
interface WalletDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PopupWalletDialog = ({ isOpen, onClose }: WalletDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent 
                className="w-[420px] h-[350px] flex items-center p-0 rounded-3xl shadow-none"
                disableOverlay={true} // <-- Add this prop to disable the shadcn/ui overlay
            >
                <WalletType onClose={onClose} />
            </DialogContent>
        </Dialog>
    );
};