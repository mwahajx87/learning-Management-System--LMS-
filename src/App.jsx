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
      {isTrainer ? (
        <div className="lg:hidden">
          <Sidebar />
        </div>
      ) : (
        <Sidebar />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        <div className="max-w-[1440px] w-full mx-auto px-2 sm:px-3 lg:px-4 flex flex-col min-h-full">
          {isTrainer ? (
            <>
              <TopBar />
              <TeacherPortalPage />
            </>
          ) : (
            <>
              <TopBar />

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

      <AssignmentViewModal />
      <SubmitAssignmentModal />
      <Toast />
    </div>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useApp();

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
