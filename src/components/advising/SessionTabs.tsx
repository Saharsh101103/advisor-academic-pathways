
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionList } from "./SessionList";
import { AdvisingSession } from "@/types/advising";

interface SessionTabsProps {
  upcomingSessions: AdvisingSession[];
  pastSessions: AdvisingSession[];
  onViewDetails: (session: AdvisingSession) => void;
  onCancelSession: (session: AdvisingSession) => void;
  onScheduleSession: () => void;
}

export const SessionTabs = ({
  upcomingSessions,
  pastSessions,
  onViewDetails,
  onCancelSession,
  onScheduleSession,
}: SessionTabsProps) => {
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="upcoming">
          Upcoming
          <Badge className="ml-2" variant="secondary">{upcomingSessions.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="past">
          Past
          <Badge className="ml-2" variant="secondary">{pastSessions.length}</Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="upcoming">
        {upcomingSessions.length > 0 ? (
          <SessionList
            sessions={upcomingSessions}
            onViewDetails={onViewDetails}
            onCancelSession={onCancelSession}
          />
        ) : (
          <div className="text-center py-10">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No upcoming sessions</h3>
            <p className="text-muted-foreground mb-4">Schedule a session with your advisor</p>
            <Button onClick={onScheduleSession}>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="past">
        {pastSessions.length > 0 ? (
          <SessionList
            sessions={pastSessions}
            onViewDetails={onViewDetails}
            onCancelSession={onCancelSession}
          />
        ) : (
          <div className="text-center py-10">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No past sessions</h3>
            <p className="text-muted-foreground">Your completed sessions will appear here</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

