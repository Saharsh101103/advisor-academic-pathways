
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InfoIcon } from "lucide-react";

interface ScheduleSessionFormProps {
  newSessionDate: string;
  newSessionTime: string;
  newSessionReason: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onReasonChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  advisorName: string;
  advisorOfficeHours: string;
}

export const ScheduleSessionForm = ({
  newSessionDate,
  newSessionTime,
  newSessionReason,
  onDateChange,
  onTimeChange,
  onReasonChange,
  onCancel,
  onSubmit,
  advisorName,
  advisorOfficeHours,
}: ScheduleSessionFormProps) => {
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={newSessionDate}
            onChange={(e) => onDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Select onValueChange={onTimeChange}>
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
          onChange={(e) => onReasonChange(e.target.value)}
        />
      </div>
      
      <div className="rounded-md bg-muted p-3 text-sm">
        <div className="font-medium mb-1 flex items-center">
          <InfoIcon className="h-4 w-4 mr-2 text-muted-foreground" />
          Advisor Availability
        </div>
        <p className="text-muted-foreground">
          {advisorName} is available during these office hours: {advisorOfficeHours}
        </p>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={onSubmit}
          disabled={!newSessionDate || !newSessionTime || !newSessionReason}
        >
          Request Session
        </Button>
      </DialogFooter>
    </div>
  );
};
