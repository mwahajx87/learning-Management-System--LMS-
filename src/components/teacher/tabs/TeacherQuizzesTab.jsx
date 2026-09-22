import React, { useState } from "react";
import {
  Eye,
  FileText,
  Plus,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useTeacher } from "../../../context/TeacherContext";

export const TeacherQuizzesTab = () => {
  const {
    teacherQuizzes,
    toggleQuizStatus,
    setSelectedTeacherQuiz,
    setIsNewQuizOpen,
  } = useTeacher();

  return (
    <div className="flex flex-col gap-4">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-line bg-surface">
        <div>
          <h2 className="text-sm font-semibold">
            Course Quizzes & Assessments
          </h2>
          <p className="text-xs">
            Control quiz visibility, configure time windows, and evaluate class
            performance
          </p>
        </div>

        <button
          id="teacher-new-quiz-btn"
          type="button"
          onClick={() => setIsNewQuizOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer border border-primary-400 bg-primary-400 text-secondary-950 hover:bg-primary-300 hover:border-primary-300 shadow-primary-400/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Quiz</span>
        </button>
      </div>

      <div className="hidden md:block rounded-xl border border-line bg-surface overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-[11px] font-semibold tracking-wider uppercase">
                <th className="py-3.5 px-4 sm:px-6 w-[20%]">Quiz</th>
                <th className="py-3.5 px-4 sm:px-6 w-[36%]">Course(s)</th>
                <th className="py-3.5 px-4 sm:px-6 w-[13%]">Date</th>
                <th className="py-3.5 px-4 sm:px-6 w-[13%]">Expiry</th>
                <th className="py-3.5 px-4 sm:px-6 text-center w-[10%]">
                  Status
                </th>
                <th className="py-3.5 px-4 sm:px-6 text-center w-[8%]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs">
              {teacherQuizzes.map((q) => (
                <tr key={q.id} className="transition-colors group">
                  {/* Quiz Name */}
                  <td className="py-3.5 px-4 sm:px-6 align-top">
                    <span className="font-semibold transition-colors">
                      {q.title}
                    </span>
                  </td>

                  {/* Course(s) */}
                  <td className="py-3.5 w-[50%] px-4 sm:px-6 align-top leading-relaxed">
                    {q.courses}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 sm:px-6 align-top whitespace-nowrap">
                    {q.date}
                  </td>

                  {/* Expiry */}
                  <td className="py-3.5 px-4 sm:px-6 align-top whitespace-nowrap">
                    {q.expiry}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 align-top text-center">
                    <span
                      className={`inline-flex items-center  text-center px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${
                        q.isActive
                          ? " border-accent-400/40 bg-accent-400/10 text-accent-600 dark:text-accent-300"
                          : " border-secondary-300/70 dark:border-secondary-600/60 bg-secondary-100 dark:bg-secondary-800/40 text-muted"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 sm:px-6 align-top text-center">
                    <div className="inline-flex items-center gap-1.5">
                      {/* Active Status Switch */}
                      <button
                        type="button"
                        onClick={() => toggleQuizStatus(q.id)}
                        className={`p-1 transition-colors rounded ${
                          q.isActive
                            ? "text-accent-600 dark:text-accent-300"
                            : "text-muted"
                        }`}
                        title={
                          q.isActive
                            ? "Active (Click to Deactivate)"
                            : "Inactive (Click to Activate)"
                        }
                      >
                        {q.isActive ? (
                          <ToggleRight className="w-5 h-5 text-accent-600 dark:text-accent-300" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-muted" />
                        )}
                      </button>

                      {/* Attempts & Scores */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTeacherQuiz(q);
                        }}
                        className="p-1 rounded transition-colors hover:text-primary-600 dark:hover:text-primary-300"
                        title="View Student Results & Score Distribution"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {teacherQuizzes.map((q) => (
          <div
            key={q.id}
            className="rounded-xl border border-line bg-surface p-4 space-y-3"
          >
            {/* Title + Status */}
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-semibold min-w-0">{q.title}</span>
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border shrink-0 ${
                  q.isActive
                    ? " border-accent-400/40 bg-accent-400/10 text-accent-600 dark:text-accent-300"
                    : " border-secondary-300/70 dark:border-secondary-600/60 bg-secondary-100 dark:bg-secondary-800/40 text-muted"
                }`}
              >
                {q.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <div className="col-span-2 min-w-0">
                <div className="mb-1">Course(s)</div>
                <div className="font-medium leading-relaxed">{q.courses}</div>
              </div>
              <div>
                <div className="mb-1">Date</div>
                <div className="font-medium font-mono">{q.date}</div>
              </div>
              <div>
                <div className="mb-1">Expiry</div>
                <div className="font-medium font-mono">{q.expiry}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => toggleQuizStatus(q.id)}
                className="p-1.5 rounded-lg border transition-colors"
                title={
                  q.isActive
                    ? "Active (Click to Deactivate)"
                    : "Inactive (Click to Activate)"
                }
              >
                {q.isActive ? (
                  <ToggleRight className="w-5 h-5 text-accent-600 dark:text-accent-300" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-muted" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTeacherQuiz(q)}
                className="p-2 rounded-lg border border-secondary-200 dark:border-secondary-700 transition-colors hover:border-primary-400/50 hover:text-primary-600 dark:hover:text-primary-300"
                title="View Student Results & Score Distribution"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
