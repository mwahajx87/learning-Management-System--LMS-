import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { StudentProvider, useStudent } from "./context/StudentContext";
import { TeacherProvider } from "./context/TeacherContext";
import { Sidebar } from "./components/common/Sidebar";
import { TopBar } from "./components/common/TopBar";
import { Toast } from "./components/common/Toast";
import { LoginPage } from "./components/common/LoginPage";
import { DashboardPage } from "./components/student/pages/DashboardPage";
import { ProgressPage } from "./components/student/pages/ProgressPage";
import { AttendancePage } from "./components/student/pages/AttendancePage";
import { AssignmentPage } from "./components/student/pages/AssignmentPage";
import { QuizPage } from "./components/student/pages/QuizPage";
import { AssignmentViewModal } from "./components/student/modals/AssignmentViewModal";
import { SubmitAssignmentModal } from "./components/student/modals/SubmitAssignmentModal";
import { TeacherPortalPage } from "./components/teacher/TeacherPortalPage";

// ============================================================
//  Portal Layout (rendered inside Student + Teacher providers
//  so both contexts are available to the layout & views)
// ============================================================
const PortalLayout = () => {
  const { userRole } = useApp();
  const { activeNav } = useStudent();

  const renderActiveView = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardPage />;
      case "progress":
        return <ProgressPage />;
      case "attendance":
        return <AttendancePage />;
      case "assignment":
        return <AssignmentPage />;
      case "quiz":
      case "quizzes":
        return <QuizPage />;
      default:
        return <DashboardPage />;
    }
  };

  const isTrainer = userRole === "trainer";

  return (
    <div className="flex h-dvh w-screen overflow-hidden font-sans select-text">
      {/* Left Navigation Sidebar */}
      {/* Trainer: the aside bar is removed on large screens (lg+) — the horizontal
          navbar tabs in TeacherPortalPage act as the navbar there. On smaller
          screens the aside bar remains as the off-canvas drawer.
          Students keep the default sidebar behavior on all screen sizes. */}
      {isTrainer ? (
        <div className="lg:hidden">
          <Sidebar />
        </div>
      ) : (
        <Sidebar />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-full">
          {isTrainer ? (
            <>
            <TopBar />
            <TeacherPortalPage />
            </>
          ) : (
            <>
              {/* Top Header & Breadcrumbs */}
              <TopBar />

              {/* Scrollable Page Canvas */}
              <main
                id="main-app-content-viewport"
                className="flex-1 w-full pt-1 pb-10"
              >
                {renderActiveView()}
              </main>
            </>
          )}
        </div>
      </div>

      {/* Interactive Modals and Toasts */}
      <AssignmentViewModal />
      <SubmitAssignmentModal />
      <Toast />
    </div>
  );
};

// ============================================================
//  App Content — gates authentication and provides the
//  role-scoped contexts around the portal layout
// ============================================================
const AppContent = () => {
  const { isAuthenticated } = useApp();

  // If not authenticated, render the dedicated Login Page
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        <Toast />
      </>
    );
  }

  return (
    <StudentProvider>
      <TeacherProvider>
        <PortalLayout />
      </TeacherProvider>
    </StudentProvider>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}