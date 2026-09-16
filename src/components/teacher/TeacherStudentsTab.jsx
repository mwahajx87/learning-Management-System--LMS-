import React, { useState } from 'react';
import { Search, Eye, ChevronLeft, ChevronRight, CheckCircle2, Copy } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherStudentsTab = () => {
  const { teacherStudents, setSelectedStudentForInspect, copyToClipboard } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter students
  const filteredStudents = teacherStudents.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || st.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRecords = filteredStudents.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / itemsPerPage));
  const displayedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Search & Filter Header (matching student.png) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="teacher-student-search"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, email or roll no..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-xs sm:text-sm focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs hidden sm:inline">Filter:</span>
          <select
            id="teacher-student-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter students by enrollment status"
            className="border text-xs rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="ENROLLED">Enrolled</option>
            <option value="DROPPED">Dropped</option>
          </select>
        </div>
      </div>

      {/* Students Table (desktop) */}
      <div className="hidden md:block rounded-xl border overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-[11px] font-semibold tracking-wider uppercase">
                <th className="py-3.5 px-4 sm:px-6">Name</th>
                <th className="py-3.5 px-4 sm:px-6">Roll Number</th>
                <th className="py-3.5 px-4 sm:px-6">Email</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs">
              {displayedStudents.length > 0 ? (
                displayedStudents.map((st) => (
                  <tr
                    key={st.id}
                    className="transition-colors group"
                  >
                    {/* Name + Avatar */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                        <div className="font-semibold transition-colors">
                          {st.name}
                        </div>
                      </div>
                    </td>

                    {/* Roll Number */}
                    <td className="py-3.5 px-4 sm:px-6 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span>{st.rollNumber}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(st.rollNumber, 'Roll Number')}
                          className=" p-1 transition-colors"
                          title="Copy Roll Number"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 sm:px-6">
                      {st.email}
                    </td>

                    {/* Status badge */}
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider text- border">
                        {st.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedStudentForInspect(st)}
                        className="p-1.5 rounded-lg transition-colors inline-flex items-center justify-center"
                        title="View Student Profile & Performance"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t text-xs">
          <div>
            Showing {totalRecords > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
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
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Students Cards (mobile — stacked card layout) */}
      <div className="md:hidden space-y-3">
        {displayedStudents.length > 0 ? (
          displayedStudents.map((st) => (
            <div key={st.id} className="rounded-xl border p-4 space-y-3">
              {/* Name + Avatar + Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-8 h-8 rounded-full object-cover border shrink-0"
                  />
                  <span className="text-sm font-semibold truncate">
                    {st.name}
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider border shrink-0">
                  {st.status}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span>Roll Number</span>
                  <span className="flex items-center gap-1.5 font-mono">
                    {st.rollNumber}
                    <button
                      type="button"
                      onClick={() => copyToClipboard(st.rollNumber, 'Roll Number')}
                      className="p-1 transition-colors"
                      title="Copy Roll Number"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>Email</span>
                  <span className="truncate max-w-[60%]">{st.email}</span>
                </div>
              </div>

              {/* Full-width Action */}
              <button
                type="button"
                onClick={() => setSelectedStudentForInspect(st)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-colors"
                title="View Student Profile & Performance"
              >
                <Eye className="w-4 h-4" />
                <span>View Profile</span>
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-xl border p-6 text-center text-xs">
            No students found matching your search.
          </div>
        )}
      </div>

      {/* Pagination Controls (mobile) */}
      <div className="md:hidden rounded-xl border px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          Showing {totalRecords > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
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
            disabled={currentPage === totalPages || totalPages === 0}
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
