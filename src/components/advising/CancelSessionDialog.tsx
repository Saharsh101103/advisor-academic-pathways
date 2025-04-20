
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AdvisingSession } from "@/types/advising";
import { formatDate } from "@/utils/dateUtils";

interface CancelSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: AdvisingSession | null;
  onConfirmCancel: () => void;
}

export const CancelSessionDialog = ({
  open,
  onOpenChange,
  session,
  onConfirmCancel,
}: CancelSessionDialogProps) => {
  if (!session) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Advising Session</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel this advising session? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <div className="rounded-md bg-muted p-3">
            <div className="text-sm">
              <strong>Date:</strong> {formatDate(session.date)}
            </div>
            <div className="text-sm">
              <strong>Time:</strong> {session.time}
            </div>
            <div className="text-sm">
              <strong>Advisor:</strong> {session.advisorName}
            </div>
            <div className="text-sm">
              <strong>Reason:</strong> {session.reason}
            </div>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>No, Keep Session</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirmCancel} 
            className="bg-destructive text-destructive-foreground"
          >
            Yes, Cancel Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

