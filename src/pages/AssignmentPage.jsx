import React, { useState } from 'react';
import {
  FileText,
  FileEdit,
  Clock,
  Eye,
  Upload,
  Edit2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatsCard } from '../components/common/StatsCard';
import { StatusBadge } from '../components/common/StatusBadge';

export const AssignmentPage = () => {
  const { assignments, setSelectedAssignment, setEditingAssignment } = useApp();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(assignments.length / pageSize);

  const paginatedAssignments = assignments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const assignedCount = assignments.length;
  const submittedCount = assignments.filter(
    (a) => a.status === 'SUBMITTED' || a.status === 'APPROVED'
  ).length;
  const pendingCount = assignments.filter((a) => a.status === 'NOT SUBMITTED').length;

  return (
    <div id="assignment-page-container" className="space-y-6 animate-fade-in pb-12">
      {/* Top Metrics Cards matching assignment full page.png */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatsCard
          id="stats-card-assigned"
          value={assignedCount}
          label="Assigned"
          icon={FileText}
         
         
        />

        <StatsCard
          id="stats-card-submitted"
          value={submittedCount}
          label="Submitted"
          icon={FileEdit}
         
         
        />

        <StatsCard
          id="stats-card-pending"
          value={pendingCount}
          label="Pending"
          icon={Clock}
         
         
        />
      </div>

      {/* Assignments Table matching assignment full page.png & page 2 */}
      <div className="border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-6 text-sm font-normal w-[35%]">
                  Assignment
                </th>
                <th className="py-4 px-6 text-sm font-normal w-[14%]">
                  Topics
                </th>
                <th className="py-4 px-6 text-sm font-normal w-[18%]">
                  Due Date
                </th>
                <th className="py-4 px-6 text-sm font-normal w-[17%]">
                  Status
                </th>
                <th className="py-4 px-6 text-sm font-normal w-[16%]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedAssignments.map((asg) => (
                <tr
                  key={asg.id}
                  className="transition-colors"
                >
                  {/* Assignment Title & Hackathon Pill */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-sm font-medium ${
                          asg.isHackathon ? '' : ''
                        }`}
                      >
                        {asg.title}
                      </span>
                      {asg.isHackathon && <StatusBadge status="HACKATHON" />}
                    </div>
                  </td>

                  {/* Topics count pill */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    {asg.topicsCount > 0 ? (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold border">
                        {asg.topicsCount} {asg.topicsCount === 1 ? 'Topic' : 'Topics'}
                      </span>
                    ) : (
                      <span className="text-sm font-normal">
                        No topics
                      </span>
                    )}
                  </td>

                  {/* Due Date (purple if hackathon, white otherwise) */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        asg.isHackathon ? '' : ''
                      }`}
                    >
                      {asg.dueDate}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <StatusBadge status={asg.status} />
                  </td>

                  {/* Action Icons */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    {asg.submissionsClosed ? (
                      <div className="flex items-center gap-3.5">
                        <button
                          id={`view-assignment-${asg.id}`}
                          onClick={() => setSelectedAssignment(asg)}
                          className=" transition-colors"
                          title="View Assignment Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <span className="text-xs italic font-normal tracking-wide">
                          Submissions closed
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3.5">
                        <button
                          id={`view-assignment-${asg.id}`}
                          onClick={() => setSelectedAssignment(asg)}
                          className=" transition-colors"
                          title="View Assignment Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          id={`upload-assignment-${asg.id}`}
                          onClick={() => setEditingAssignment(asg)}
                          className=" transition-colors"
                          title="Upload / Submit Link"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                        <button
                          id={`edit-assignment-${asg.id}`}
                          onClick={() => setEditingAssignment(asg)}
                          className=" transition-colors"
                          title="Edit Submission Notes"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls matching screenshot */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="text-xs leading-tight select-none">
            <div>
              Showing {(currentPage - 1) * pageSize + 1}-
              {Math.min(currentPage * pageSize, assignments.length)} of{' '}
              {assignments.length}
            </div>
            <div>records</div>
          </div>

          <div className="flex items-center gap-3 select-none">
            <button
              id="pagination-prev-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`flex items-center gap-1.5 text-xs font-normal transition-colors ${
                currentPage === 1
                  ? 'cursor-not-allowed'
                  : ' cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  id={`pagination-page-${pageNum}`}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors flex items-center justify-center ${
                    currentPage === pageNum
                      ? 'border'
                      : ''
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              id="pagination-next-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={`flex items-center gap-1.5 text-xs font-normal transition-colors ${
                currentPage === totalPages
                  ? 'cursor-not-allowed'
                  : ' cursor-pointer'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
