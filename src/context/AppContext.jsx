import React, { createContext, useContext, useState } from "react";
import avatarImg from "../assets/images/student_avatar_1789503254707.jpg";
import {
  INITIAL_TEACHER_STUDENTS,
  INITIAL_TEACHER_ASSIGNMENTS,
  INITIAL_TEACHER_QUIZZES,
} from "../data/teacherData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [portalMode, setPortalMode] = useState("student"); // 'student' | 'trainer'
  const [userRole, setUserRole] = useState("student"); // 'student' | 'trainer'

  // Navigation State
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Student Profile Data
  const [student, setStudent] = useState({
    name: "M.Wahaj",
    fullName: "Muhammad Wahaj",
    rollNumber: "772401",
    batch: "20",
    campus: "Zaitoon Ashraf IT Park",
    city: "Karachi",
    courseName: "Modern Web Application Development",
    email: "wahajwahaj200@gmail.com",
    avatar: avatarImg,
  });

  // Course Details
  const courseDetails = {
    title: "Modern Web Application Development",
    status: "ENROLLED",
    schedule: [
      "Mon 01:00 PM - 03:00 PM",
      "Wed 01:00 PM - 03:00 PM",
      "Fri 01:00 PM - 03:00 PM",
    ],
    progressPercentage: 73,
    batch: "20",
    roll: "772401",
    campus: "Zaitoon Ashraf IT Park",
    city: "Karachi",
  };

  // Class Schedule Days for the current week
  const [scheduleDays, setScheduleDays] = useState([
    { day: "Sun", date: 13, hasClass: false },
    { day: "Mon", date: 14, hasClass: true, timing: "01:00 PM - 03:00 PM" },
    { day: "Tue", date: 15, hasClass: false },
    { day: "Wed", date: 16, hasClass: true, timing: "01:00 PM - 03:00 PM" },
    { day: "Thu", date: 17, hasClass: false },
    { day: "Fri", date: 18, hasClass: true, timing: "01:00 PM - 03:00 PM" },
    { day: "Sat", date: 19, hasClass: false },
  ]);
  const [selectedScheduleDay, setSelectedScheduleDay] = useState(14); // Mon 14

  // Dashboard Sub-tabs
  const [dashboardSubTab, setDashboardSubTab] = useState("quizzes"); // 'assignments' | 'quizzes' | 'events'

  // Attendance Data
  const attendanceSummary = {
    totalClasses: 111,
    present: 81,
    leave: 7,
    absent: 23,
    percentage: 73,
  };

  // Fee Records Data
  const [feeRecords, setFeeRecords] = useState([
    {
      id: 1,
      month: "Sep 2026",
      amount: "Rs: 1000 /-",
      amountNum: 1000,
      type: "Monthly",
      dueDate: "08-Sep-2026",
      voucherId: "202609772401",
      status: "PAID",
      paidDate: "06-Sep-2026",
      bankName: "Meezan Bank Online",
    },
    {
      id: 2,
      month: "Aug 2026",
      amount: "Rs: 1000 /-",
      amountNum: 1000,
      type: "Monthly",
      dueDate: "08-Aug-2026",
      voucherId: "202608772401",
      status: "PAID",
      paidDate: "05-Aug-2026",
      bankName: "HBL Konnect",
    },
    {
      id: 3,
      month: "Jul 2026",
      amount: "Rs: 1000 /-",
      amountNum: 1000,
      type: "Monthly",
      dueDate: "08-Jul-2026",
      voucherId: "202607772401",
      status: "PAID",
      paidDate: "07-Jul-2026",
      bankName: "EasyPaisa",
    },
  ]);

  const [selectedAttendanceMonth, setSelectedAttendanceMonth] =
    useState("Sep 2026");

  const attendanceRecords = {
    "Sep 2026": [
      { classNumber: 1, date: "Tue, Sep 1, 2026", status: "PRESENT" },
      { classNumber: 2, date: "Thu, Sep 3, 2026", status: "PRESENT" },
      { classNumber: 3, date: "Sun, Sep 6, 2026", status: "PRESENT" },
      { classNumber: 4, date: "Tue, Sep 8, 2026", status: "PRESENT" },
      { classNumber: 5, date: "Thu, Sep 10, 2026", status: "PRESENT" },
      { classNumber: 6, date: "Sun, Sep 13, 2026", status: "PRESENT" },
      { classNumber: 7, date: "Tue, Sep 15, 2026", status: "PRESENT" },
      { classNumber: 8, date: "Thu, Sep 17, 2026", status: "LEAVE" },
      { classNumber: 9, date: "Sun, Sep 20, 2026", status: "PRESENT" },
      { classNumber: 10, date: "Tue, Sep 22, 2026", status: "ABSENT" },
    ],
    "Aug 2026": [
      { classNumber: 11, date: "Thu, Aug 27, 2026", status: "PRESENT" },
      { classNumber: 12, date: "Tue, Aug 25, 2026", status: "PRESENT" },
      { classNumber: 13, date: "Sun, Aug 23, 2026", status: "ABSENT" },
      { classNumber: 14, date: "Thu, Aug 20, 2026", status: "PRESENT" },
      { classNumber: 15, date: "Tue, Aug 18, 2026", status: "PRESENT" },
      { classNumber: 16, date: "Sun, Aug 16, 2026", status: "LEAVE" },
      { classNumber: 17, date: "Thu, Aug 13, 2026", status: "PRESENT" },
      { classNumber: 18, date: "Tue, Aug 11, 2026", status: "PRESENT" },
    ],
    "Jul 2026": [
      { classNumber: 19, date: "Thu, Jul 30, 2026", status: "PRESENT" },
      { classNumber: 20, date: "Tue, Jul 28, 2026", status: "PRESENT" },
      { classNumber: 21, date: "Sun, Jul 26, 2026", status: "PRESENT" },
      { classNumber: 22, date: "Thu, Jul 23, 2026", status: "PRESENT" },
      { classNumber: 23, date: "Tue, Jul 21, 2026", status: "ABSENT" },
    ],
  };

  // Progress Tracking Data as dynamic state
  const [progressModules, setProgressModules] = useState([
    {
      id: "mod-1",
      title: "Web Designing",
      topicsCompleted: 20,
      totalTopics: 20,
      percentage: 100,
      status: "Completed",
      topics: [
        {
          name: "HTML Text",
          completed: true,
          date: "Dec 15, 2025",
          coveredIn: [
            "Furniture E-Commerce Website",
            "Amazon Clone",
            "NASA Landing Page",
            "Landing Page Assignment",
          ],
        },
        {
          name: "HTML Images",
          completed: true,
          date: "May 6, 2026",
          coveredIn: [
            "Furniture E-Commerce Website",
            "Amazon Clone",
            "NASA Landing Page",
            "Landing Page Assignment",
          ],
        },
        {
          name: "HTML Table",
          completed: true,
          date: "May 6, 2026",
          coveredIn: ["Budgetting App"],
        },
        {
          name: "HTML Forms",
          completed: true,
          date: "May 6, 2026",
          coveredIn: ["Budgetting App", "Landing Page Assignment"],
        },
        {
          name: "HTML Audio/Video Tags",
          completed: true,
          date: "May 6, 2026",
          coveredIn: ["NASA Landing Page"],
        },
        {
          name: "HTML Links",
          completed: true,
          date: "May 6, 2026",
          coveredIn: ["Amazon Clone"],
        },
        {
          name: "Grid system",
          completed: true,
          date: "Feb 12, 2026",
          coveredIn: [
            "Amazon Clone",
            "Landing Page Assignment",
            "Grid Assignment no 2",
            "Grid Assignment no 1",
          ],
        },
        {
          name: "Font Awesome",
          completed: true,
          date: "Feb 13, 2026",
          coveredIn: [
            "Budgetting App",
            "Amazon Clone",
            "Landing Page Assignment",
          ],
        },
        {
          name: "Bootstrap",
          completed: true,
          date: "Feb 16, 2026",
          coveredIn: ["Amazon Clone"],
        },
        {
          name: "Css3",
          completed: true,
          date: "Dec 15, 2025",
          coveredIn: [
            "Furniture E-Commerce Website",
            "Amazon Clone",
            "NASA Landing Page",
            "Landing Page Assignment",
          ],
        },
        {
          name: "Google Fonts",
          completed: true,
          date: "Feb 12, 2026",
          coveredIn: [
            "Amazon Clone",
            "NASA Landing Page",
            "Landing Page Assignment",
          ],
        },
        {
          name: "CSS Variables",
          completed: true,
          date: "Feb 12, 2026",
          coveredIn: [],
        },
        {
          name: "Netlify Hosting",
          completed: true,
          date: "Feb 10, 2026",
          coveredIn: [],
        },
        {
          name: "Github",
          completed: true,
          date: "Feb 10, 2026",
          coveredIn: [
            "Furniture E-Commerce Website",
            "Budgetting App",
            "Amazon Clone",
            "NASA Landing Page",
            "Landing Page Assignment",
          ],
        },
        {
          name: "Github Hosting",
          completed: true,
          date: "Feb 10, 2026",
          coveredIn: [
            "Budgetting App",
            "Amazon Clone",
            "NASA Landing Page",
            "Landing Page Assignment",
          ],
        },
        {
          name: "CSS Animations",
          completed: true,
          date: "Feb 13, 2026",
          coveredIn: ["Amazon Clone"],
        },
        {
          name: "Media queries",
          completed: true,
          date: "Feb 12, 2026",
          coveredIn: [
            "Amazon Clone",
            "NASA Landing Page",
            "Landing Page Assignment",
          ],
        },
        {
          name: "Surge hosting",
          completed: true,
          date: "Feb 10, 2026",
          coveredIn: ["Amazon Clone"],
        },
        {
          name: "Domain & Hosing Subscription (deployment)",
          completed: true,
          date: "Feb 13, 2026",
          coveredIn: [],
        },
        {
          name: "Flex box",
          completed: true,
          date: "Feb 5, 2026",
          coveredIn: [
            "Budgetting App",
            "Amazon Clone",
            "NASA Landing Page",
            "Landing Page Assignment",
          ],
        },
      ],
    },
    {
      id: "mod-2",
      title: "Front-End Development",
      topicsCompleted: 26,
      totalTopics: 31,
      percentage: 84,
      status: "In Progress",
      topics: [
        {
          name: "JavaScript Introduction",
          completed: true,
          date: "May 2, 2026",
          coveredIn: ["JavaScript Assignment – 25 Questions"],
        },
        {
          name: "JavaScript Chapter 1 – 10",
          completed: true,
          date: "Mar 3, 2026",
          coveredIn: ["JavaScript Assignment – 25 Questions", "Budgetting App"],
        },
        {
          name: "JavaScript Chapter 11 – 20",
          completed: true,
          date: "Apr 6, 2026",
          coveredIn: ["JavaScript Assignment – 25 Questions", "Budgetting App"],
        },
        {
          name: "JavaScript Quiz 1",
          completed: true,
          date: "Apr 16, 2026",
          coveredIn: [],
        },
        {
          name: "JavaScript Chapter 21 – 30",
          completed: true,
          date: "May 5, 2026",
          coveredIn: ["JavaScript Assignment – 25 Questions", "Budgetting App"],
        },
        {
          name: "JavaScript Chapter 31 – 40",
          completed: true,
          date: "May 5, 2026",
          coveredIn: ["JavaScript Assignment – 25 Questions", "Budgetting App"],
        },
        {
          name: "JavaScript Quiz 2",
          completed: true,
          date: "May 18, 2026",
          coveredIn: [],
        },
        {
          name: "JavaScript Chapter 41 – 50",
          completed: true,
          date: "May 11, 2026",
          coveredIn: [
            "JavaScript Assignment – 25 Questions",
            "Budgetting App",
            "Amazon Clone",
          ],
        },
        {
          name: "JavaScript Chapter 51 – 60",
          completed: true,
          date: "May 20, 2026",
          coveredIn: ["JavaScript Assignment – 25 Questions", "Budgetting App"],
        },
        {
          name: "JavaScript Quiz 3",
          completed: true,
          date: "Jun 3, 2026",
          coveredIn: [],
        },
        {
          name: "JavaScript Book Completed",
          completed: true,
          date: "Jun 11, 2026",
          coveredIn: [
            "Furniture E-Commerce Website",
            "JavaScript Assignment – 25 Questions",
          ],
        },
        {
          name: "JavaScript Quiz 4",
          completed: true,
          date: "Jun 27, 2026",
          coveredIn: [],
        },
        {
          name: "Var vs Let vs Const",
          completed: true,
          date: "Jun 12, 2026",
          coveredIn: [],
        },
        {
          name: "Template Literals",
          completed: true,
          date: "Jun 20, 2026",
          coveredIn: [],
        },
        {
          name: "Arrow Functions",
          completed: true,
          date: "Jun 15, 2026",
          coveredIn: [],
        },
        {
          name: "Iterators & For..of",
          completed: true,
          date: "Jul 9, 2026",
          coveredIn: [],
        },
        {
          name: "Array Advance Methods",
          completed: true,
          date: "Jul 9, 2026",
          coveredIn: [],
        },
        {
          name: "JavaScript Behind the Scenes",
          completed: true,
          date: "Aug 15, 2026",
          coveredIn: [],
        },
        {
          name: "Destructuring, Rest & Spread Operators",
          completed: true,
          date: "Jun 10, 2026",
          coveredIn: [],
        },
        {
          name: "SET, MAP",
          completed: true,
          date: "Jul 12, 2026",
          coveredIn: [],
        },
        {
          name: "Default Parameters",
          completed: true,
          date: "Jun 17, 2026",
          coveredIn: [],
        },
        {
          name: "First-Class and Higher-Order Functions",
          completed: true,
          date: "Sep 5, 2026",
          coveredIn: [],
        },
        {
          name: "CallBack Functions",
          completed: true,
          date: "Jul 4, 2026",
          coveredIn: [],
        },
        {
          name: "Call, Apply, Bind",
          completed: false,
          date: null,
          coveredIn: [],
        },
        {
          name: "Closures",
          completed: true,
          date: "Jul 12, 2026",
          coveredIn: [],
        },
        {
          name: "OOP with JavaScript",
          completed: true,
          date: "Jul 6, 2026",
          coveredIn: [],
        },
        {
          name: "Asynchronous JavaScript",
          completed: false,
          date: null,
          coveredIn: [],
        },
        {
          name: "TypeScript",
          completed: true,
          date: "Jul 28, 2026",
          coveredIn: [],
        },
        { name: "Advance Github", completed: false, date: null, coveredIn: [] },
        {
          name: "GSAP Animations",
          completed: false,
          date: null,
          coveredIn: [],
        },
        {
          name: "Supabase or Firebase",
          completed: false,
          date: null,
          coveredIn: [],
        },
      ],
    },
    {
      id: "mod-3",
      title: "Modern Front-End Development",
      topicsCompleted: 10,
      totalTopics: 14,
      percentage: 71,
      status: "In Progress",
      topics: [
        {
          name: "React.js Introduction & How to Create React Project",
          completed: true,
          date: "Aug 6, 2026",
          coveredIn: [
            "Admin panel (E commerce Dashboard)",
            "E-Commerce Website (React js)",
          ],
        },
        {
          name: "Components, Props and JSX",
          completed: true,
          date: "Aug 8, 2026",
          coveredIn: [
            "Admin panel (E commerce Dashboard)",
            "E-Commerce Website (React js)",
          ],
        },
        {
          name: "State, Events, Forms",
          completed: true,
          date: "Aug 23, 2026",
          coveredIn: ["Admin panel (E commerce Dashboard)"],
        },
        {
          name: "React in Depth and Behind the Scenes (Components, Composition, Re-useability)",
          completed: true,
          date: "Aug 17, 2026",
          coveredIn: [],
        },
        {
          name: "Effects and Data Fetching in React",
          completed: true,
          date: "Aug 11, 2026",
          coveredIn: ["E-Commerce Website (React js)"],
        },
        {
          name: "Custom Hooks, Ref, useReducer etc",
          completed: false,
          date: null,
          coveredIn: [],
        },
        {
          name: "Class-based React (Optional - not necessary)",
          completed: true,
          date: "Sep 5, 2026",
          coveredIn: [],
        },
        {
          name: "Single Page Application (SPA) - React Router DOM",
          completed: true,
          date: "Aug 11, 2026",
          coveredIn: ["Admin panel (E commerce Dashboard)"],
        },
        {
          name: "State Management – Context Api",
          completed: true,
          date: "Sep 5, 2026",
          coveredIn: ["Admin panel (E commerce Dashboard)"],
        },
        {
          name: "Performance Optimization",
          completed: false,
          date: null,
          coveredIn: [],
        },
        {
          name: "Redux & Redux ToolKit with Thunk",
          completed: true,
          date: "1 week ago",
          coveredIn: [],
        },
        {
          name: "Tailwind, Material UI, Styled Components Overview",
          completed: true,
          date: null,
          coveredIn: ["Admin panel (E commerce Dashboard)"],
        },
        {
          name: "Frontend Deployment through Vercel",
          completed: true,
          date: "Aug 23, 2026",
          coveredIn: ["E-Commerce Website (React js)"],
        },
        {
          name: "Next.JS",
          completed: false,
          date: null,
          coveredIn: ["Admin panel (E commerce Dashboard)"],
        },
      ],
    },
    {
      id: "mod-4",
      title: "Back-End Development",
      topicsCompleted: 0,
      totalTopics: 16,
      percentage: 0,
      status: "Upcoming",
      topics: [
        { name: "NodeJS", completed: false, date: null, coveredIn: [] },
        { name: "ExpressJS", completed: false, date: null, coveredIn: [] },
        { name: "MongoDB", completed: false, date: null, coveredIn: [] },
        {
          name: "Security and Authentication",
          completed: false,
          date: null,
          coveredIn: [],
        },
        {
          name: "Multer - Media Uploading",
          completed: false,
          date: null,
          coveredIn: [],
        },
        { name: "Sockets", completed: false, date: null, coveredIn: [] },
        { name: "GraphQL", completed: false, date: null, coveredIn: [] },
        { name: "PostgreSQL", completed: false, date: null, coveredIn: [] },
        { name: "Sequelize", completed: false, date: null, coveredIn: [] },
        {
          name: "API Integration & Webhooks",
          completed: false,
          date: null,
          coveredIn: [],
        },
        {
          name: "Scalable System - Caching",
          completed: false,
          date: null,
          coveredIn: [],
        },
        {
          name: "Scalable System - Messaging Queues",
          completed: false,
          date: null,
          coveredIn: [],
        },
        { name: "CI / CD", completed: false, date: null, coveredIn: [] },
        {
          name: "Node Production and Cloud Deployment",
          completed: false,
          date: null,
          coveredIn: [],
        },
        {
          name: "NodeJS Optimization",
          completed: false,
          date: null,
          coveredIn: [],
        },
        {
          name: "Dockers - Containerization",
          completed: false,
          date: null,
          coveredIn: [],
        },
      ],
    },
  ]);

  // Derived progress statistics
  const progressSummary = {
    totalTopics: progressModules.reduce((acc, m) => acc + m.totalTopics, 0),
    completedTopics: progressModules.reduce(
      (acc, m) => acc + m.topicsCompleted,
      0,
    ),
    pendingTopics: progressModules.reduce(
      (acc, m) => acc + (m.totalTopics - m.topicsCompleted),
      0,
    ),
  };

  // Assignments Data
  const [assignments, setAssignments] = useState([
    {
      id: "asg-1",
      title: "Admin panel (E commerce Dashboad)",
      topicsCount: 7,
      isHackathon: false,
      dueDate: "September 10, 2026",
      dueDateFull: "Sep 10, 2026, 11:59 AM",
      status: "APPROVED",
      referenceLinks: ["https://berrydashboard.com/dashboard/default"],
      description:
        "Create the provided UI design in React or nextjs.\nMake it fully responsive.\nKeep the design, spacing, colors, and components as close to the reference as possible.\nUse clean and reusable React components.\nPush the complete project to GitHub.\nDeploy the project and submit the live website link along with the GitHub repository link.",
      submittedOn: "Sep 7, 2026, 3:16 AM",
      submissionLink: "https://admin-panel-e-commerce-dashboard.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/Admin-panel-E-commerce-Dashboad-",
      submissionsClosed: false,
    },
    {
      id: "asg-2",
      title: "QUICKSERVE WMA (Batch-20)",
      topicsCount: 0,
      isHackathon: true,
      dueDate: "August 29, 2026",
      dueDateFull: "Aug 29, 2026, 11:59 PM",
      status: "NOT SUBMITTED",
      referenceLinks: ["https://smit-hackathon-2026.vercel.app"],
      description:
        "Hackathon round for Batch-20 modern web application students. Build a food delivery / instant service web application featuring vendor listing, cart, and simulated checkout flow in 48 hours.",
      submittedOn: null,
      submissionLink: null,
      submissionNotes: null,
      submissionsClosed: true,
    },
    {
      id: "asg-3",
      title: "E-Commerce Website (React js)",
      topicsCount: 4,
      isHackathon: false,
      dueDate: "August 17, 2026",
      dueDateFull: "Aug 17, 2026, 11:59 PM",
      status: "APPROVED",
      referenceLinks: ["https://fakestoreapi.com/docs"],
      description:
        "Build an end-to-end modern e-commerce storefront with product filtering, category navigation, shopping cart, and mock payment checkout using React Router and React hooks.",
      submittedOn: "Aug 15, 2026, 09:20 PM",
      submissionLink: "https://ecommerce-react-smit.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/e-commerce-react-js",
      submissionsClosed: false,
    },
    {
      id: "asg-4",
      title: "Furniture E-Commerce Website",
      topicsCount: 5,
      isHackathon: false,
      dueDate: "August 10, 2026",
      dueDateFull: "Aug 10, 2026, 11:59 PM",
      status: "SUBMITTED",
      referenceLinks: ["https://dribbble.com/shots/furniture-store"],
      description:
        "Design and develop a clean luxury furniture catalog with dynamic interactive gallery, detailed product specifications, and inquiry cart.",
      submittedOn: "Aug 9, 2026, 04:12 PM",
      submissionLink: "https://furniture-store-wahaj.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/furniture-ecommerce-app",
      submissionsClosed: false,
    },
    {
      id: "asg-5",
      title: "MaintainIQ (Batch-20)",
      topicsCount: 0,
      isHackathon: true,
      dueDate: "July 11, 2026",
      dueDateFull: "Jul 11, 2026, 11:59 PM",
      status: "SUBMITTED",
      referenceLinks: ["https://hackathon.smit.org/maintainiq"],
      description:
        "Team project for facility management and ticket tracking system with real-time issue updates and technician dispatch logs.",
      submittedOn: "Jul 11, 2026, 06:45 PM",
      submissionLink: "https://maintainiq-batch20.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/maintainiq-app",
      submissionsClosed: true,
    },
    {
      id: "asg-6",
      title: "JavaScript Assignment – 25 Questions",
      topicsCount: 8,
      isHackathon: false,
      dueDate: "July 10, 2026",
      dueDateFull: "Jul 10, 2026, 11:59 PM",
      status: "SUBMITTED",
      referenceLinks: [
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      ],
      description:
        "Solve 25 core programmatic JavaScript algorithms encompassing recursion, string manipulation, closure puzzles, and higher order arrays.",
      submittedOn: "Jul 9, 2026, 11:15 PM",
      submissionLink: "https://github.com/mwahajx87/js-25-problems-solved",
      submissionNotes:
        "Completed all 25 solutions with edge test cases included in README.",
      submissionsClosed: false,
    },
    {
      id: "asg-7",
      title: "Budgetting App",
      topicsCount: 12,
      isHackathon: false,
      dueDate: "June 1, 2026",
      dueDateFull: "Jun 1, 2026, 11:59 PM",
      status: "APPROVED",
      referenceLinks: ["https://github.com/topics/budget-app"],
      description:
        "Build an expense and income tracker with category filters, monthly balance calculations, and local persistence.",
      submittedOn: "May 30, 2026, 08:30 PM",
      submissionLink: "https://budget-tracker-wahaj.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/budget-tracker-js",
      submissionsClosed: false,
    },
    {
      id: "asg-8",
      title: "Amazon Clone",
      topicsCount: 15,
      isHackathon: false,
      dueDate: "May 24, 2026",
      dueDateFull: "May 24, 2026, 11:59 PM",
      status: "APPROVED",
      referenceLinks: ["https://amazon.com"],
      description:
        "Responsive desktop & mobile replica of Amazon landing page, product carousel, mega menu, and simulated cart interface.",
      submittedOn: "May 23, 2026, 02:45 AM",
      submissionLink: "https://amazon-clone-smit.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/amazon-clone-ui",
      submissionsClosed: false,
    },
    {
      id: "asg-9",
      title: "NASA Landing Page",
      topicsCount: 9,
      isHackathon: false,
      dueDate: "May 1, 2026",
      dueDateFull: "May 1, 2026, 11:59 PM",
      status: "APPROVED",
      referenceLinks: ["https://nasa.gov"],
      description:
        "A dark cosmic themed astronomy landing page built with semantic HTML5, CSS Grid, custom audio/video background elements, and smooth scroll effects.",
      submittedOn: "Apr 29, 2026, 06:10 PM",
      submissionLink: "https://nasa-portal-wahaj.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/nasa-cosmic-landing",
      submissionsClosed: false,
    },
    {
      id: "asg-10",
      title: "Helplytics AI – Community Support Platfo...",
      topicsCount: 0,
      isHackathon: true,
      dueDate: "April 18, 2026",
      dueDateFull: "Apr 18, 2026, 11:59 PM",
      status: "NOT SUBMITTED",
      referenceLinks: ["https://hackathon.smit.org/helplytics"],
      description:
        "Community Q&A and support analytics portal with automated knowledge base tagging.",
      submittedOn: null,
      submissionLink: null,
      submissionNotes: null,
      submissionsClosed: true,
    },
    {
      id: "asg-11",
      title: "Landing Page Assignment",
      topicsCount: 11,
      isHackathon: false,
      dueDate: "March 6, 2026",
      dueDateFull: "Mar 6, 2026, 11:59 PM",
      status: "APPROVED",
      referenceLinks: ["https://dribbble.com/tags/landing-page"],
      description:
        "Design and develop a high-converting agency landing page with modern CSS grid layouts, hero banners, and responsive sections.",
      submittedOn: "Mar 5, 2026, 09:30 PM",
      submissionLink: "https://landing-page-assignment-smit.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/landing-page-assignment",
      submissionsClosed: false,
    },
    {
      id: "asg-12",
      title: "Grid Assignment no 2",
      topicsCount: 1,
      isHackathon: false,
      dueDate: "February 16, 2026",
      dueDateFull: "Feb 16, 2026, 11:59 PM",
      status: "APPROVED",
      referenceLinks: [
        "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
      ],
      description:
        "CSS Grid complex layout assignment demonstrating grid-template-areas, auto-fill, and fractional column units.",
      submittedOn: "Feb 15, 2026, 07:15 PM",
      submissionLink: "https://css-grid-assignment-2.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/css-grid-assignment-2",
      submissionsClosed: false,
    },
    {
      id: "asg-13",
      title: "Grid Assignment no 1",
      topicsCount: 1,
      isHackathon: false,
      dueDate: "February 16, 2026",
      dueDateFull: "Feb 16, 2026, 11:59 PM",
      status: "APPROVED",
      referenceLinks: [
        "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
      ],
      description:
        "Fundamentals of CSS Grid system, column tracks, row gutters, and responsive layout without media queries.",
      submittedOn: "Feb 14, 2026, 08:45 PM",
      submissionLink: "https://css-grid-assignment-1.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/css-grid-assignment-1",
      submissionsClosed: false,
    },
    {
      id: "asg-14",
      title: "Çss Figma website",
      topicsCount: 0,
      isHackathon: false,
      dueDate: "January 23, 2026",
      dueDateFull: "Jan 23, 2026, 11:59 PM",
      status: "SUBMITTED",
      referenceLinks: ["https://figma.com"],
      description:
        "Pixel-perfect conversion of provided Figma design template into clean, modern CSS3 and semantic HTML.",
      submittedOn: "Jan 22, 2026, 11:10 PM",
      submissionLink: "https://css-figma-website.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/css-figma-website",
      submissionsClosed: false,
    },
    {
      id: "asg-15",
      title: "HTML - Registration Form",
      topicsCount: 0,
      isHackathon: false,
      dueDate: "December 29, 2025",
      dueDateFull: "Dec 29, 2025, 11:59 PM",
      status: "SUBMITTED",
      referenceLinks: ["https://developer.mozilla.org/en-US/docs/Learn/Forms"],
      description:
        "Comprehensive student admission registration form utilizing all HTML5 input types, fieldsets, radio buttons, and validation attributes.",
      submittedOn: "Dec 28, 2025, 05:20 PM",
      submissionLink: "https://html-registration-form-smit.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/html-registration-form",
      submissionsClosed: false,
    },
    {
      id: "asg-16",
      title: "HTML - Links with multiple pages",
      topicsCount: 0,
      isHackathon: false,
      dueDate: "December 17, 2025",
      dueDateFull: "Dec 17, 2025, 11:59 PM",
      status: "SUBMITTED",
      referenceLinks: [
        "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a",
      ],
      description:
        "Multi-page static HTML website with interconnected navigational links, relative paths, bookmarks, and external references.",
      submittedOn: "Dec 16, 2025, 04:30 PM",
      submissionLink: "https://html-multipage-links.vercel.app/",
      submissionNotes:
        "Github Repo:-\nhttps://github.com/mwahajx87/html-multipage-links",
      submissionsClosed: false,
    },
  ]);

  // Quizzes Data
  const [quizzes, setQuizzes] = useState([
    {
      id: "quiz-4",
      title: "Javascript (Quiz-4)",
      module: "Modern Front-End Development",
      questions: 40,
      attempts: "1 / 3",
      percentage: "70%",
      status: "PASSED",
      note: "—",
      action: "Completed",
    },
    {
      id: "quiz-3",
      title: "Javascript (Quiz-3)",
      module: "Modern Front-End Development",
      questions: 40,
      attempts: "1 / 3",
      percentage: "78%",
      status: "PASSED",
      note: "—",
      action: "Completed",
    },
    {
      id: "quiz-2",
      title: "Javascript (Quiz-2)",
      module: "Modern Front-End Development",
      questions: 40,
      attempts: "2 / 3",
      percentage: "83%",
      status: "PASSED",
      note: "—",
      action: "Completed",
    },
    {
      id: "quiz-1",
      title: "Javascript (Quiz-1)",
      module: "Modern Front-End Development",
      questions: 40,
      attempts: "1 / 3",
      percentage: "98%",
      status: "PASSED",
      note: "—",
      action: "Completed",
    },
    {
      id: "quiz-css",
      title: "CSS Quiz",
      module: "Front-End Development",
      questions: 40,
      attempts: "1 / 3",
      percentage: "80%",
      status: "PASSED",
      note: "—",
      action: "Completed",
    },
    {
      id: "quiz-html",
      title: "HTML Quiz",
      module: "Web Designing",
      questions: 40,
      attempts: "1 / 3",
      percentage: "88%",
      status: "PASSED",
      note: "—",
      action: "Completed",
    },
  ]);

  // Modals & Popups State
  const [selectedAssignment, setSelectedAssignment] = useState(null); // for View Modal
  const [editingAssignment, setEditingAssignment] = useState(null); // for Upload/Edit Modal
  const [selectedQuiz, setSelectedQuiz] = useState(null); // for Quiz Modal
  const [isProfileOpen, setIsProfileOpen] = useState(false); // for Student Profile Modal
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Helper functions
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleTopicCompletion = (moduleId, topicName) => {
    setProgressModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== moduleId) return mod;
        let toggledTo = false;
        const updatedTopics = mod.topics.map((t) => {
          if (t.name === topicName) {
            toggledTo = !t.completed;
            return {
              ...t,
              completed: toggledTo,
              date: toggledTo ? "Just now" : null,
            };
          }
          return t;
        });

        const completedCount = updatedTopics.filter((t) => t.completed).length;
        const percentage = Math.round(
          (completedCount / updatedTopics.length) * 100,
        );

        showToast(
          `Topic "${topicName}" marked as ${toggledTo ? "completed" : "pending"}.`,
        );

        return {
          ...mod,
          topics: updatedTopics,
          topicsCompleted: completedCount,
          percentage,
          status:
            percentage === 100
              ? "Completed"
              : percentage > 0
                ? "In Progress"
                : "Upcoming",
        };
      }),
    );
  };

  const handleQuizSubmit = (quizId, scorePercentage) => {
    setQuizzes((prev) =>
      prev.map((q) => {
        if (q.id === quizId) {
          const parts = q.attempts
            .split("/")
            .map((s) => parseInt(s.trim(), 10));
          const currentAttempts = isNaN(parts[0])
            ? 1
            : Math.min(parts[0] + 1, parts[1] || 3);
          const maxAttempts = parts[1] || 3;
          return {
            ...q,
            attempts: `${currentAttempts} / ${maxAttempts}`,
            percentage: `${scorePercentage}%`,
            status: scorePercentage >= 70 ? "PASSED" : "FAILED",
            action: "Completed",
          };
        }
        return q;
      }),
    );
    showToast(`Quiz completed! You scored ${scorePercentage}%.`);
  };

  const handleAssignmentSubmit = (id, submissionData) => {
    const formattedDate =
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      ", " +
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

    setAssignments((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = {
            ...item,
            status: "SUBMITTED",
            submittedOn: formattedDate,
            submissionLink: submissionData.link,
            submissionNotes: submissionData.notes,
          };
          if (selectedAssignment && selectedAssignment.id === id) {
            setSelectedAssignment(updated);
          }
          return updated;
        }
        return item;
      }),
    );
    showToast("Assignment submitted successfully!");
    setEditingAssignment(null);
  };

  const copyToClipboard = (text, label = "Copied") => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  // --- TEACHER PORTAL STATE ---
  const [teacherActiveTab, setTeacherActiveTab] = useState("assignments"); // 'students' | 'attendance' | 'assignments' | 'quizzes' | 'progress'
  const [teacherTrainer, setTrainer] = useState({
    name: "S Muzammil Javed",
    title: "Lead Trainer & Senior Full Stack Architect",
    campus: "Zaitoon Ashraf IT Park",
    batch: "Batch 20",
    schedule:
      "Mon 01:00 PM - 03:00 PM | Wed 01:00 PM - 03:00 PM | Fri 01:00 PM - 03:00 PM",
    courseName: "Modern Web Application Development",
    email: "muzammil.javed@saylani.org",
    totalStudents: 57,
    totalTopics: 81,
    topicsCompleted: 56,
    overallProgress: 69,
  });

  const [teacherStudents, setTeacherStudents] = useState(
    INITIAL_TEACHER_STUDENTS,
  );
  const [teacherAssignments, setTeacherAssignments] = useState(
    INITIAL_TEACHER_ASSIGNMENTS,
  );
  const [teacherQuizzes, setTeacherQuizzes] = useState(INITIAL_TEACHER_QUIZZES);
  const [teacherAttendanceDate, setTeacherAttendanceDate] =
    useState("Tue Sep 15 2026");

  // Maps rollNumber -> 'NOT MARKED' | 'PRESENT' | 'ABSENT' | 'LEAVE'
  const [teacherAttendanceStatus, setTeacherAttendanceStatus] = useState({});

  // Teacher Modals
  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);
  const [selectedTeacherAssignment, setSelectedTeacherAssignment] =
    useState(null);
  const [editingTeacherAssignment, setEditingTeacherAssignment] =
    useState(null);
  const [selectedStudentForInspect, setSelectedStudentForInspect] =
    useState(null);
  const [selectedTeacherQuiz, setSelectedTeacherQuiz] = useState(null);
  const [isQuizQuestionsModalOpen, setIsQuizQuestionsModalOpen] =
    useState(false);
  const [isNewQuizOpen, setIsNewQuizOpen] = useState(false);

  // Attendance Actions
  const markStudentAttendance = (rollNumber, status) => {
    setTeacherAttendanceStatus((prev) => ({
      ...prev,
      [rollNumber]: status,
    }));
  };

  const bulkMarkAttendance = (status) => {
    const updated = {};
    teacherStudents.forEach((st) => {
      updated[st.rollNumber] = status;
    });
    setTeacherAttendanceStatus(updated);
    showToast(`All students marked as ${status}`);
  };

  // Assignment Actions
  const createTeacherAssignment = (newAssignment) => {
    const created = {
      id: `t-asg-${Date.now()}`,
      title: newAssignment.title,
      description: newAssignment.description,
      topics: newAssignment.topics || ["No topics"],
      dueDate: newAssignment.dueDate || "Sep 30, 2026",
      isHackathon: !!newAssignment.isHackathon,
      hackathonTag: newAssignment.isHackathon ? "HACKATHON" : undefined,
      submissionsCount: 0,
      totalStudents: 57,
      status: "ACTIVE",
    };
    setTeacherAssignments((prev) => [created, ...prev]);
    showToast("New assignment published to class successfully!");
    setIsNewAssignmentOpen(false);
  };

  const updateTeacherAssignment = (id, updatedFields) => {
    setTeacherAssignments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item,
      ),
    );
    showToast("Assignment updated successfully!");
    setEditingTeacherAssignment(null);
  };

  const deleteTeacherAssignment = (id) => {
    setTeacherAssignments((prev) => prev.filter((item) => item.id !== id));
    showToast("Assignment removed");
  };

  // Quiz Actions
  const toggleQuizStatus = (quizId) => {
    setTeacherQuizzes((prev) =>
      prev.map((q) => {
        if (q.id === quizId) {
          const nextActive = !q.isActive;
          return {
            ...q,
            isActive: nextActive,
            status: nextActive ? "ACTIVE" : "INACTIVE",
          };
        }
        return q;
      }),
    );
    showToast("Quiz status updated");
  };

  const createTeacherQuiz = (quizData) => {
    const newQuiz = {
      id: `t-quiz-${Date.now()}`,
      title: quizData.title,
      courses: "Modern Web Application Development",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      expiry: quizData.expiry || "Oct 15, 2026",
      status: "ACTIVE",
      isActive: true,
      totalQuestions: quizData.totalQuestions || 30,
      timeLimit: quizData.timeLimit || "30 mins",
      attemptsCount: 0,
    };
    setTeacherQuizzes((prev) => [newQuiz, ...prev]);
    showToast("New quiz activated!");
    setIsNewQuizOpen(false);
  };

  const login = (role = "student", credentials = {}) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast("Logged out successfully");
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        portalMode,
        setPortalMode,
        userRole,
        setUserRole,
        login,
        logout,
        activeNav,
        setActiveNav,
        sidebarCollapsed,
        setSidebarCollapsed,
        student,
        courseDetails,
        scheduleDays,
        selectedScheduleDay,
        setSelectedScheduleDay,
        dashboardSubTab,
        setDashboardSubTab,
        attendanceSummary,
        selectedAttendanceMonth,
        setSelectedAttendanceMonth,
        attendanceRecords,
        feeRecords,
        setFeeRecords,
        progressSummary,
        progressModules,
        toggleTopicCompletion,
        assignments,
        quizzes,
        selectedAssignment,
        setSelectedAssignment,
        editingAssignment,
        setEditingAssignment,
        selectedQuiz,
        setSelectedQuiz,
        handleQuizSubmit,
        isProfileOpen,
        setIsProfileOpen,
        isFeedbackOpen,
        setIsFeedbackOpen,
        toastMessage,
        setToastMessage,
        showToast,
        handleAssignmentSubmit,
        copyToClipboard,

        // Teacher Portal
        teacherActiveTab,
        setTeacherActiveTab,
        teacherTrainer,
        teacherStudents,
        setTeacherStudents,
        teacherAssignments,
        setTeacherAssignments,
        teacherQuizzes,
        setTeacherQuizzes,
        teacherAttendanceDate,
        setTeacherAttendanceDate,
        teacherAttendanceStatus,
        setTeacherAttendanceStatus,
        markStudentAttendance,
        bulkMarkAttendance,
        createTeacherAssignment,
        updateTeacherAssignment,
        deleteTeacherAssignment,
        toggleQuizStatus,
        createTeacherQuiz,
        isNewAssignmentOpen,
        setIsNewAssignmentOpen,
        selectedTeacherAssignment,
        setSelectedTeacherAssignment,
        editingTeacherAssignment,
        setEditingTeacherAssignment,
        selectedStudentForInspect,
        setSelectedStudentForInspect,
        selectedTeacherQuiz,
        setSelectedTeacherQuiz,
        isQuizQuestionsModalOpen,
        setIsQuizQuestionsModalOpen,
        isNewQuizOpen,
        setIsNewQuizOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  return context;
};
