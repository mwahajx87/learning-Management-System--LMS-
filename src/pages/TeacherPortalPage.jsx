import React from 'react';
import {
  Users,
  Calendar,
  FileText,
  CheckSquare,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Sparkles,
  ArrowLeftRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TeacherStudentsTab } from '../components/teacher/TeacherStudentsTab';
import { TeacherAttendanceTab } from '../components/teacher/TeacherAttendanceTab';
import { TeacherAssignmentsTab } from '../components/teacher/TeacherAssignmentsTab';
import { TeacherQuizzesTab } from '../components/teacher/TeacherQuizzesTab';
import { TeacherProgressTab } from '../components/teacher/TeacherProgressTab';
import { TeacherModals } from '../components/teacher/TeacherModals';

export const TeacherPortalPage = () => {
  const {
    teacherActiveTab,
    setTeacherActiveTab,
    setIsFeedbackOpen,
    setUserRole,
    showToast
  } = useApp();

  const tabs = [
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'quizzes', label: 'Quizzes', icon: CheckSquare },
    { id: 'progress', label: 'Course Progress', icon: BookOpen }
  ];

  const renderActiveTabContent = () => {
    switch (teacherActiveTab) {
      case 'students':
        return <TeacherStudentsTab />;
      case 'attendance':
        return <TeacherAttendanceTab />;
      case 'assignments':
        return <TeacherAssignmentsTab />;
      case 'quizzes':
        return <TeacherQuizzesTab />;
      case 'progress':
        return <TeacherProgressTab />;
      default:
        return <TeacherAssignmentsTab />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 pb-12 animate-fadeIn">
      {/* Course Title Banner */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Modern Web Application Development
          </h1>
          <div className="text-xs mt-0.5 font-medium">
            Trainer Portal • Batch 20 • Lead Faculty: S Muzammil Javed
          </div>
        </div>
      </div>

      {/* Horizontal Tabs Navigation (matching assignment.png, attendance.png, etc.) */}
      <div className="border-b mb-6 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 sm:gap-6 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = teacherActiveTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`teacher-tab-${tab.id}`}
                type="button"
                onClick={() => setTeacherActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-medium transition-all relative cursor-pointer ${
                  isActive
                    ? 'font-bold'
                    : ''
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? '' : ''
                  }`}
                />
                <span>{tab.label}</span>

                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab View Body */}
      <main id="teacher-portal-content" className="min-h-[500px]">
        {renderActiveTabContent()}
      </main>

      {/* Modals for assignments, student profile inspector, quiz bank */}
      <TeacherModals />
    </div>
  );
};
