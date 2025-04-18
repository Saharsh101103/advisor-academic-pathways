
// Student Data
export const studentData = {
  id: "s12345",
  name: "Jamie Smith",
  email: "jamie.smith@university.edu",
  major: "Computer Science",
  minor: "Mathematics",
  enrollmentYear: 2021,
  expectedGraduation: 2025,
  gpa: 3.7,
  advisorId: "a98765",
  completedCredits: 75,
  requiredCredits: 120,
};

// Advisor Data
export const advisorData = {
  id: "a98765",
  name: "Dr. Alex Johnson",
  email: "alex.johnson@university.edu",
  department: "Computer Science",
  office: "Tech Building, Room 305",
  officeHours: "Mon/Wed 1-3pm, Fri 10am-12pm",
  phone: "(555) 123-4567",
  students: ["s12345", "s23456", "s34567", "s45678", "s56789"],
};

// Courses Data
export const coursesData = [
  {
    id: "cs101",
    code: "CS 101",
    title: "Introduction to Computer Science",
    description: "Fundamental concepts of computer science and programming.",
    credits: 4,
    instructor: "Dr. Emily Chen",
    prerequisites: [],
    semester: "Fall 2021",
    status: "completed",
    progress: 100,
    grade: "A",
  },
  {
    id: "cs201",
    code: "CS 201",
    title: "Data Structures and Algorithms",
    description: "Study of fundamental data structures and algorithms.",
    credits: 4,
    instructor: "Dr. Michael Rodriguez",
    prerequisites: ["cs101"],
    semester: "Spring 2022",
    status: "completed",
    progress: 100,
    grade: "A-",
  },
  {
    id: "math245",
    code: "MATH 245",
    title: "Discrete Mathematics",
    description: "Mathematical structures and techniques fundamental to computer science.",
    credits: 3,
    instructor: "Dr. Sarah Wilson",
    prerequisites: [],
    semester: "Fall 2022",
    status: "completed",
    progress: 100,
    grade: "B+",
  },
  {
    id: "cs301",
    code: "CS 301",
    title: "Software Engineering",
    description: "Principles and practices of software development and engineering.",
    credits: 4,
    instructor: "Dr. James Taylor",
    prerequisites: ["cs201"],
    semester: "Spring 2023",
    status: "completed",
    progress: 100,
    grade: "A",
  },
  {
    id: "cs305",
    code: "CS 305",
    title: "Database Systems",
    description: "Design and implementation of database systems.",
    credits: 3,
    instructor: "Dr. Lisa Wong",
    prerequisites: ["cs201"],
    semester: "Fall 2023",
    status: "completed",
    progress: 100,
    grade: "B",
  },
  {
    id: "cs340",
    code: "CS 340",
    title: "Operating Systems",
    description: "Theory and implementation of operating systems.",
    credits: 4,
    instructor: "Dr. Robert Brown",
    prerequisites: ["cs201"],
    semester: "Spring 2024",
    status: "in-progress",
    progress: 65,
    grade: null,
  },
  {
    id: "cs350",
    code: "CS 350",
    title: "Computer Networks",
    description: "Fundamentals of computer networks and protocols.",
    credits: 3,
    instructor: "Dr. Patricia Martinez",
    prerequisites: ["cs201"],
    semester: "Spring 2024",
    status: "in-progress",
    progress: 70,
    grade: null,
  },
  {
    id: "cs401",
    code: "CS 401",
    title: "Artificial Intelligence",
    description: "Introduction to principles and techniques of AI.",
    credits: 4,
    instructor: "Dr. Alex Johnson",
    prerequisites: ["cs201", "math245"],
    semester: "Fall 2024",
    status: "upcoming",
    progress: 0,
    grade: null,
  },
  {
    id: "cs450",
    code: "CS 450",
    title: "Machine Learning",
    description: "Fundamentals of machine learning algorithms and applications.",
    credits: 3,
    instructor: "Dr. David Lee",
    prerequisites: ["cs201", "math245"],
    semester: "Fall 2024",
    status: "upcoming",
    progress: 0,
    grade: null,
  },
];

// Events Data
export const eventsData = [
  {
    id: "e1",
    title: "Advising Appointment",
    date: "May 25, 2024",
    time: "2:00 PM",
    type: "advising",
    description: "Course selection advising for Fall 2024",
    location: "Tech Building, Room 305",
  },
  {
    id: "e2",
    title: "Course Registration Deadline",
    date: "June 1, 2024",
    time: "11:59 PM",
    type: "deadline",
    description: "Last day to register for Fall 2024 classes",
    location: "Online",
  },
  {
    id: "e3",
    title: "CS 340 Final Project Due",
    date: "June 10, 2024",
    time: "11:59 PM",
    type: "deadline",
    description: "Operating Systems final project submission",
    location: "Online",
  },
  {
    id: "e4",
    title: "CS 350 Final Exam",
    date: "June 15, 2024",
    time: "10:00 AM",
    type: "class",
    description: "Computer Networks final exam",
    location: "Science Hall, Room 101",
  },
];

// Announcements Data
export const announcementsData = [
  {
    id: "a1",
    title: "Summer Research Opportunities",
    date: "May 15, 2024",
    content: "The Computer Science department is accepting applications for summer research positions. Apply by May 30th.",
    author: "Dr. Alex Johnson",
  },
  {
    id: "a2",
    title: "Course Registration Reminder",
    date: "May 18, 2024",
    content: "Don't forget to register for Fall 2024 courses. Registration closes on June 1st.",
    author: "Academic Advising Office",
  },
  {
    id: "a3",
    title: "New Minor Programs Available",
    date: "May 20, 2024",
    content: "The university is now offering new minors in Data Science and Cybersecurity. Schedule an appointment with your advisor to learn more.",
    author: "Office of the Registrar",
  },
];

// Degree Requirements Data
export const degreeRequirementsData = {
  major: "Computer Science",
  totalCredits: 120,
  categories: [
    {
      name: "Core Computer Science",
      requiredCredits: 45,
      completedCredits: 32,
      courses: [
        { code: "CS 101", title: "Introduction to Computer Science", credits: 4, status: "completed" },
        { code: "CS 201", title: "Data Structures and Algorithms", credits: 4, status: "completed" },
        { code: "CS 301", title: "Software Engineering", credits: 4, status: "completed" },
        { code: "CS 305", title: "Database Systems", credits: 3, status: "completed" },
        { code: "CS 340", title: "Operating Systems", credits: 4, status: "in-progress" },
        { code: "CS 350", title: "Computer Networks", credits: 3, status: "in-progress" },
        { code: "CS 401", title: "Artificial Intelligence", credits: 4, status: "planned" },
        { code: "CS 450", title: "Machine Learning", credits: 3, status: "planned" },
        { code: "CS 460", title: "Computer Security", credits: 4, status: "not-started" },
        { code: "CS 495", title: "Senior Project", credits: 4, status: "not-started" },
        { code: "CS 499", title: "Advanced Topics in CS", credits: 3, status: "not-started" },
      ],
    },
    {
      name: "Mathematics",
      requiredCredits: 15,
      completedCredits: 9,
      courses: [
        { code: "MATH 220", title: "Calculus I", credits: 4, status: "completed" },
        { code: "MATH 230", title: "Calculus II", credits: 4, status: "completed" },
        { code: "MATH 245", title: "Discrete Mathematics", credits: 3, status: "completed" },
        { code: "MATH 320", title: "Linear Algebra", credits: 4, status: "not-started" },
      ],
    },
    {
      name: "General Education",
      requiredCredits: 30,
      completedCredits: 24,
      courses: [
        { code: "ENGL 101", title: "College Writing", credits: 3, status: "completed" },
        { code: "ENGL 201", title: "Advanced Writing", credits: 3, status: "completed" },
        { code: "HIST 101", title: "World History", credits: 3, status: "completed" },
        { code: "PHIL 101", title: "Introduction to Philosophy", credits: 3, status: "completed" },
        { code: "PSYC 101", title: "Introduction to Psychology", credits: 3, status: "completed" },
        { code: "COMM 101", title: "Public Speaking", credits: 3, status: "completed" },
        { code: "ECON 101", title: "Principles of Economics", credits: 3, status: "completed" },
        { code: "ARTS 101", title: "Introduction to Visual Arts", credits: 3, status: "completed" },
        { code: "BIOL 101", title: "Introduction to Biology", credits: 3, status: "not-started" },
        { code: "PHYS 101", title: "Introduction to Physics", credits: 3, status: "not-started" },
      ],
    },
    {
      name: "Electives",
      requiredCredits: 30,
      completedCredits: 10,
      courses: [
        { code: "CS 210", title: "Web Development", credits: 3, status: "completed" },
        { code: "CS 215", title: "Mobile App Development", credits: 3, status: "completed" },
        { code: "BUS 101", title: "Introduction to Business", credits: 4, status: "completed" },
        // More electives would be listed here
      ],
    },
  ],
};

// User types
export type UserRole = "student" | "advisor" | "admin";

// Get current courses
export const getCurrentCourses = () => {
  return coursesData.filter(course => course.status === "in-progress");
};

// Get upcoming courses
export const getUpcomingCourses = () => {
  return coursesData.filter(course => course.status === "upcoming");
};

// Get completed courses
export const getCompletedCourses = () => {
  return coursesData.filter(course => course.status === "completed");
};

// Get upcoming events
export const getUpcomingEvents = () => {
  return eventsData;
};

// Get recent announcements
export const getRecentAnnouncements = () => {
  return announcementsData;
};

// Calculate academic progress
export const calculateAcademicProgress = () => {
  const { completedCredits, requiredCredits } = studentData;
  return Math.round((completedCredits / requiredCredits) * 100);
};
