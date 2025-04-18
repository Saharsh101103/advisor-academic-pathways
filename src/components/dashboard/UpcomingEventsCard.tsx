
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "advising" | "deadline" | "class";
}

interface UpcomingEventsCardProps {
  events: Event[];
}

export const UpcomingEventsCard = ({ events }: UpcomingEventsCardProps) => {
  const getEventTypeStyles = (type: Event["type"]) => {
    switch (type) {
      case "advising":
        return "bg-advising-primary";
      case "deadline":
        return "bg-advising-danger";
      case "class":
        return "bg-advising-secondary";
      default:
        return "bg-advising-primary";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${getEventTypeStyles(event.type)}`} />
                <div className="w-px h-full bg-border flex-1 mx-auto my-1" />
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-medium">{event.title}</h4>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{event.date}</span>
                  <span className="mx-1">•</span>
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
