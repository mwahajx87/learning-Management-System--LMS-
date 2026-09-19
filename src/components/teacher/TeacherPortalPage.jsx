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
import { useApp } from '../../context/AppContext';
import { useTeacher } from '../../context/TeacherContext';
import { TeacherStudentsTab } from './tabs/TeacherStudentsTab';
import { TeacherAttendanceTab } from './tabs/TeacherAttendanceTab';
import { TeacherAssignmentsTab } from './tabs/TeacherAssignmentsTab';
import { TeacherQuizzesTab } from './tabs/TeacherQuizzesTab';
import { TeacherProgressTab } from './tabs/TeacherProgressTab';
import { TeacherModals } from './modals/TeacherModals';

export const TeacherPortalPage = () => {
  // Teacher portal state (tabs)
  const { teacherActiveTab, setTeacherActiveTab } = useTeacher();

  // App-level state (feedback modal, role, toast)
  const {
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

      {/* Horizontal Tabs Navbar — large screens (lg+) only. On smaller screens
          this navbar and its active tab indicator are removed; the aside bar
          drawer (Sidebar trainer nav) is used for navigation instead. */}
      <div className="hidden lg:block border-b mb-6 overflow-x-auto scrollbar-none">
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
