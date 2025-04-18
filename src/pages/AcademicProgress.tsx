
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, GraduationCap, XIcon } from "lucide-react";
import { degreeRequirementsData, studentData } from "@/data/mockData";

const AcademicProgress = () => {
  const { totalCredits, categories } = degreeRequirementsData;
  const totalCompletedCredits = categories.reduce(
    (acc, category) => acc + category.completedCredits,
    0
  );
  const overallProgress = Math.round((totalCompletedCredits / totalCredits) * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in-progress":
        return "text-blue-600";
      case "planned":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "planned":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const statusLabels: Record<string, string> = {
    "completed": "Completed",
    "in-progress": "In Progress",
    "planned": "Planned",
    "not-started": "Not Started",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Academic Progress</h1>
        <p className="text-muted-foreground">
          Track your degree requirements and progress towards graduation
        </p>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <GraduationCap className="mr-2" /> 
            {degreeRequirementsData.major} Degree Progress
          </CardTitle>
          <CardDescription>
            {totalCompletedCredits} of {totalCredits} credits completed ({overallProgress}%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="h-2" />
          
          <div className="mt-8 space-y-6">
            {categories.map((category, index) => {
              const categoryProgress = Math.round(
                (category.completedCredits / category.requiredCredits) * 100
              );
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-md">{category.name}</h3>
                    <span className="text-sm font-medium">
                      {category.completedCredits} / {category.requiredCredits} credits ({categoryProgress}%)
                    </span>
                  </div>
                  <Progress value={categoryProgress} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Course Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Course Requirements</CardTitle>
          <CardDescription>
            Detailed view of all courses required for your {degreeRequirementsData.major} degree
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={categories[0].name.toLowerCase().replace(/\s+/g, "-")}>
            <TabsList className="mb-4 w-full justify-start overflow-x-auto">
              {categories.map((category, index) => (
                <TabsTrigger 
                  key={index} 
                  value={category.name.toLowerCase().replace(/\s+/g, "-")}
                  className="min-w-max"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category, index) => (
              <TabsContent 
                key={index} 
                value={category.name.toLowerCase().replace(/\s+/g, "-")}
                className="pt-2"
              >
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm bg-muted/50">
                    <div className="col-span-3">Course</div>
                    <div className="col-span-5">Title</div>
                    <div className="col-span-1 text-center">Credits</div>
                    <div className="col-span-3 text-right">Status</div>
                  </div>
                  
                  {category.courses.map((course, courseIndex) => (
                    <div 
                      key={courseIndex} 
                      className={`grid grid-cols-12 gap-4 p-4 items-center text-sm ${
                        courseIndex !== category.courses.length - 1 ? "border-b" : ""
                      } hover:bg-muted/30 transition-colors`}
                    >
                      <div className="col-span-3 font-medium">{course.code}</div>
                      <div className="col-span-5">{course.title}</div>
                      <div className="col-span-1 text-center">{course.credits}</div>
                      <div className="col-span-3 text-right">
                        <Badge variant="outline" className={getBadgeColor(course.status)}>
                          {course.status === "completed" && <CheckIcon className="mr-1 h-3 w-3" />}
                          {statusLabels[course.status]}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <strong>Required:</strong> {category.requiredCredits} credits &bull; 
                  <strong className="ml-2">Completed:</strong> {category.completedCredits} credits &bull;
                  <strong className="ml-2">Remaining:</strong> {category.requiredCredits - category.completedCredits} credits
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* GPA and Other Academic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold">{studentData.gpa}</div>
                <div className="text-sm text-muted-foreground mt-2">of 4.0 scale</div>
                
                <div className="mt-6 text-sm">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="text-muted-foreground">Major GPA:</div>
                    <div className="text-right font-medium">3.8</div>
                    <div className="text-muted-foreground">Last Term GPA:</div>
                    <div className="text-right font-medium">3.9</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold">{studentData.completedCredits}</div>
                <div className="text-sm text-muted-foreground mt-2">credits completed</div>
                
                <div className="mt-6 text-sm">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="text-muted-foreground">Required:</div>
                    <div className="text-right font-medium">{studentData.requiredCredits}</div>
                    <div className="text-muted-foreground">In Progress:</div>
                    <div className="text-right font-medium">7</div>
                    <div className="text-muted-foreground">Remaining:</div>
                    <div className="text-right font-medium">{studentData.requiredCredits - studentData.completedCredits - 7}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Expected Graduation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold">May {studentData.expectedGraduation}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  {studentData.expectedGraduation - new Date().getFullYear()} years remaining
                </div>
                
                <div className="mt-6 text-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-green-100 rounded-md">
                      <div className="font-medium">On Track</div>
                      <div className="text-muted-foreground text-xs mt-1">Academic</div>
                    </div>
                    <div className="text-center p-2 bg-green-100 rounded-md">
                      <div className="font-medium">Complete</div>
                      <div className="text-muted-foreground text-xs mt-1">Core</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-100 rounded-md">
                      <div className="font-medium">In Progress</div>
                      <div className="text-muted-foreground text-xs mt-1">Electives</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcademicProgress;
