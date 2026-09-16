import React, { useState } from 'react';
import { Eye, FileText, Plus, CheckCircle2, ToggleLeft, ToggleRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherQuizzesTab = () => {
  const {
    teacherQuizzes,
    toggleQuizStatus,
    setSelectedTeacherQuiz,
    setIsQuizQuestionsModalOpen,
    setIsNewQuizOpen
  } = useApp();

  return (
    <div className="flex flex-col gap-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl border">
        <div>
          <h2 className="text-sm font-semibold">Course Quizzes & Assessments</h2>
          <p className="text-xs">Control quiz visibility, configure time windows, and evaluate class performance</p>
        </div>

        <button
          id="teacher-new-quiz-btn"
          type="button"
          onClick={() => setIsNewQuizOpen(true)}
          className="flex border items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Quiz</span>
        </button>
      </div>

      {/* Quizzes Table (matching quiz.png in Student Portal Dark Theme) */}
      <div className="rounded-xl border overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-[11px] font-semibold tracking-wider uppercase">
                <th className="py-3.5 px-4 sm:px-6 w-[20%]">Quiz</th>
                <th className="py-3.5 px-4 sm:px-6 w-[36%]">Course(s)</th>
                <th className="py-3.5 px-4 sm:px-6 w-[13%]">Date</th>
                <th className="py-3.5 px-4 sm:px-6 w-[13%]">Expiry</th>
                <th className="py-3.5 px-4 sm:px-6 text-center w-[10%]">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-center w-[8%]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs">
              {teacherQuizzes.map((q) => (
                <tr
                  key={q.id}
                  className="transition-colors group"
                >
                  {/* Quiz Name */}
                  <td className="py-3.5 px-4 sm:px-6 align-top">
                    <span className="font-semibold transition-colors">
                      {q.title}
                    </span>
                  </td>

                  {/* Course(s) */}
                  <td className="py-3.5 px-4 sm:px-6 align-top leading-relaxed">
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
                  <td className="py-3.5 px-4 sm:px-6 align-top text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${
                        q.isActive
                          ? ' border'
                          : ' border'
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>

                  {/* Action Icons (Toggle, Questions list, Eye view) */}
                  <td className="py-3.5 px-4 sm:px-6 align-top text-center">
                    <div className="inline-flex items-center gap-1.5">
                      {/* Active Status Switch */}
                      <button
                        type="button"
                        onClick={() => toggleQuizStatus(q.id)}
                        className={`p-1 transition-colors rounded ${
                          q.isActive
                            ? ''
                            : ''
                        }`}
                        title={q.isActive ? 'Active (Click to Deactivate)' : 'Inactive (Click to Activate)'}
                      >
                        {q.isActive ? (
                          <ToggleRight className="w-5 h-5" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>

                      {/* Question List View */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTeacherQuiz(q);
                          setIsQuizQuestionsModalOpen(true);
                        }}
                        className="p-1 rounded transition-colors"
                        title="View Question Bank"
                      >
                        <FileText className="w-4 h-4" />
                      </button>

                      {/* Attempts & Scores */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTeacherQuiz(q);
                        }}
                        className="p-1 rounded transition-colors"
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
    </div>
  );
};
