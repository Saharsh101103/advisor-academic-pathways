
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CheckCircle, Clock, FileText, PenLine, Plus, Calendar as CalendarIcon, ChevronRight, X, AlertTriangle, CheckIcon, XIcon } from "lucide-react";
import { studentData, advisorData } from "@/data/mockData";

interface AdvisingSession {
  id: string;
  studentId: string;
  studentName: string;
  advisorId: string;
  advisorName: string;
  date: string;
  time: string;
  duration: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'requested';
  notes?: string;
  location: string;
  reason: string;
}

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
  
  // Form state for new session
  const [newSessionDate, setNewSessionDate] = useState("");
  const [newSessionTime, setNewSessionTime] = useState("");
  const [newSessionReason, setNewSessionReason] = useState("");
  
  // Filter sessions by status
  const upcomingSessions = sessions.filter(session => session.status === 'scheduled' || session.status === 'requested');
  const pastSessions = sessions.filter(session => session.status === 'completed' || session.status === 'cancelled');
  
  // Schedule a new session
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
      status: "requested",
      location: advisorData.office,
      reason: newSessionReason
    };
    
    setSessions([...sessions, newSession]);
    setIsSchedulingSession(false);
    resetNewSessionForm();
  };
  
  // Cancel a session
  const handleCancelSession = () => {
    if (!selectedSession) return;
    
    const updatedSessions = sessions.map(session => {
      if (session.id === selectedSession.id) {
        return { ...session, status: 'cancelled' };
      }
      return session;
    });
    
    setSessions(updatedSessions);
    setIsCancellingSession(false);
    setSelectedSession(null);
  };
  
  // Reset form fields
  const resetNewSessionForm = () => {
    setNewSessionDate("");
    setNewSessionTime("");
    setNewSessionReason("");
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get status badge color
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
      default:
        return null;
    }
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
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
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
                          onClick={() => {
                            setSelectedSession(session);
                            setIsViewingSession(true);
                          }}
                        >
                          View Details
                        </Button>
                        {session.status === 'scheduled' && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              setSelectedSession(session);
                              setIsCancellingSession(true);
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
                <div className="space-y-4">
                  {pastSessions.map((session) => (
                    <div key={session.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-md p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="hidden sm:flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center text-primary">
                          {session.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <X className="h-5 w-5" />
                          )}
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
                          onClick={() => {
                            setSelectedSession(session);
                            setIsViewingSession(true);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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
      
      {/* Info card */}
      <Card>
        <CardHeader>
          <CardTitle>About Academic Advising</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 border rounded-md">
              <Calendar className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-medium mb-2">Regular Check-ins</h3>
              <p className="text-sm text-muted-foreground">
                Meet with your advisor at least once per semester to stay on track with your academic goals.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 border rounded-md">
              <PenLine className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-medium mb-2">Course Planning</h3>
              <p className="text-sm text-muted-foreground">
                Get guidance on course selection, major requirements, and graduation pathways.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 border rounded-md">
              <Clock className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-medium mb-2">Office Hours</h3>
              <p className="text-sm text-muted-foreground">
                Your advisor, {advisorData.name}, is available during office hours: {advisorData.officeHours}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">{selectedSession.reason}</h3>
                {getStatusBadge(selectedSession.status)}
              </div>
              
              <div className="space-y-3">
                <div className="flex">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <div className="font-medium">Date & Time</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(selectedSession.date)} at {selectedSession.time} ({selectedSession.duration})
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <User className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <div className="font-medium">Advisor</div>
                    <div className="text-sm text-muted-foreground">{selectedSession.advisorName}</div>
                  </div>
                </div>
                
                <div className="flex">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">{selectedSession.location}</div>
                  </div>
                </div>
              </div>
              
              {selectedSession.notes && (
                <div className="rounded-md border p-3">
                  <div className="font-medium mb-2">Session Notes</div>
                  <p className="text-sm whitespace-pre-wrap">{selectedSession.notes}</p>
                </div>
              )}
              
              {selectedSession.status === 'scheduled' && (
                <div className="border-t pt-4 mt-4">
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      setIsViewingSession(false);
                      setIsCancellingSession(true);
                    }}
                  >
                    Cancel Session
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewingSession(false)}>Close</Button>
          </DialogFooter>
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
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newSessionDate}
                  onChange={(e) => setNewSessionDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select onValueChange={setNewSessionTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Meeting</Label>
              <Textarea
                id="reason"
                placeholder="Briefly describe the purpose of this meeting..."
                value={newSessionReason}
                onChange={(e) => setNewSessionReason(e.target.value)}
              />
            </div>
            
            <div className="rounded-md bg-muted p-3 text-sm">
              <div className="font-medium mb-1 flex items-center">
                <InfoIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                Advisor Availability
              </div>
              <p className="text-muted-foreground">
                {advisorData.name} is available during these office hours: {advisorData.officeHours}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSchedulingSession(false);
                resetNewSessionForm();
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleScheduleSession}
              disabled={!newSessionDate || !newSessionTime || !newSessionReason}
            >
              Request Session
            </Button>
          </DialogFooter>
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

// Helper Icon component
const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const User = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default AdvisingSessionsPage;
