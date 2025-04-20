
// Student mock data
export const studentData = {
  id: "1",
  name: "Arjun Patel",
  email: "arjun.patel@university.edu",
  major: "Computer Science",
  enrollmentYear: 2022,
  expectedGraduation: 2026,
  gpa: 3.75,
  completedCredits: 60,
  requiredCredits: 120,
  advisor: "Dr. Priya Sharma"
};

// Advisor mock data
export const advisorData = {
  id: "a1",
  name: "Dr. Priya Sharma",
  email: "priya.sharma@university.edu",
  department: "Computer Science",
  office: "Science Building, Room 305",
  officeHours: "Mon, Wed 2-4pm, Fri 10am-12pm",
  phone: "+91 98765 43210",
  students: ["s12345", "s23456", "s34567", "s45678", "s56789"]
};

// Course data
export const getCurrentCourses = () => [
  {
    id: "CS301",
    code: "CS301",
    title: "Data Structures and Algorithms",
    instructor: "Rajesh Kumar",
    credits: 3,
    progress: 65,
    status: "in-progress" as const
  },
  {
    id: "CS302",
    code: "CS302",
    title: "Database Management Systems",
    instructor: "Meera Gupta",
    credits: 3,
    progress: 45,
    status: "in-progress" as const
  },
  {
    id: "MTH201",
    code: "MTH201",
    title: "Discrete Mathematics",
    instructor: "Sanjay Verma",
    credits: 4,
    progress: 80,
    status: "in-progress" as const
  }
];

export const getUpcomingCourses = () => [
  {
    id: "CS401",
    code: "CS401",
    title: "Advanced Software Engineering",
    instructor: "Amit Shah",
    credits: 3,
    status: "upcoming" as const
  },
  {
    id: "CS402",
    code: "CS402",
    title: "Artificial Intelligence",
    instructor: "Neha Reddy",
    credits: 4,
    status: "upcoming" as const
  }
];

// Completed courses data
export const getCompletedCourses = () => [
  {
    id: "CS101",
    code: "CS101",
    title: "Introduction to Programming",
    instructor: "Vikram Singh",
    credits: 3,
    status: "completed" as const
  },
  {
    id: "CS201",
    code: "CS201",
    title: "Object-Oriented Programming",
    instructor: "Anita Desai",
    credits: 3,
    status: "completed" as const
  }
];

// Course catalog data
export const coursesData = [
  {
    id: "cs101",
    code: "CS101",
    title: "Introduction to Programming",
    credits: 3,
    prerequisites: [],
    description: "Basic programming concepts using Python."
  },
  {
    id: "cs201",
    code: "CS201",
    title: "Object-Oriented Programming",
    credits: 3,
    prerequisites: ["cs101"],
    description: "Object-oriented programming concepts using Java."
  },
  {
    id: "cs301",
    code: "CS301",
    title: "Data Structures and Algorithms",
    credits: 3,
    prerequisites: ["cs201"],
    description: "Advanced data structures and algorithms."
  },
  {
    id: "cs302",
    code: "CS302",
    title: "Database Management Systems",
    credits: 3,
    prerequisites: ["cs201"],
    description: "Database design and SQL."
  },
  {
    id: "cs401",
    code: "CS401",
    title: "Advanced Software Engineering",
    credits: 3,
    prerequisites: ["cs301"],
    description: "Software development life cycle and project management."
  },
  {
    id: "cs402",
    code: "CS402",
    title: "Artificial Intelligence",
    credits: 4,
    prerequisites: ["cs301"],
    description: "Introduction to AI concepts and algorithms."
  },
  {
    id: "mth201",
    code: "MTH201",
    title: "Discrete Mathematics",
    credits: 4,
    prerequisites: [],
    description: "Mathematical structures for computer science."
  }
];

// Announcements data
export const getRecentAnnouncements = () => [
  {
    id: 1,
    title: "Course Registration Deadline",
    content: "Fall 2024 course registration opens next week. Schedule your advising appointment.",
    date: "1 day ago",
    author: "Dr. Priya Sharma"
  },
  {
    id: 2,
    title: "Academic Excellence Award",
    content: "Congratulations to Arjun Patel for making it to the Dean's List!",
    date: "3 days ago",
    author: "Dr. Ravi Desai"
  }
];

// Events data with proper typing
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "class" | "advising" | "deadline";
  description: string;
  location?: string;
}

export const getUpcomingEvents = (): Event[] => [
  {
    id: "1",
    title: "Advising Session",
    date: "2024-04-25",
    time: "14:00",
    type: "advising",
    description: "Meeting with Dr. Priya Sharma",
    location: "Science Building, Room 305"
  },
  {
    id: "2",
    title: "Course Registration",
    date: "2024-04-28",
    time: "09:00",
    type: "deadline",
    description: "Fall 2024 Registration Deadline"
  }
];

// Degree requirements data
export const degreeRequirementsData = {
  major: "Computer Science",
  totalCredits: 120,
  categories: [
    {
      name: "Core Requirements",
      requiredCredits: 45,
      completedCredits: 30,
      courses: [
        {
          code: "CS101",
          title: "Introduction to Programming",
          credits: 3,
          status: "completed"
        },
        {
          code: "CS201",
          title: "Object-Oriented Programming",
          credits: 3,
          status: "completed"
        },
        {
          code: "CS301",
          title: "Data Structures",
          credits: 3,
          status: "in-progress"
        }
      ]
    },
    {
      name: "Mathematics",
      requiredCredits: 12,
      completedCredits: 12,
      courses: [
        {
          code: "MTH101",
          title: "Calculus I",
          credits: 4,
          status: "completed"
        },
        {
          code: "MTH102",
          title: "Calculus II",
          credits: 4,
          status: "completed"
        },
        {
          code: "STA201",
          title: "Statistics",
          credits: 4,
          status: "completed"
        }
      ]
    },
    {
      name: "Electives",
      requiredCredits: 63,
      completedCredits: 18,
      courses: [
        {
          code: "ENG201",
          title: "Technical Writing",
          credits: 3,
          status: "completed"
        },
        {
          code: "PHY101",
          title: "Physics I",
          credits: 4,
          status: "completed"
        },
         {
          code: "HIS101",
          title: "World History",
          credits: 3,
          status: "not-started"
        },
        {
          code: "ART101",
          title: "Art Appreciation",
          credits: 3,
          status: "not-started"
        },
        {
          code: "MUS101",
          title: "Music Theory",
          credits: 3,
          status: "not-started"
        },
        {
          code: "ECO101",
          title: "Economics",
          credits: 3,
          status: "not-started"
        },
        {
          code: "POL101",
          title: "Political Science",
          credits: 3,
          status: "not-started"
        },
      ]
    }
  ]
};

// Academic progress calculation
export const calculateAcademicProgress = () => {
  const totalCredits = degreeRequirementsData.totalCredits;
  const completedCredits = studentData.completedCredits;
  return Math.round((completedCredits / totalCredits) * 100);
};
