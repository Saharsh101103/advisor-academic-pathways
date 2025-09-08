// api/advisor.ts
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

// Get all advisors
export const getAdvisors = async () => {
  const { data } = await axios.get(`${API_URL}/advisors`);
  return data.data.advisors;
};

// Get students
export const getStudents = async () => {
  const { data } = await axios.get(`${API_URL}/students`);
  return data.data.students;
};

// Get events
export const getEvents = async () => {
  const { data } = await axios.get(`${API_URL}/events`);
  return data.data.events;
};

// Get announcements
export const getAnnouncements = async () => {
  const { data } = await axios.get(`${API_URL}/announcements`);
  return data.data.announcements;
};
