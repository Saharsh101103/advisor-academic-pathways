
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  code: string;
  title: string;
  instructor: string;
  credits: number;
  progress: number;
  status: "completed" | "in-progress" | "upcoming";
}

export const CourseCard = ({
  code,
  title,
  instructor,
  credits,
  progress,
  status
}: CourseCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-sm sm:text-base">{code}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{title}</p>
          </div>
          <Badge 
            variant={status === "completed" ? "default" : status === "in-progress" ? "secondary" : "outline"}
            className="text-xs whitespace-nowrap"
          >
            {status === "completed" ? "Completed" : 
             status === "in-progress" ? "In Progress" : "Upcoming"}
          </Badge>
        </div>
        
        <div className="text-xs sm:text-sm text-muted-foreground">
          <span>Prof. {instructor}</span>
          <span className="mx-2">•</span>
          <span>{credits} credits</span>
        </div>
        
        {status === "in-progress" && (
          <div className="space-y-1">
            <Progress value={progress} className="h-1" />
            <p className="text-xs text-right text-muted-foreground">{progress}% complete</p>
          </div>
        )}
      </div>
    </Card>
  );
};
