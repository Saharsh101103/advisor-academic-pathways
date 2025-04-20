
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { InfoCardProps } from "./AdvisingInterfaces";

export const InfoCard = ({ advisorData }: InfoCardProps) => {
  return (
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
            <Calendar className="h-10 w-10 text-primary mb-3" />
            <h3 className="font-medium mb-2">Course Planning</h3>
            <p className="text-sm text-muted-foreground">
              Get guidance on course selection, major requirements, and graduation pathways.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 border rounded-md">
            <Calendar className="h-10 w-10 text-primary mb-3" />
            <h3 className="font-medium mb-2">Office Hours</h3>
            <p className="text-sm text-muted-foreground">
              Your advisor, {advisorData.name}, is available during office hours: {advisorData.officeHours}.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
