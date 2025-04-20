import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, FileText, Plus } from "lucide-react";
import { studentData, advisorData } from "@/data/mockData";
import { SessionList } from "@/components/advising/SessionList";
import { SessionDetails } from "@/components/advising/SessionDetails";
import { ScheduleSessionForm } from "@/components/advising/ScheduleSessionForm";
import { InfoCard } from "@/components/advising/InfoCard";
import { AdvisingSession } from "@/types/advising";
import { formatDate } from "@/utils/dateUtils";

// Mock data for advising sessions
const mockAdvisingSessions: AdvisingSession[] = [
  {
    id: "session1",
    studentId: "1",
    studentName: studentData.name,
    advisorId: "a1",
    advisorName: advisorData.name,
    date: "2024-04-25",
    time: "14:00",
    duration: "30 minutes",
    status: "scheduled",
    location: advisorData.office,
    reason: "Course registration for Fall 2024"
  },
  {
    id: "session2",
    studentId: "1",
    studentName: studentData.name,
    advisorId: "a1",
    advisorName: advisorData.name,
    date: "2024-03-15",
    time: "11:00",
    duration: "45 minutes",
    status: "completed",
    notes: "Discussed course selection and internship opportunities. Recommended applying for summer internships in tech companies.",
    location: advisorData.office,
    reason: "Mid-term progress review"
  },
  {
    id: "session3",
    studentId: "1",
    studentName: studentData.name,
    advisorId: "a1",
    advisorName: advisorData.name,
    date: "2024-02-10",
    time: "09:30",
    duration: "30 minutes",
    status: "completed",
    notes: "Reviewed academic progress and set goals for the semester. Student is doing well in all courses.",
    location: advisorData.office,
    reason: "Semester planning"
  }
];

const AdvisingSessionsPage = () => {
  const [sessions, setSessions] = useState<AdvisingSession[]>(mockAdvisingSessions);
  const [selectedSession, setSelectedSession] = useState<AdvisingSession | null>(null);
  const [isViewingSession, setIsViewingSession] = useState(false);
  const [isSchedulingSession, setIsSchedulingSession] = useState(false);
  const [isCancellingSession, setIsCancellingSession] = useState(false);
  
  const [newSessionDate, setNewSessionDate] = useState("");
  const [newSessionTime, setNewSessionTime] = useState("");
  const [newSessionReason, setNewSessionReason] = useState("");
  
  const upcomingSessions = sessions.filter(session => session.status === 'scheduled' || session.status === 'requested');
  const pastSessions = sessions.filter(session => session.status === 'completed' || session.status === 'cancelled');
  
  const handleScheduleSession = () => {
    const newSession: AdvisingSession = {
      id: `session${sessions.length + 1}`,
      studentId: studentData.id,
      studentName: studentData.name,
      advisorId: "a1",
      advisorName: advisorData.name,
      date: newSessionDate,
      time: newSessionTime,
      duration: "30 minutes",
      status: "requested" as const,
      location: advisorData.office,
      reason: newSessionReason
    };
    
    setSessions([...sessions, newSession]);
    setIsSchedulingSession(false);
    resetNewSessionForm();
  };
  
  const handleCancelSession = () => {
    if (!selectedSession) return;
    
    const updatedSessions = sessions.map(session => {
      if (session.id === selectedSession.id) {
        return { ...session, status: 'cancelled' as const };
      }
      return session;
    });
    
    setSessions(updatedSessions);
    setIsCancellingSession(false);
    setSelectedSession(null);
  };
  
  const resetNewSessionForm = () => {
    setNewSessionDate("");
    setNewSessionTime("");
    setNewSessionReason("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advising Sessions</h1>
          <p className="text-muted-foreground">
            Schedule and manage your academic advising appointments
          </p>
        </div>
        <Button onClick={() => setIsSchedulingSession(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Sessions</CardTitle>
          <CardDescription>View your upcoming and past advising sessions</CardDescription>
        </CardHeader>
        <CardContent>
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
                  onViewDetails={(session) => {
                    setSelectedSession(session);
                    setIsViewingSession(true);
                  }}
                  onCancelSession={(session) => {
                    setSelectedSession(session);
                    setIsCancellingSession(true);
                  }}
                />
              ) : (
                <div className="text-center py-10">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No upcoming sessions</h3>
                  <p className="text-muted-foreground mb-4">Schedule a session with your advisor</p>
                  <Button onClick={() => setIsSchedulingSession(true)}>
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
                  onViewDetails={(session) => {
                    setSelectedSession(session);
                    setIsViewingSession(true);
                  }}
                  onCancelSession={(session) => {
                    setSelectedSession(session);
                    setIsCancellingSession(true);
                  }}
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
        </CardContent>
      </Card>
      
      <InfoCard advisorData={advisorData} />
      
      {/* Session Detail Dialog */}
      <Dialog open={isViewingSession} onOpenChange={setIsViewingSession}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Advising Session Details</DialogTitle>
            <DialogDescription>
              View the details of your advising session
            </DialogDescription>
          </DialogHeader>
          
          {selectedSession && (
            <SessionDetails
              session={selectedSession}
              onClose={() => setIsViewingSession(false)}
              onCancel={() => {
                setIsViewingSession(false);
                setIsCancellingSession(true);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Schedule Session Dialog */}
      <Dialog open={isSchedulingSession} onOpenChange={(open) => {
        setIsSchedulingSession(open);
        if (!open) resetNewSessionForm();
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Advising Session</DialogTitle>
            <DialogDescription>
              Request an appointment with your academic advisor, {advisorData.name}
            </DialogDescription>
          </DialogHeader>
          
          <ScheduleSessionForm
            newSessionDate={newSessionDate}
            newSessionTime={newSessionTime}
            newSessionReason={newSessionReason}
            onDateChange={setNewSessionDate}
            onTimeChange={setNewSessionTime}
            onReasonChange={setNewSessionReason}
            onCancel={() => {
              setIsSchedulingSession(false);
              resetNewSessionForm();
            }}
            onSubmit={handleScheduleSession}
            advisorName={advisorData.name}
            advisorOfficeHours={advisorData.officeHours}
          />
        </DialogContent>
      </Dialog>
      
      {/* Cancel Session Alert */}
      <AlertDialog open={isCancellingSession} onOpenChange={setIsCancellingSession}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Advising Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this advising session? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {selectedSession && (
            <div className="py-4">
              <div className="rounded-md bg-muted p-3">
                <div className="text-sm">
                  <strong>Date:</strong> {formatDate(selectedSession.date)}
                </div>
                <div className="text-sm">
                  <strong>Time:</strong> {selectedSession.time}
                </div>
                <div className="text-sm">
                  <strong>Advisor:</strong> {selectedSession.advisorName}
                </div>
                <div className="text-sm">
                  <strong>Reason:</strong> {selectedSession.reason}
                </div>
              </div>
            </div>
          )}
          
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Session</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelSession} className="bg-destructive text-destructive-foreground">
              Yes, Cancel Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdvisingSessionsPage;
