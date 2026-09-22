import React from "react";
import { Calendar, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { useStudent } from "../../../context/StudentContext";
import { StatsCard } from "../../common/StatsCard";
import { StatusBadge } from "../../common/StatusBadge";

export const AttendancePage = () => {
  const {
    attendanceSummary,
    selectedAttendanceMonth,
    setSelectedAttendanceMonth,
    attendanceRecords,
  } = useStudent();

  const currentRecords = attendanceRecords[selectedAttendanceMonth] || [];

  return (
    <div
      id="attendance-page-container"
      className="space-y-4 animate-fade-in pb-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          id="stats-card-total-classes"
          value={attendanceSummary.totalClasses}
          label="Total Classes"
          icon={Calendar}
          iconBg="bg-info-400/10 border-info-400/30"
          iconColor="text-info-600 dark:text-info-300"
        />

        <StatsCard
          id="stats-card-present"
          value={attendanceSummary.present}
          label="Present"
          icon={CheckCircle2}
          iconBg="bg-accent-400/10 border-accent-400/30"
          iconColor="text-accent-600 dark:text-accent-300"
        />

        <StatsCard
          id="stats-card-leave"
          value={attendanceSummary.leave}
          label="Leave"
          icon={XCircle}
          iconBg="bg-warning-400/10 border-warning-400/30"
          iconColor="text-warning-600 dark:text-warning-300"
        />

        <StatsCard
          id="stats-card-absent"
          value={attendanceSummary.absent}
          label="Absent"
          icon={XCircle}
          iconBg="bg-primary-400/15 border-primary-400/30"
          iconColor="text-primary-600 dark:text-primary-300"
        />
      </div>

      <div
        id="attendance-overview-banner"
        className="border border-line bg-surface rounded-2xl p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-normal leading-snug">
              Attendance Overview
            </h3>
            <p className="text-sm mt-3 font-normal">
              Your attendance is below 75%. Please improve.
            </p>
          </div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-600 dark:text-primary-300">
            {attendanceSummary.percentage}%
          </div>
        </div>

        {/* Orange Progress Bar */}
        <div className="w-full h-2 rounded-full border border-secondary-200 dark:border-secondary-700 bg-secondary-100 dark:bg-secondary-800/40 overflow-hidden mt-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-400 to-warning-400 transition-all duration-500"
            style={{ width: `${attendanceSummary.percentage}%` }}
          />
        </div>
      </div>

      {/*  Monthly Filter Dropdown (right aligned) */}
      <div className="flex justify-end pt-1">
        <div className="relative inline-block">
          <select
            id="attendance-month-filter"
            value={selectedAttendanceMonth}
            onChange={(e) => setSelectedAttendanceMonth(e.target.value)}
            className="appearance-none bg-secondary-50 dark:bg-secondary-800/60 border border-secondary-200 dark:border-secondary-700 text-sm font-medium rounded-xl pl-4 pr-10 py-2 cursor-pointer focus:outline-none focus:border-primary-400 transition-colors"
          >
            {Object.keys(attendanceRecords).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="hidden sm:block border border-line bg-surface rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-6 text-sm font-normal w-[18%]">Class</th>
                <th className="py-4 px-6 text-sm font-normal w-[58%]">Date</th>
                <th className="py-4 px-6 text-sm font-normal w-[24%]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr
                  key={record.classNumber}
                  className="border-b last:border-b-0 transition-colors"
                >
                  <td className="py-4 px-6 text-sm font-bold">
                    {record.classNumber}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium">
                    {record.date}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={record.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Records Cards */}
      <div className="sm:hidden space-y-3">
        {currentRecords.map((record) => (
          <div
            key={record.classNumber}
            className="border border-line bg-surface rounded-2xl p-4 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="text-sm font-bold">{record.classNumber}</div>
              <div className="text-xs mt-0.5">{record.date}</div>
            </div>
            <StatusBadge status={record.status} />
          </div>
        ))}
      </div>
    </div>
  );
};
