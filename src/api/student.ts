// src/api/student.ts
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

// --- Students ---
export const getAcademicProgress = async (student_id: number) => {
  const { data } = await axios.get(`${API_URL}/students/academic`, {
    params: { student_id },
  });
  return data.data.academic_performance; // from docs.yaml
};

export const getStudent = async (student_id: number) => {
  const { data } = await axios.get(`${API_URL}/students`);
  // find the student from the list
  return data.data.students.find((s) => s.serial_id === student_id);
};

// --- Courses ---
export const getStudentCourses = async (
  student_id: number,
  status: "UPCOMING" | "IN_PROGRESS" | "COMPLETED"
) => {
  const { data } = await axios.get(`${API_URL}/courses/student`, {
    params: { student_id, status },
  });
  return data.data.courses;
};

// --- Announcements ---
export const getAnnouncements = async () => {
  const { data } = await axios.get(`${API_URL}/announcements`);
  return data.data.announcements;
};

// --- Events ---
export const getEvents = async () => {
  const { data } = await axios.get(`${API_URL}/events`);
  return data.data.events;
};

