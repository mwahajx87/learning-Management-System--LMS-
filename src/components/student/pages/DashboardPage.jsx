import React from 'react';
import { Clock, GraduationCap } from 'lucide-react';
import { useStudent } from '../../../context/StudentContext';
import { StatsCard } from '../../common/StatsCard';
import { CourseCard } from '../widgets/CourseCard';
import { ScheduleWidget } from '../widgets/ScheduleWidget';
import { SubTabsWidget } from '../widgets/SubTabsWidget';
import { FeeTable } from '../widgets/FeeTable';

export const DashboardPage = () => {
  const {
    attendanceSummary,
    assignments,
    setActiveNav
  } = useStudent();

  const submittedAssignmentsCount = assignments.filter(
    (a) => a.status === 'SUBMITTED' || a.status === 'APPROVED'
  ).length;

  return (
    <div id="dashboard-page-container" className="pb-10 animate-fade-in">
      {/* 2-Column Parent Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Top Metrics Summary Cards: Attendance & Assignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setActiveNav('attendance')}
              className="cursor-pointer transition-transform hover:-translate-y-0.5"
              title="Click to view Attendance details"
            >
              <StatsCard
                id="stats-card-attendance"
                value={`${attendanceSummary.present}/${attendanceSummary.totalClasses}`}
                label="Attendance"
                icon={Clock}
               
               
              />
            </div>

            <div
              onClick={() => setActiveNav('assignment')}
              className="cursor-pointer transition-transform hover:-translate-y-0.5"
              title="Click to view Assignments"
            >
              <StatsCard
                id="stats-card-assignment"
                value={`${submittedAssignmentsCount}/${assignments.length}`}
                label="Assignment"
                icon={GraduationCap}
               
               
              />
            </div>
          </div>

          {/* Active Course Section */}
          <div>
            <h3 className="text-lg font-bold tracking-normal mb-3">
              Active Course
            </h3>
            <CourseCard />
          </div>

          <FeeTable />
        </div>

        {/* Right Column (Span 4): Class Schedule & Subtabs */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <ScheduleWidget />
          <SubTabsWidget />
        </div>
      </div>
    </div>
  );
};
