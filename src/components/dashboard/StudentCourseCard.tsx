
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StudentCourseCardProps {
  code: string;
  title: string;
  instructor: string;
  credits: number;
  progress: number;
  status: "in-progress" | "upcoming" | "completed";
}

export const StudentCourseCard = ({
  code,
  title,
  instructor,
  credits,
  progress,
  status,
}: StudentCourseCardProps) => {
  const statusColors = {
    "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    "upcoming": "bg-purple-100 text-purple-800 border-purple-200",
    "completed": "bg-green-100 text-green-800 border-green-200",
  };

  const statusLabels = {
    "in-progress": "In Progress",
    "upcoming": "Upcoming",
    "completed": "Completed",
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            <CardDescription className="text-sm mt-1">{code} • {credits} Credits</CardDescription>
          </div>
          <Badge className={statusColors[status]} variant="outline">
            {statusLabels[status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Instructor: {instructor}
        </div>
        {status === "in-progress" && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Course Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
