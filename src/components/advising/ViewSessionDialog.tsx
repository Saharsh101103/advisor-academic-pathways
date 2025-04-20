
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SessionDetails } from "./SessionDetails";
import { AdvisingSession } from "@/types/advising";

interface ViewSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: AdvisingSession | null;
  onClose: () => void;
  onCancel: () => void;
}

export const ViewSessionDialog = ({
  open,
  onOpenChange,
  session,
  onClose,
  onCancel,
}: ViewSessionDialogProps) => {
  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Advising Session Details</DialogTitle>
          <DialogDescription>
            View the details of your advising session
          </DialogDescription>
        </DialogHeader>
        
        <SessionDetails
          session={session}
          onClose={onClose}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

