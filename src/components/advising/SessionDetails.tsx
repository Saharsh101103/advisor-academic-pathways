
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, User, MapPin } from "lucide-react";
import { AdvisingSession } from "@/types/advising";

interface SessionDetailsProps {
  session: AdvisingSession;
  onClose: () => void;
  onCancel?: () => void;
}

export const SessionDetails = ({ session, onClose, onCancel }: SessionDetailsProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-3">
        <div className="flex">
          <CalendarIcon className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <div className="font-medium">Date & Time</div>
            <div className="text-sm text-muted-foreground">
              {formatDate(session.date)} at {session.time} ({session.duration})
            </div>
          </div>
        </div>
        
        <div className="flex">
          <User className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <div className="font-medium">Advisor</div>
            <div className="text-sm text-muted-foreground">{session.advisorName}</div>
          </div>
        </div>
        
        <div className="flex">
          <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
          <div>
            <div className="font-medium">Location</div>
            <div className="text-sm text-muted-foreground">{session.location}</div>
          </div>
        </div>
      </div>
      
      {session.notes && (
        <div className="rounded-md border p-3">
          <div className="font-medium mb-2">Session Notes</div>
          <p className="text-sm whitespace-pre-wrap">{session.notes}</p>
        </div>
      )}
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Close</Button>
        {session.status === 'scheduled' && onCancel && (
          <Button variant="destructive" onClick={onCancel}>
            Cancel Session
          </Button>
        )}
      </DialogFooter>
    </div>
  );
};
