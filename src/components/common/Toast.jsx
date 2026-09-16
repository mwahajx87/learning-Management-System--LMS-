import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toastMessage, setToastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div
      id="app-toast-alert"
      className="fixed z-50 bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm bg-[#0d0f13] flex items-center gap-3 px-4 py-3 border rounded-xl shadow-2xl animate-fade-in transition-all"
    >
      <CheckCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm font-medium break-words min-w-0">
        {toastMessage}
      </span>
      <button
        id="toast-close-btn"
        onClick={() => setToastMessage(null)}
        className="ml-2 p-1 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
