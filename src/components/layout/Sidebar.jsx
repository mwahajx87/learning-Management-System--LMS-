import React from "react";
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
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import avatarImg from "../../assets/images/student_avatar_1789503254707.jpg";
import { SmitLogo } from "../common/SmitLogo";

export const Sidebar = () => {
  const {
    activeNav,
    setActiveNav,
    sidebarCollapsed,
    setSidebarCollapsed,
    student,
    teacherTrainer,
    teacherActiveTab,
    setTeacherActiveTab,
    setIsProfileOpen,
    logout,
    userRole,
    setUserRole,
    showToast,
  } = useApp();

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
    <aside
      id="main-sidebar"
      className={`relative flex flex-col justify-between h-screen transition-all duration-300 z-30 shrink-0 select-none border-r ${
        sidebarCollapsed ? "w-20" : "w-[230px]"
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="flex items-center  justify-between px-5 pt-6 pb-4">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2">
              <SmitLogo size="normal" showSubtitle={true} />
            </div>
          ) : (
            <div className="mx-auto flex flex-col items-center">
              <SmitLogo size="normal" showSubtitle={false} />
            </div>
          )}

          <button
            id="sidebar-toggle-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-md transition-colors cursor-pointer"
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
                    onClick={() => setTeacherActiveTab(item.id)}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? " border shadow-sm"
                        : ""
                    } ${sidebarCollapsed ? "justify-center px-0" : ""}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "" : ""
                      }`}
                    />
                    {!sidebarCollapsed && (
                      <span className="tracking-wide text-[13.5px]">
                        {item.label}
                      </span>
                    )}
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
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3.5 px-1.5 py-2.5 rounded-xl text-xl font-medium transition-colors cursor-pointer ${
                      isActive
                        ? " border shadow-sm"
                        : ""
                    } ${sidebarCollapsed ? "justify-center px-0" : ""}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 ${
                        isActive ? "" : ""
                      }`}
                    />
                    {!sidebarCollapsed && (
                      <span className="tracking-wide text-[14px]">
                        {item.label}
                      </span>
                    )}
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
          onClick={() => setIsProfileOpen && setIsProfileOpen(true)}
          className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${
            sidebarCollapsed ? "justify-center" : "justify-between"
          }`}
          title={isTrainer ? "View Faculty Details" : "View Student Profile"}
        >
          {!sidebarCollapsed && (
            <div className="truncate min-w-0">
              <div className="font-semibold text-[14px] tracking-wide truncate">
                {isTrainer ? teacherTrainer.name : student.name}
              </div>
              <div className="text-[11px] truncate">
                {isTrainer
                  ? "Lead Faculty"
                  : student.rollNumber || student.rollNo}
              </div>
            </div>
          )}

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
          onClick={logout}
          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            sidebarCollapsed ? "justify-center" : ""
          }`}
          title="Log out of SMIT Portal"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {!sidebarCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};
