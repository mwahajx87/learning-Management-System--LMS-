import React from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopBar = () => {
  const { activeNav, setActiveNav, courseDetails, setIsFeedbackOpen } = useApp();

  const getPageTitle = () => {
    switch (activeNav) {
      case 'dashboard':
        return null;
      case 'progress':
        return 'Progress';
      case 'attendance':
        return 'Attendance';
      case 'payment':
        return 'Payment';
      case 'assignment':
        return 'Assignment';
      case 'quiz':
        return 'Quiz';
      default:
        return null;
    }
  };

  const pageTitle = getPageTitle();

  return (
    <header
      id="top-bar-header"
      className="flex items-center justify-between px-0 pt-6 pb-4 select-none"
    >
      {/* Breadcrumbs navigation */}
      <nav
        id="topbar-breadcrumbs"
        aria-label="Breadcrumb"
        className="flex items-center text-[13.5px] font-normal overflow-x-auto"
      >
       
        <button
          onClick={() => setActiveNav('dashboard')}
          className=" transition-colors font-medium whitespace-nowrap border-none p-0 text-[13.5px] cursor-pointer "
        >
          {courseDetails.title}
        </button>
        {pageTitle && (
          <>
            <ChevronRight className="w-3.5 h-3.5 mx-2 shrink-0" />
            <span className="cursor-pointer font-semibold whitespace-nowrap">
              {pageTitle}
            </span>
          </>
        )}
      </nav>

      {/* Feedback Button */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          id="topbar-feedback-btn"
          onClick={() => setIsFeedbackOpen(true)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Feedback</span>
        </button>
      </div>
    </header>
  );
};
