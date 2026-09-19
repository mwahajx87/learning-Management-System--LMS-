import React, { useState } from 'react';
import { Plus, Eye, Edit3, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { useTeacher } from '../../../context/TeacherContext';

export const TeacherAssignmentsTab = () => {
  const {
    teacherAssignments,
    setIsNewAssignmentOpen,
    setSelectedTeacherAssignment,
    setEditingTeacherAssignment
  } = useTeacher();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalRecords = teacherAssignments.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / itemsPerPage));
  const displayedAssignments = teacherAssignments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border">
        <div>
          <h2 className="text-sm font-semibold">Course Assignments & Hackathons</h2>
          <p className="text-xs">Manage project briefs, hackathon challenges, deadlines, and submissions</p>
        </div>

        <button
          id="teacher-new-assignment-btn"
          type="button"
          onClick={() => setIsNewAssignmentOpen(true)}
          className="flex border items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Assignments Table (matching assignment.png in Student Portal Dark Theme) (desktop) */}
      <div className="hidden md:block rounded-xl border overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-[11px] font-semibold tracking-wider uppercase">
                <th className="py-3.5 px-4 sm:px-6 w-[22%]">Title</th>
                <th className="py-3.5 px-4 sm:px-6 w-[32%]">Description</th>
                <th className="py-3.5 px-4 sm:px-6 w-[24%]">Topics</th>
                <th className="py-3.5 px-4 sm:px-6 w-[12%]">Due Date</th>
                <th className="py-3.5 px-4 sm:px-6 text-center w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs">
              {displayedAssignments.map((asg) => {
                const isHackathon = asg.isHackathon;

                return (
                  <tr
                    key={asg.id}
                    className="transition-colors group"
                  >
                    {/* Title */}
                    <td className="py-3.5 px-4 sm:px-6 align-top">
                      <div className="flex flex-col gap-1.5">
                        <span
                          className={`font-semibold transition-colors ${
                            isHackathon
                              ? ''
                              : ''
                          }`}
                        >
                          {asg.title}
                        </span>

                        {isHackathon && (
                          <span className="inline-flex items-center self-start px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider border uppercase">
                            HACKATHON
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 sm:px-6 align-top leading-relaxed">
                      <div className="line-clamp-2" title={asg.description}>
                        {asg.description}
                      </div>
                    </td>

                    {/* Topics Pills */}
                    <td className="py-3.5 px-4 sm:px-6 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {asg.topics && asg.topics.length > 0 ? (
                          asg.topics.map((tpc, idx) => {
                            const isExtraCount = tpc.startsWith('+');
                            const isNoTopic = tpc === 'No topics';

                            if (isNoTopic) {
                              return (
                                <span
                                  key={idx}
                                  className="text-[11px] italic"
                                >
                                  No topics
                                </span>
                              );
                            }

                            return (
                              <span
                                key={idx}
                                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors ${
                                  isExtraCount
                                    ? ' border'
                                    : ' border'
                                }`}
                              >
                                {tpc}
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-[11px] italic">No topics</span>
                        )}
                      </div>
                    </td>

                    {/* Due Date */}
                    <td className="py-3.5 px-4 sm:px-6 align-top whitespace-nowrap">
                      <span
                        className={`font-medium ${
                          isHackathon ? 'font-semibold' : ''
                        }`}
                      >
                        {asg.dueDate}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 align-top text-center">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedTeacherAssignment(asg)}
                          className="p-1.5 rounded-lg transition-colors"
                          title="View Details & Submissions"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTeacherAssignment(asg)}
                          className="p-1.5 rounded-lg transition-colors"
                          title="Edit Assignment"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t text-xs">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalRecords)} of {totalRecords} records
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                type="button"
                onClick={() => setCurrentPage(pg)}
                className={`w-7 h-7 rounded-md text-xs font-medium transition-colors ${
                  currentPage === pg
                    ? ''
                    : 'border'
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Assignments Cards (mobile — stacked card layout) */}
      <div className="md:hidden space-y-3">
        {displayedAssignments.map((asg) => {
          const isHackathon = asg.isHackathon;

          return (
            <div key={asg.id} className="rounded-xl border p-4 space-y-3">
              {/* Title + Hackathon pill + Due Date */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-sm font-semibold">{asg.title}</span>
                  {isHackathon && (
                    <span className="inline-flex items-center self-start px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider border uppercase">
                      HACKATHON
                    </span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] mb-0.5">Due Date</div>
                  <span className="text-xs font-medium">{asg.dueDate}</span>
                </div>
              </div>

              {/* Description */}
              <p
                className="text-xs leading-relaxed line-clamp-2"
                title={asg.description}
              >
                {asg.description}
              </p>

              {/* Topics Pills */}
              <div className="flex flex-wrap gap-1.5">
                {asg.topics && asg.topics.length > 0 ? (
                  asg.topics.map((tpc, idx) => {
                    const isNoTopic = tpc === 'No topics';

                    if (isNoTopic) {
                      return (
                        <span key={idx} className="text-[11px] italic">
                          No topics
                        </span>
                      );
                    }

                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border"
                      >
                        {tpc}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-[11px] italic">No topics</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedTeacherAssignment(asg)}
                  className="p-2 rounded-lg border transition-colors"
                  title="View Details & Submissions"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTeacherAssignment(asg)}
                  className="p-2 rounded-lg border transition-colors"
                  title="Edit Assignment"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls (mobile) */}
      <div className="md:hidden rounded-xl border px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalRecords)} of {totalRecords} records
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={`m-${pg}`}
              type="button"
              onClick={() => setCurrentPage(pg)}
              className={`w-7 h-7 rounded-md text-xs font-medium transition-colors ${
                currentPage === pg ? '' : 'border'
              }`}
            >
              {pg}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
