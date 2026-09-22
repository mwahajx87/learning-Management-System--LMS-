import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Mail,
  User,
  Copy,
  FileText,
  Calendar,
  Sparkles,
  BarChart3,
} from "lucide-react";
import { useApp } from "../../../context/AppContext";
import { useTeacher } from "../../../context/TeacherContext";

export const TeacherModals = () => {
  const {
    // New Assignment
    isNewAssignmentOpen,
    setIsNewAssignmentOpen,
    createTeacherAssignment,

    // Edit Assignment
    editingTeacherAssignment,
    setEditingTeacherAssignment,
    updateTeacherAssignment,
    deleteTeacherAssignment,

    // Inspect Assignment Submissions
    selectedTeacherAssignment,
    setSelectedTeacherAssignment,

    // Inspect Student
    selectedStudentForInspect,
    setSelectedStudentForInspect,

    // Quiz Modals
    selectedTeacherQuiz,
    setSelectedTeacherQuiz,
    isQuizQuestionsModalOpen,
    setIsQuizQuestionsModalOpen,
    isNewQuizOpen,
    setIsNewQuizOpen,
    createTeacherQuiz,

    // Class Students
    teacherStudents,
  } = useTeacher();

  const { copyToClipboard } = useApp();

  // New Assignment Form State
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTopics, setNewTopics] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [isHackathon, setIsHackathon] = useState(false);

  // Edit Assignment Form State
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editTopics, setEditTopics] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editIsHackathon, setEditIsHackathon] = useState(false);

  // New Quiz Form State
  const [quizTitle, setQuizTitle] = useState("");
  const [quizExpiry, setQuizExpiry] = useState("");
  const [quizQuestions, setQuizQuestions] = useState(40);
  const [quizTime, setQuizTime] = useState("45 mins");

  useEffect(() => {
    if (editingTeacherAssignment) {
      setEditTitle(editingTeacherAssignment.title || "");
      setEditDesc(editingTeacherAssignment.description || "");
      setEditTopics(
        Array.isArray(editingTeacherAssignment.topics)
          ? editingTeacherAssignment.topics
              .filter((t) => !t.startsWith("+"))
              .join(", ")
          : "",
      );
      setEditDueDate(editingTeacherAssignment.dueDate || "");
      setEditIsHackathon(!!editingTeacherAssignment.isHackathon);
    }
  }, [editingTeacherAssignment]);

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const parsedTopics = newTopics
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    createTeacherAssignment({
      title: newTitle,
      description: newDesc,
      topics: parsedTopics.length > 0 ? parsedTopics : ["No topics"],
      dueDate: newDueDate || "Oct 15, 2026",
      isHackathon,
    });

    setNewTitle("");
    setNewDesc("");
    setNewTopics("");
    setNewDueDate("");
    setIsHackathon(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    const parsedTopics = editTopics
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    updateTeacherAssignment(editingTeacherAssignment.id, {
      title: editTitle,
      description: editDesc,
      topics: parsedTopics.length > 0 ? parsedTopics : ["No topics"],
      dueDate: editDueDate,
      isHackathon: editIsHackathon,
      hackathonTag: editIsHackathon ? "HACKATHON" : undefined,
    });
  };

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    if (!quizTitle.trim()) return;

    createTeacherQuiz({
      title: quizTitle,
      expiry: quizExpiry || "Nov 1, 2026",
      totalQuestions: Number(quizQuestions) || 30,
      timeLimit: quizTime || "40 mins",
    });

    setQuizTitle("");
    setQuizExpiry("");
  };

  return (
    <>
      {/* NEW ASSIGNMENT MODAL */}
      {isNewAssignmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="border bg-surface w-full max-w-lg rounded-2xl p-4 sm:p-6 shadow-2xl relative max-h-[90dvh] sm:max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsNewAssignmentOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-ink hover:bg-secondary-900/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg border flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold">Create New Assignment</h3>
                <p className="text-xs">
                  Publish assignment details directly to student dashboards
                </p>
              </div>
            </div>

            <form
              onSubmit={handleCreateAssignment}
              className="flex flex-col gap-4 text-xs"
            >
              <div>
                <label className="block font-medium mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js Full Stack Dashboard"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Description & Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide challenge criteria, repository requirements, or Figma links..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">
                    Topics (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, NextJS, TypeScript"
                    value={newTopics}
                    onChange={(e) => setNewTopics(e.target.value)}
                    className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Due Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Sep 30, 2026"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is-hackathon-check"
                  checked={isHackathon}
                  onChange={(e) => setIsHackathon(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-400 cursor-pointer"
                />
                <label
                  htmlFor="is-hackathon-check"
                  className="font-medium cursor-pointer"
                >
                  Mark as Special Event / Hackathon Challenge
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsNewAssignmentOpen(false)}
                  className="px-4 py-2 border border-secondary-200 dark:border-secondary-700 rounded-lg transition-colors text-muted hover:text-ink hover:border-primary-400/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-primary-400 bg-primary-400 text-secondary-950 rounded-lg font-semibold shadow-md shadow-primary-400/20 transition-all hover:bg-primary-300 hover:border-primary-300"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ASSIGNMENT MODAL */}
      {editingTeacherAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface border w-full max-w-lg rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setEditingTeacherAssignment(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-ink hover:bg-secondary-900/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold mb-1">Edit Assignment</h3>
            <p className="text-xs mb-4">
              Modify assignment guidelines and due dates
            </p>

            <form
              onSubmit={handleSaveEdit}
              className="flex flex-col gap-4 text-xs"
            >
              <div>
                <label className="block font-medium mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Topics</label>
                  <input
                    type="text"
                    value={editTopics}
                    onChange={(e) => setEditTopics(e.target.value)}
                    className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Due Date</label>
                  <input
                    type="text"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-is-hackathon-check"
                  checked={editIsHackathon}
                  onChange={(e) => setEditIsHackathon(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-400 cursor-pointer"
                />
                <label
                  htmlFor="edit-is-hackathon-check"
                  className="font-medium cursor-pointer"
                >
                  Hackathon Challenge
                </label>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    deleteTeacherAssignment(editingTeacherAssignment.id);
                    setEditingTeacherAssignment(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-primary-600 dark:text-primary-300 hover:bg-primary-400/15 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingTeacherAssignment(null)}
                    className="px-4 py-2 border border-secondary-200 dark:border-secondary-700 rounded-lg transition-colors text-muted hover:text-ink hover:border-primary-400/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border rounded-lg font-semibold transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ASSIGNMENT DETAILS & SUBMISSIONS INSPECTOR */}
      {selectedTeacherAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-surface border w-full max-w-2xl rounded-2xl p-4 sm:p-6 shadow-2xl relative max-h-[90dvh] sm:max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedTeacherAssignment(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-ink hover:bg-secondary-900/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider">
                Assignment Inspector
              </span>
              {selectedTeacherAssignment.isHackathon && (
                <span className="px-2 py-0.5 rounded text-[9px] font-extrabold border">
                  HACKATHON
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold mb-2">
              {selectedTeacherAssignment.title}
            </h3>

            <p className="text-xs leading-relaxed mb-4 p-3 rounded-xl border">
              {selectedTeacherAssignment.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 text-xs">
              <div className="p-3 rounded-lg border">
                <div className="text-[10px]">Due Date</div>
                <div className="font-semibold mt-0.5">
                  {selectedTeacherAssignment.dueDate}
                </div>
              </div>
              <div className="p-3 rounded-lg border">
                <div className="text-[10px]">Submissions</div>
                <div className="font-semibold mt-0.5">
                  {selectedTeacherAssignment.submissionsCount || 52} / 57
                </div>
              </div>
              <div className="p-3 rounded-lg border">
                <div className="text-[10px]">Pending</div>
                <div className="font-semibold mt-0.5">5 Students</div>
              </div>
              <div className="p-3 rounded-lg border">
                <div className="text-[10px]">Completion Rate</div>
                <div className="font-semibold mt-0.5">91%</div>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5">
              Class Submissions Status
            </h4>

            <div className="divide-y border rounded-xl overflow-hidden max-h-60 overflow-y-auto">
              {teacherStudents.slice(0, 10).map((st, idx) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between p-3 text-xs transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-medium truncate">{st.name}</span>
                    <span className="text-[11px] font-mono">
                      ({st.rollNumber})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold border">
                      SUBMITTED
                    </span>
                    <a
                      href="https://github.com/saylani-mass-training"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedTeacherAssignment(null)}
                className="px-4 py-2 border rounded-lg text-xs font-semibold transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT PROFILE INSPECTOR MODAL */}
      {selectedStudentForInspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="border bg-surface w-full max-w-md rounded-2xl p-4 sm:p-6 shadow-2xl relative max-h-[90dvh] sm:max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedStudentForInspect(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-ink hover:bg-secondary-900/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <img
                src={selectedStudentForInspect.avatar}
                alt={selectedStudentForInspect.name}
                className="w-14 h-14 rounded-full object-cover border-2 shadow-md"
              />
              <div>
                <h3 className="text-base font-bold">
                  {selectedStudentForInspect.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs mt-0.5">
                  <span className="font-mono">
                    {selectedStudentForInspect.rollNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        selectedStudentForInspect.rollNumber,
                        "Roll Number",
                      )
                    }
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <span>•</span>
                  <span className="font-semibold">
                    {selectedStudentForInspect.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
              <div className="p-3 rounded-xl border">
                <div className="text-[10px] uppercase font-bold tracking-wider">
                  Attendance Rate
                </div>
                <div className="text-xl font-bold mt-0.5">
                  {selectedStudentForInspect.attendanceRate || 92}%
                </div>
              </div>
              <div className="p-3 rounded-xl border">
                <div className="text-[10px] uppercase font-bold tracking-wider">
                  Assignments Done
                </div>
                <div className="text-xl font-bold mt-0.5">
                  {selectedStudentForInspect.assignmentsSubmitted || 14} / 16
                </div>
              </div>
            </div>

            {/* Student Info Details */}
            <div className="space-y-2 text-xs p-3.5 rounded-xl border mb-5">
              <div className="flex items-center justify-between">
                <span>Email:</span>
                <span className="font-medium truncate max-w-[200px]">
                  {selectedStudentForInspect.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Batch:</span>
                <span className="font-medium">Batch 20 (WMA)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Campus:</span>
                <span className="font-medium">Zaitoon Ashraf IT Park</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Overall Grade:</span>
                <span className="font-bold">A+ (Distinction)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedStudentForInspect(null)}
              className="w-full py-2.5 border rounded-xl text-xs font-semibold transition-colors"
            >
              Close Student Card
            </button>
          </div>
        </div>
      )}

      {/* QUIZ QUESTIONS & SCORES MODAL */}
      {isQuizQuestionsModalOpen && selectedTeacherQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="border bg-surface w-full max-w-lg rounded-2xl p-4 sm:p-6 shadow-2xl relative max-h-[90dvh] sm:max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsQuizQuestionsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-ink hover:bg-secondary-900/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold mb-1">
              {selectedTeacherQuiz.title} - Question Bank
            </h3>
            <p className="text-xs mb-4">
              Review test parameters, scoring criteria, and active status
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl border">
                <div className="font-semibold mb-1">
                  Q1: What will be the output of `typeof NaN` in JavaScript?
                </div>
                <div className="pl-2 border-l-2">Correct Answer: `number`</div>
              </div>

              <div className="p-3 rounded-xl border">
                <div className="font-semibold mb-1">
                  Q2: Which method is used to serialize a JavaScript object into
                  a JSON string?
                </div>
                <div className="pl-2 border-l-2">
                  Correct Answer: `JSON.stringify()`
                </div>
              </div>

              <div className="p-3 rounded-xl border">
                <div className="font-semibold mb-1">
                  Q3: What is the primary difference between `null` and
                  `undefined`?
                </div>
                <div className="pl-2 border-l-2">
                  Correct Answer: `null` is an assigned intentional empty value,
                  while `undefined` represents a declared variable without an
                  assigned value.
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsQuizQuestionsModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-xs font-semibold transition-colors"
              >
                Close Question Bank
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW QUIZ MODAL */}
      {isNewQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="border bg-surface w-full max-w-md rounded-2xl p-4 sm:p-6 shadow-2xl relative max-h-[90dvh] sm:max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsNewQuizOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-ink hover:bg-secondary-900/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold mb-1">Create New Quiz</h3>
            <p className="text-xs mb-4">
              Launch online assessment for students
            </p>

            <form
              onSubmit={handleCreateQuiz}
              className="flex flex-col gap-3.5 text-xs"
            >
              <div>
                <label className="block font-medium mb-1">Quiz Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern React & State Management Quiz"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">
                    Total Questions
                  </label>
                  <input
                    type="number"
                    value={quizQuestions}
                    onChange={(e) => setQuizQuestions(e.target.value)}
                    className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Time Limit</label>
                  <input
                    type="text"
                    value={quizTime}
                    onChange={(e) => setQuizTime(e.target.value)}
                    className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="e.g. Oct 20, 2026"
                  value={quizExpiry}
                  onChange={(e) => setQuizExpiry(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:border-primary-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsNewQuizOpen(false)}
                  className="px-4 py-2 border border-secondary-200 dark:border-secondary-700 rounded-lg transition-colors text-muted hover:text-ink hover:border-primary-400/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 border border-primary-400 bg-primary-400 text-secondary-950 py-2 rounded-lg font-semibold shadow-md shadow-primary-400/20 transition-colors hover:bg-primary-300 hover:border-primary-300"
                >
                  Activate Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
