import React, { createContext, useContext, useState } from "react";
import { useApp } from "./AppContext";
import {
  INITIAL_STUDENT,
  INITIAL_SCHEDULE_DAYS,
  ATTENDANCE_SUMMARY,
  INITIAL_FEE_RECORDS,
  ATTENDANCE_RECORDS,
  INITIAL_PROGRESS_MODULES,
  INITIAL_ASSIGNMENTS,
  INITIAL_QUIZZES,
} from "../components/student/data/studentData";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  // Shared app helpers (toast)
  const { showToast } = useApp();

  // --- Student Profile ---
  const [student, setStudent] = useState(INITIAL_STUDENT);

  // --- Student Navigation ---
  const [activeNav, setActiveNav] = useState("dashboard");

  // --- Dashboard: schedule and sub-tabs ---
  const [scheduleDays, setScheduleDays] = useState(INITIAL_SCHEDULE_DAYS);
  const [selectedScheduleDay, setSelectedScheduleDay] = useState(14); // Mon 14
  const [dashboardSubTab, setDashboardSubTab] = useState("quizzes"); // assignments | quizzes | events

  // --- Attendance ---
  const attendanceSummary = ATTENDANCE_SUMMARY;
  const attendanceRecords = ATTENDANCE_RECORDS;
  const [selectedAttendanceMonth, setSelectedAttendanceMonth] =
    useState("Sep 2026");

  // --- Fee Records ---
  const [feeRecords, setFeeRecords] = useState(INITIAL_FEE_RECORDS);

  // --- Progress Tracking ---
  const [progressModules, setProgressModules] = useState(
    INITIAL_PROGRESS_MODULES
  );
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

  // --- Assignments ---
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);

  // --- Quizzes ---
  const [quizzes, setQuizzes] = useState(INITIAL_QUIZZES);

  // --- Student Modals & Popups ---
  const [selectedAssignment, setSelectedAssignment] = useState(null); // for View Modal
  const [editingAssignment, setEditingAssignment] = useState(null); // for Upload/Edit Modal
  const [selectedQuiz, setSelectedQuiz] = useState(null); // for Quiz Modal

  const toggleTopicCompletion = (moduleId, topicIdentifier) => {
    setProgressModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== moduleId) return mod;

        const targetTopic =
          typeof topicIdentifier === "number"
            ? mod.topics[topicIdentifier]
            : mod.topics.find((t) => t.name === topicIdentifier);

        const toggledTo = targetTopic ? !targetTopic.completed : false;
        const updatedTopics = mod.topics.map((t, index) => {
          const matches =
            typeof topicIdentifier === "number"
              ? index === topicIdentifier
              : t.name === topicIdentifier;

          if (!matches) return t;

          return {
            ...t,
            completed: toggledTo,
            date: toggledTo ? "Just now" : null,
          };
        });

        const completedCount = updatedTopics.filter((t) => t.completed).length;
        const percentage = Math.round(
          (completedCount / updatedTopics.length) * 100,
        );

        const topicName = targetTopic?.name ?? String(topicIdentifier);
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

  return (
    <StudentContext.Provider
      value={{
        student,
        setStudent,
        activeNav,
        setActiveNav,
        scheduleDays,
        setScheduleDays,
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
        setProgressModules,
        toggleTopicCompletion,
        assignments,
        setAssignments,
        quizzes,
        setQuizzes,
        selectedAssignment,
        setSelectedAssignment,
        editingAssignment,
        setEditingAssignment,
        selectedQuiz,
        setSelectedQuiz,
        handleQuizSubmit,
        handleAssignmentSubmit,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  return context;
};
