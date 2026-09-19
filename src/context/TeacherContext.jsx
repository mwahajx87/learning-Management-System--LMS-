import React, { createContext, useContext, useState } from "react";
import { useApp } from "./AppContext";
import {
  INITIAL_TEACHER_STUDENTS,
  INITIAL_TEACHER_ASSIGNMENTS,
  INITIAL_TEACHER_QUIZZES,
} from "../components/teacher/data/teacherData";

const TeacherContext = createContext();

// ============================================================
//  Teacher Context - all teacher/trainer-portal state and
//  actions (trainer profile, class students, assignments,
//  quizzes, attendance and teacher modals)
//  App-level concerns (auth, sidebar, toast) live in AppContext.
// ============================================================
export const TeacherProvider = ({ children }) => {
  // Shared app helpers (toast)
  const { showToast } = useApp();

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

  return (
    <TeacherContext.Provider
      value={{
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
        isNewQuizOpen,
        setIsNewQuizOpen,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = () => {
  const context = useContext(TeacherContext);
  return context;
};
