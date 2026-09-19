import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [portalMode, setPortalMode] = useState("student"); // 'student' | 'trainer'
  const [userRole, setUserRole] = useState("student"); // 'student' | 'trainer'

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  // Course Details (shared by both portals)
  const courseDetails = {
    title: "Modern Web Application Development",
    status: "ENROLLED",
    schedule: [
      "Mon 01:00 PM - 03:00 PM",
      "Wed 01:00 PM - 03:00 PM",
      "Fri 01:00 PM - 03:00 PM",
    ],
    progressPercentage: 73,
    batch: "20",
    roll: "772401",
    campus: "Zaitoon Ashraf IT Park",
    city: "Karachi",
  };

  // Shared UI State
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile Modal
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Helper functions
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const copyToClipboard = (text, label = "Copied") => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  const login = (role = "student", credentials = {}) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast("Logged out successfully");
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        portalMode,
        setPortalMode,
        userRole,
        setUserRole,
        login,
        logout,
        sidebarCollapsed,
        setSidebarCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        closeMobileSidebar,
        courseDetails,
        isProfileOpen,
        setIsProfileOpen,
        isFeedbackOpen,
        setIsFeedbackOpen,
        toastMessage,
        setToastMessage,
        showToast,
        copyToClipboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  return context;
};