import React, { useEffect } from "react";
import {
  LayoutGrid,
  BookOpen,
  CalendarCheck,
  CreditCard,
  FileText,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LogOut,
  Users,
  Calendar,
  ArrowLeftRight,
  X,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useStudent } from "../../context/StudentContext";
import { useTeacher } from "../../context/TeacherContext";
import avatarImg from "../../assets/images/student_avatar_1789503254707.jpg";
import { SmitLogo } from "./SmitLogo";

export const Sidebar = () => {
  // App-level state (auth, role, sidebar, toast, profile modal)
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    isMobileSidebarOpen,
    closeMobileSidebar,
    setIsProfileOpen,
    logout,
    userRole,
    setUserRole,
    showToast,
  } = useApp();

  // Student portal state
  const { activeNav, setActiveNav, student } = useStudent();

  // Teacher portal state
  const { teacherTrainer, teacherActiveTab, setTeacherActiveTab } =
    useTeacher();

  // Close the mobile drawer with the Escape key
  useEffect(() => {
    if (!isMobileSidebarOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMobileSidebar();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileSidebarOpen, closeMobileSidebar]);

  const studentNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "progress", label: "Progress", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: CalendarCheck },
    { id: "assignment", label: "Assignment", icon: FileText },
    { id: "quiz", label: "Quiz", icon: CheckSquare },
  ];

  const trainerNavItems = [
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "students", label: "Students", icon: Users },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "quizzes", label: "Quizzes", icon: CheckSquare },
    { id: "progress", label: "Course Progress", icon: BookOpen },
  ];

  const isTrainer = userRole === "trainer";

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        id="mobile-sidebar-backdrop"
        onClick={closeMobileSidebar}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileSidebarOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        id="main-sidebar"
        className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-30 flex flex-col justify-between h-dvh shrink-0 select-none border-r bg-[#0d0f13] transition-all duration-300 ease-in-out ${
          isMobileSidebarOpen
            ? "translate-x-0 w-[262px]"
            : "-translate-x-full w-[262px]"
        } lg:translate-x-0 ${sidebarCollapsed ? "lg:w-20" : "lg:w-[230px]"}`}
      >
        {/* Brand Header */}
        <div>
          <div className="flex items-center justify-between px-5 pt-6 pb-4">
            <div className="flex items-center lg:hidden">
              <SmitLogo size="normal" showSubtitle={true} />
            </div>

            {/* Brand: expands/collapses on desktop */}
            <div className="hidden lg:block">
              {sidebarCollapsed ? (
                <div className="mx-auto flex flex-col items-center">
                  <SmitLogo size="normal" showSubtitle={false} />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <SmitLogo size="large" showSubtitle={true} />
                </div>
              )}
            </div>

            {/* Mobile close button */}
            <button
              id="sidebar-close-mobile-btn"
              onClick={closeMobileSidebar}
              className="p-1.5 rounded-md transition-colors cursor-pointer lg:hidden"
              title="Close menu"
              aria-label="Close navigation menu"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {/* Desktop collapse toggle */}
            <button
              id="sidebar-toggle-btn"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-1 rounded-md transition-colors cursor-pointer"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

        {/* Portal Mode Tag */}

        {/* Navigation Items */}
        <nav className="px-3.5 space-y-1 mt-2 text">
          {isTrainer
            ? trainerNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = teacherActiveTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`trainer-nav-${item.id}`}
                    onClick={() => {
                      setTeacherActiveTab(item.id);
                      closeMobileSidebar();
                    }}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? " border shadow-sm"
                        : ""
                    } ${sidebarCollapsed ? "lg:justify-center lg:px-0" : ""}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "" : ""
                      }`}
                    />
                    <span className={`tracking-wide text-[13.5px] ${sidebarCollapsed ? "lg:hidden" : ""}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })
            : studentNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => {
                      setActiveNav(item.id);
                      closeMobileSidebar();
                    }}
                    className={`w-full flex items-center gap-3.5 px-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? " border shadow-sm"
                        : ""
                    } ${sidebarCollapsed ? "lg:justify-center lg:px-0" : ""}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 ${
                        isActive ? "" : ""
                      }`}
                    />
                    <span className={`tracking-wide text-[14px] ${sidebarCollapsed ? "lg:hidden" : ""}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
        </nav>
      </div>

      {/* User Profile Footer & Portal Switcher */}
      <div className="px-3 py-3.5 pb-4 border-t flex flex-col gap-2">
        {/* Profile Card */}
        <div
          id="sidebar-user-profile"
          onClick={() => {
            setIsProfileOpen && setIsProfileOpen(true);
            closeMobileSidebar();
          }}
          className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${
            sidebarCollapsed ? "lg:justify-center" : "lg:justify-between"
          }`}
          title={isTrainer ? "View Faculty Details" : "View Student Profile"}
        >
          <div className={`truncate min-w-0 ${sidebarCollapsed ? "lg:hidden" : ""}`}>
            <div className="font-semibold text-[14px] tracking-wide truncate">
              {isTrainer ? teacherTrainer.name : student.name}
            </div>
            <div className="text-[11px] truncate">
              {isTrainer
                ? "Lead Faculty"
                : student.rollNumber || student.rollNo}
            </div>
          </div>

          <div className="relative shrink-0">
            <img
              src={
                isTrainer
                  ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  : avatarImg
              }
              alt={isTrainer ? teacherTrainer.name : student.name}
              className="w-9 h-9 rounded-full object-cover border"
            />
          </div>
        </div>

        {/* Quick Log out */}
        <button
          id="sidebar-logout-btn"
          type="button"
          onClick={() => {
            logout();
            closeMobileSidebar();
          }}
          className={`flex border items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            sidebarCollapsed ? "lg:justify-center" : ""
          }`}
          title="Log out of SMIT Portal"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span className={sidebarCollapsed ? "lg:hidden" : ""}>Log Out</span>
        </button>
      </div>
      </aside>
    </>
  );
};
