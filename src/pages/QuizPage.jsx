import React from "react";
import { AlertTriangle, HelpCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { StatusBadge } from "../components/common/StatusBadge";

export const QuizPage = () => {
  const { quizzes, setSelectedQuiz } = useApp();

  return (
    <div id="quiz-page-container" className="space-y-6 animate-fade-in pb-12">
      {/* Important Information Notice Box */}
      <div
        id="quiz-important-notice-box"
        className="border rounded-2xl p-6 relative"
      >
        <div className="flex items-center gap-2.5 font-bold text-base mb-3">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-bold">Important Information</h3>
        </div>

        <ul className="space-y-1.5 text-xs sm:text-sm ml-6 list-disc">
          <li>Once started, quizzes must be completed in one session</li>
          <li>Switching tabs or leaving the window will be recorded</li>
          <li>Ensure you have a stable internet connection</li>
          <li>The quiz will open in fullscreen mode</li>
        </ul>
      </div>

      {/* Quizzes Table */}
      <div className="border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b font-medium">
                <th className="py-4 px-5 font-semibold">Title</th>
                <th className="py-4 px-5 font-semibold">Module</th>
                <th className="py-4 px-5 font-semibold text-center">
                  Questions
                </th>
                <th className="py-4 px-5 font-semibold text-center">
                  Attempts
                </th>
                <th className="py-4 px-5 font-semibold text-center">
                  Percentage
                </th>
                <th className="py-4 px-5 font-semibold text-center">Status</th>
                <th className="py-4 px-5 font-semibold text-center">Note</th>
                <th className="py-4 px-5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {quizzes.map((quiz) => {
                const isWarningAttempt = quiz.attempts.startsWith("2");

                return (
                  <tr
                    key={quiz.id}
                    className="transition-colors"
                  >
                    {/* Title */}
                    <td
                      onClick={() => setSelectedQuiz(quiz)}
                      className="py-4 px-5 font-semibold whitespace-nowrap cursor-pointer transition-colors"
                    >
                      {quiz.title}
                    </td>

                    {/* Module */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      {quiz.module}
                    </td>

                    {/* Questions badge */}
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-lg border">
                        {quiz.questions}
                      </span>
                    </td>

                    {/* Attempts */}
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      {isWarningAttempt ? (
                        <span className="px-2 py-0.5 rounded text-xs font-bold border">
                          {quiz.attempts}
                        </span>
                      ) : (
                        <span className="font-mono text-xs">
                          {quiz.attempts}
                        </span>
                      )}
                    </td>

                    {/* Percentage */}
                    <td className="py-4 px-5 text-center font-bold whitespace-nowrap">
                      {quiz.percentage}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      <StatusBadge status={quiz.status} />
                    </td>

                    {/* Note */}
                    <td className="py-4 px-5 text-center font-mono">
                      {quiz.note}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedQuiz(quiz)}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
                      >
                        {quiz.action || "Completed"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Support Note */}
      <div className="flex items-center justify-center gap-2 text-xs pt-3">
        <HelpCircle className="w-4 h-4" />
        <span>
          Contact your instructor if you have any issues accessing your quizzes.
        </span>
      </div>
    </div>
  );
};
