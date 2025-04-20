
import { AdvisingSession } from "@/types/advising";

export interface SessionListProps {
  sessions: AdvisingSession[];
  onViewDetails: (session: AdvisingSession) => void;
  onCancelSession: (session: AdvisingSession) => void;
}

export interface SessionDetailsProps {
  session: AdvisingSession;
  onClose: () => void;
  onCancel?: () => void;
}

export interface ScheduleFormProps {
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

export interface InfoCardProps {
  advisorData: {
    name: string;
    officeHours: string;
  };
}
