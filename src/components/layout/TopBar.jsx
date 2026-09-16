import React from 'react';
import { MessageSquare, ChevronRight, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopBar = () => {
  const {
    activeNav,
    setActiveNav,
    courseDetails,
    setIsFeedbackOpen,
    setIsMobileSidebarOpen
  } = useApp();

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
      className="flex items-center justify-between gap-3 px-0 pt-4 sm:pt-6 pb-4 select-none"
    >
      {/* Mobile Hamburger (opens sidebar drawer) */}
      <button
        id="mobile-menu-open-btn"
        type="button"
        onClick={() => setIsMobileSidebarOpen(true)}
        className="lg:hidden p-2 -ml-2 rounded-lg border transition-colors cursor-pointer shrink-0"
        title="Open navigation menu"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumbs navigation */}
      <nav
        id="topbar-breadcrumbs"
        aria-label="Breadcrumb"
        className="flex items-center text-[13.5px] font-normal min-w-0 flex-1"
      >
       
        <button
          onClick={() => setActiveNav('dashboard')}
          className="transition-colors font-medium whitespace-nowrap border-none p-0 text-[13.5px] cursor-pointer overflow-hidden text-ellipsis truncate max-w-[46vw] sm:max-w-none"
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
          className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Feedback</span>
        </button>
      </div>
    </header>
  );
};
