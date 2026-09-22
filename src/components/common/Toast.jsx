import React from "react";
import { CheckCircle, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const Toast = () => {
  const { toastMessage, setToastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div
      id="app-toast-alert"
      className="fixed z-50 top-4 left-1/2 w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-surface/95 px-4 py-3 shadow-2xl backdrop-blur-sm animate-fade-in transition-all sm:left-auto sm:right-4 sm:top-6 sm:max-w-xs sm:translate-x-0"
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 shrink-0 text-accent-600 dark:text-accent-300" />
        <span className="min-w-0 flex-1 text-sm font-medium break-words">
          {toastMessage}
        </span>
        <button
          id="toast-close-btn"
          onClick={() => setToastMessage(null)}
          className="ml-1 shrink-0 rounded p-1 transition-colors hover:bg-secondary-900/5 dark:hover:bg-white/5"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
