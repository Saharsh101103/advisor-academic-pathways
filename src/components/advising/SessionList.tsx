
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckIcon, XIcon } from "lucide-react";
import { AdvisingSession } from "@/types/advising";

interface SessionListProps {
  sessions: AdvisingSession[];
  onViewDetails: (session: AdvisingSession) => void;
  onCancelSession: (session: AdvisingSession) => void;
}

export const SessionList = ({ sessions, onViewDetails, onCancelSession }: SessionListProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status: AdvisingSession['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200" variant="outline">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline"><CheckIcon className="mr-1 h-3 w-3" />Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200" variant="outline"><XIcon className="mr-1 h-3 w-3" />Cancelled</Badge>;
      case 'requested':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200" variant="outline">Requested</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div key={session.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-md p-4 hover:bg-muted/50 transition-colors">
          <div className="flex items-start gap-3">
            <div className="hidden sm:flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{session.reason}</h3>
                {getStatusBadge(session.status)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                <span>{formatDate(session.date)}</span>
                <span className="mx-2">•</span>
                <span>{session.time}</span>
                <span className="mx-2">•</span>
                <span>{session.duration}</span>
              </div>
              <div className="text-sm mt-1">
                <span className="text-muted-foreground">With: </span>
                <span>{session.advisorName}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3 sm:mt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(session)}
            >
              View Details
            </Button>
            {session.status === 'scheduled' && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onCancelSession(session)}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
