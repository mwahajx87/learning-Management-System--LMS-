import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
import { DashboardPage } from "./pages/DashboardPage";
import { ProgressPage } from "./pages/ProgressPage";
import { AttendancePage } from "./pages/AttendancePage";
import { AssignmentPage } from "./pages/AssignmentPage";
import { QuizPage } from "./pages/QuizPage";
import { LoginPage } from "./pages/LoginPage";
import { TeacherPortalPage } from "./pages/TeacherPortalPage";
import { AssignmentViewModal } from "./components/modals/AssignmentViewModal";
import { SubmitAssignmentModal } from "./components/modals/SubmitAssignmentModal";
import { Toast } from "./components/common/Toast";

const AppContent = () => {
  const { isAuthenticated, activeNav, userRole } = useApp();

  // If not authenticated, render the dedicated Login Page
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        <Toast />
      </>
    );
  }

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
      <Sidebar />

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

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
