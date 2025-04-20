
export interface AdvisingSession {
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
