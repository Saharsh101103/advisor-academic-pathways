import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, GraduationCap, MessageSquare, BookOpen, AlertTriangle } from "lucide-react";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { UpcomingEventsCard } from "@/components/dashboard/UpcomingEventsCard";
import { 
  studentData, 
  calculateAcademicProgress, 
  getCurrentCourses, 
  getUpcomingCourses, 
  getUpcomingEvents,
  getRecentAnnouncements,
  Event
} from "@/data/mockData";

const StudentDashboard = () => {
  const progress = calculateAcademicProgress();
  const currentCourses = getCurrentCourses();
  const upcomingCourses = getUpcomingCourses();
  const upcomingEvents = getUpcomingEvents();
  const announcements = getRecentAnnouncements();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hello, {studentData.name}</h1>
          <p className="text-muted-foreground">
            {studentData.major} • Year {new Date().getFullYear() - studentData.enrollmentYear + 1}
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Advisor
          </Button>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Academic Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Academic Progress
            </CardTitle>
            <CardDescription>
              {studentData.completedCredits} of {studentData.requiredCredits} credits
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2 flex justify-center">
            <ProgressRing progress={progress} size={150} className="my-4" />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <span className="text-xs text-muted-foreground">{announcement.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                  <div className="text-xs text-right">— {announcement.author}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses and Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="current">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <TabsList className="mb-2 sm:mb-0">
                <TabsTrigger value="current">Current Courses</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm">
                <BookOpen className="mr-2 h-4 w-4" />
                View All Courses
              </Button>
            </div>
            <TabsContent value="current" className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    code={course.code}
                    title={course.title}
                    instructor={course.instructor}
                    credits={course.credits}
                    progress={course.progress}
                    status="in-progress"
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="upcoming" className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upcomingCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    code={course.code}
                    title={course.title}
                    instructor={course.instructor}
                    credits={course.credits}
                    progress={0}
                    status="upcoming"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-1 h-full">
          <UpcomingEventsCard events={upcomingEvents} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.gpa}</div>
            <p className="text-xs text-muted-foreground">of 4.0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Credits Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.completedCredits}</div>
            <p className="text-xs text-muted-foreground">of {studentData.requiredCredits} required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCourses.length}</div>
            <p className="text-xs text-muted-foreground">{currentCourses.reduce((acc, course) => acc + course.credits, 0)} credits</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expected Graduation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">May {studentData.expectedGraduation}</div>
            <p className="text-xs text-muted-foreground">{studentData.expectedGraduation - new Date().getFullYear()} years remaining</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
