import React, { useState } from "react";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { useTeacher } from "../../../context/TeacherContext";

export const TeacherAttendanceTab = () => {
  const {
    teacherStudents,
    teacherAttendanceDate,
    setTeacherAttendanceDate,
    teacherAttendanceStatus,
    markStudentAttendance,
    bulkMarkAttendance,
  } = useTeacher();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalStudents = teacherStudents.length;
  let presentCount = 0;
  let absentCount = 0;
  let leaveCount = 0;

  teacherStudents.forEach((st) => {
    const status = teacherAttendanceStatus[st.rollNumber];
    if (status === "PRESENT") presentCount++;
    else if (status === "ABSENT") absentCount++;
    else if (status === "LEAVE") leaveCount++;
  });

  const totalPages = Math.max(1, Math.ceil(totalStudents / itemsPerPage));
  const displayedStudents = teacherStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Date Picker Bar (matching attendance.png) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border">
        <div>
          <div className="text-sm font-semibold">Daily Attendance Register</div>
          <div className="text-xs">
            Batch 20 • Modern Web Application Development
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[11px]">Date:</span>
            <input
              type="text"
              value={teacherAttendanceDate}
              onChange={(e) => setTeacherAttendanceDate(e.target.value)}
              className=" font-medium text-xs focus:outline-none w-28"
            />
          </div>

          <button
            type="button"
            onClick={() => bulkMarkAttendance("PRESENT")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All Present</span>
          </button>

          <button
            type="button"
            onClick={() => bulkMarkAttendance("NOT MARKED")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Total Students */}
        <div className="border rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight">
              {totalStudents}
            </div>
            <div className="text-xs mt-0.5 font-medium">Total Students</div>
          </div>
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Present */}
        <div className="border rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight">
              {presentCount}
            </div>
            <div className="text-xs mt-0.5 font-medium">Present</div>
          </div>
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Absent */}
        <div className="border rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight">
              {absentCount}
            </div>
            <div className="text-xs mt-0.5 font-medium">Absent</div>
          </div>
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Leave */}
        <div className="border rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight">
              {leaveCount}
            </div>
            <div className="text-xs mt-0.5 font-medium">Leave</div>
          </div>
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="hidden md:block rounded-xl border overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-[11px] font-semibold tracking-wider uppercase">
                <th className="py-3.5 px-4 sm:px-6 w-32">Roll #</th>
                <th className="py-3.5 px-4 sm:px-6">Full Name</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs">
              {displayedStudents.map((st) => {
                const currentStatus =
                  teacherAttendanceStatus[st.rollNumber] || "NOT MARKED";

                return (
                  <tr key={st.id} className="transition-colors">
                    {/* Roll Number */}
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-medium">
                      {st.rollNumber}
                    </td>

                    {/* Full Name with Avatar */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-7 h-7 rounded-full object-cover border"
                        />
                        <span className="font-semibold">{st.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1.5 p-1 rounded-lg border">
                        <button
                          type="button"
                          onClick={() =>
                            markStudentAttendance(st.rollNumber, "PRESENT")
                          }
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                            currentStatus === "PRESENT" ? " border" : ""
                          }`}
                        >
                          PRESENT
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            markStudentAttendance(st.rollNumber, "ABSENT")
                          }
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                            currentStatus === "ABSENT" ? " border" : ""
                          }`}
                        >
                          ABSENT
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            markStudentAttendance(st.rollNumber, "LEAVE")
                          }
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                            currentStatus === "LEAVE" ? " border" : ""
                          }`}
                        >
                          LEAVE
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            markStudentAttendance(st.rollNumber, "NOT MARKED")
                          }
                          className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                            currentStatus === "NOT MARKED" ? "border" : ""
                          }`}
                          title="Clear Status"
                        >
                          NOT MARKED
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t text-xs">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalStudents)} of{" "}
            {totalStudents} students
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
                  currentPage === pg ? "" : "border"
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

      <div className="md:hidden space-y-3">
        {displayedStudents.map((st) => {
          const currentStatus =
            teacherAttendanceStatus[st.rollNumber] || "NOT MARKED";

          return (
            <div key={st.id} className="rounded-xl border p-4 space-y-3">
              {/* Student Identity + Current Status */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-8 h-8 rounded-full object-cover border shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">
                      {st.name}
                    </div>
                    <div className="text-xs font-mono">{st.rollNumber}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border shrink-0">
                  {currentStatus}
                </span>
              </div>

              {/* Status Selector */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg border">
                <button
                  type="button"
                  onClick={() => markStudentAttendance(st.rollNumber, "PRESENT")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                    currentStatus === "PRESENT" ? " border" : ""
                  }`}
                >
                  PRESENT
                </button>
                <button
                  type="button"
                  onClick={() => markStudentAttendance(st.rollNumber, "ABSENT")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                    currentStatus === "ABSENT" ? " border" : ""
                  }`}
                >
                  ABSENT
                </button>
                <button
                  type="button"
                  onClick={() => markStudentAttendance(st.rollNumber, "LEAVE")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                    currentStatus === "LEAVE" ? " border" : ""
                  }`}
                >
                  LEAVE
                </button>
                <button
                  type="button"
                  onClick={() =>
                    markStudentAttendance(st.rollNumber, "NOT MARKED")
                  }
                  className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                    currentStatus === "NOT MARKED" ? "border" : ""
                  }`}
                  title="Clear Status"
                >
                  NOT MARKED
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
          {Math.min(currentPage * itemsPerPage, totalStudents)} of{" "}
          {totalStudents} students
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
                currentPage === pg ? "" : "border"
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
