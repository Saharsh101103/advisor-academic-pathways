
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, PlusCircle, Calendar, CheckCircle, AlertCircle, ChevronRight, ChevronDown, BookOpen, X } from "lucide-react";
import { StudentCourseCard } from "@/components/dashboard/CourseCard";
import { coursesData, getCompletedCourses, getCurrentCourses, getUpcomingCourses } from "@/data/mockData";

// Types for course plan
interface CoursePlan {
  id: string;
  name: string;
  term: string;
  year: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  courses: string[];
}

// Mock course plans
const mockCoursePlans: CoursePlan[] = [
  {
    id: "plan1",
    name: "Fall 2024 Course Plan",
    term: "Fall",
    year: "2024",
    status: "submitted",
    courses: ["cs401", "cs450"],
  },
  {
    id: "plan2",
    name: "Spring 2025 Course Plan",
    term: "Spring",
    year: "2025",
    status: "draft",
    courses: ["cs460", "cs495"],
  },
];

// Available terms
const terms = ["Fall", "Spring", "Summer"];

// Available years
const years = ["2024", "2025", "2026", "2027", "2028"];

const CoursePlanning = () => {
  const [coursePlans, setCoursePlans] = useState<CoursePlan[]>(mockCoursePlans);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanTerm, setNewPlanTerm] = useState("Fall");
  const [newPlanYear, setNewPlanYear] = useState("2024");
  const [searchQuery, setSearchQuery] = useState("");

  const completedCourses = getCompletedCourses();
  const currentCourses = getCurrentCourses();
  const upcomingCourses = getUpcomingCourses();
  
  // Filter courses based on search query
  const filteredCourses = coursesData.filter(
    (course) =>
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create a new course plan
  const handleCreatePlan = () => {
    const newPlan: CoursePlan = {
      id: `plan${coursePlans.length + 1}`,
      name: newPlanName,
      term: newPlanTerm,
      year: newPlanYear,
      status: "draft",
      courses: [],
    };
    setCoursePlans([...coursePlans, newPlan]);
    setIsCreatingPlan(false);
    setNewPlanName("");
  };

  // Get status badge color
  const getStatusBadgeColor = (status: CoursePlan["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status: CoursePlan["status"]) => {
    switch (status) {
      case "draft":
        return null;
      case "submitted":
        return <Calendar className="h-4 w-4 mr-1" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Course Planning</h1>
        <p className="text-muted-foreground">
          Plan your future courses and get advisor approval
        </p>
      </div>

      {/* Course Plans */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Course Plans</CardTitle>
              <CardDescription>Create and manage your course plans</CardDescription>
            </div>
            <Button onClick={() => setIsCreatingPlan(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {coursePlans.length > 0 ? (
            <div className="space-y-4">
              {coursePlans.map((plan) => (
                <div
                  key={plan.id}
                  className="border rounded-md p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {plan.term} {plan.year} • {plan.courses.length} courses
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(plan.status)}
                      >
                        {getStatusIcon(plan.status)}
                        {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {plan.courses.length > 0 && (
                    <div className="mt-4 pl-7">
                      <div className="text-sm font-medium mb-2">Courses:</div>
                      <div className="flex flex-wrap gap-2">
                        {plan.courses.map((courseId) => {
                          const course = coursesData.find((c) => c.id === courseId);
                          return course ? (
                            <Badge key={courseId} variant="secondary">
                              {course.code}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-2">No course plans yet</div>
              <Button onClick={() => setIsCreatingPlan(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Your First Plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current and Upcoming Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">My Courses</CardTitle>
          <CardDescription>Current, upcoming, and completed courses</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current">
            <TabsList className="mb-4">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCourses.map((course) => (
                  <StudentCourseCard
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingCourses.map((course) => (
                  <StudentCourseCard
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

            <TabsContent value="completed" className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedCourses.map((course) => (
                  <StudentCourseCard
                    key={course.id}
                    code={course.code}
                    title={course.title}
                    instructor={course.instructor}
                    credits={course.credits}
                    progress={100}
                    status="completed"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Course Catalog */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Course Catalog</CardTitle>
              <CardDescription>Browse available courses</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm bg-muted/50">
              <div className="col-span-2">Code</div>
              <div className="col-span-5">Title</div>
              <div className="col-span-2">Credits</div>
              <div className="col-span-3">Prerequisites</div>
            </div>
            
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className={`grid grid-cols-12 gap-4 p-4 items-center text-sm ${
                    index !== filteredCourses.length - 1 ? "border-b" : ""
                  } hover:bg-muted/30 transition-colors`}
                >
                  <div className="col-span-2 font-medium">{course.code}</div>
                  <div className="col-span-5">{course.title}</div>
                  <div className="col-span-2">{course.credits} credits</div>
                  <div className="col-span-3">
                    {course.prerequisites.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {course.prerequisites.map((prereq) => {
                          const prereqCourse = coursesData.find(c => c.id === prereq);
                          return prereqCourse ? (
                            <Badge key={prereq} variant="outline" className="text-xs">
                              {prereqCourse.code}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">None</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No courses match your search criteria
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create Plan Dialog */}
      <AlertDialog open={isCreatingPlan} onOpenChange={setIsCreatingPlan}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Course Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the details for your new course plan. You can add courses after creating the plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                placeholder="e.g., Fall 2024 Course Plan"
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="term">Term</Label>
                <Select value={newPlanTerm} onValueChange={setNewPlanTerm}>
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => (
                      <SelectItem key={term} value={term}>
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Select value={newPlanYear} onValueChange={setNewPlanYear}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreatePlan} disabled={!newPlanName}>
              Create Plan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CoursePlanning;
