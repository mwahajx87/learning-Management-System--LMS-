import React from "react";

export const StatusBadge = ({ status, className = "" }) => {
  const normalized = (status || "").toUpperCase();

  switch (normalized) {
    case "APPROVED":
      return (
        <span
          id="badge-approved"
          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-accent-400/40 bg-accent-400/10 text-accent-600 dark:text-accent-300 ${className}`}
        >
          APPROVED
        </span>
      );

    case "SUBMITTED":
      return (
        <span
          id="badge-submitted"
          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-info-400/40 bg-info-400/10 text-info-600 dark:text-info-300 ${className}`}
        >
          SUBMITTED
        </span>
      );

    case "NOT SUBMITTED":
      return (
        <span
          id="badge-not-submitted"
          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-primary-400/40 bg-primary-400/15 text-primary-600 dark:text-primary-300 ${className}`}
        >
          NOT SUBMITTED
        </span>
      );

    case "PRESENT":
      return (
        <span
          id="badge-present"
          className={`inline-flex items-center justify-center px-3.5 py-1 rounded-md text-xs font-semibold tracking-wider uppercase border border-accent-400/40 bg-accent-400/10 text-accent-600 dark:text-accent-300 ${className}`}
        >
          PRESENT
        </span>
      );

    case "ABSENT":
      return (
        <span
          id="badge-absent"
          className={`inline-flex items-center justify-center px-3.5 py-1 rounded-md text-xs font-semibold tracking-wider uppercase border border-primary-400/40 bg-primary-400/15 text-primary-600 dark:text-primary-300 ${className}`}
        >
          ABSENT
        </span>
      );

    case "LEAVE":
      return (
        <span
          id="badge-leave"
          className={`inline-flex items-center justify-center px-3.5 py-1 rounded-md text-xs font-semibold tracking-wider uppercase border border-warning-400/40 bg-warning-400/10 text-warning-600 dark:text-warning-300 ${className}`}
        >
          LEAVE
        </span>
      );

    case "PAID":
      return (
        <span
          id="badge-paid"
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-accent-400/40 bg-accent-400/10 text-accent-600 dark:text-accent-300 ${className}`}
        >
          PAID
        </span>
      );

    case "PASSED":
      return (
        <span
          id="badge-passed"
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border border-accent-400/40 bg-accent-400/10 text-accent-600 dark:text-accent-300 ${className}`}
        >
          PASSED
        </span>
      );

    case "HACKATHON":
      return (
        <span
          id="badge-hackathon"
          className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border border-warning-400/50 bg-warning-400/10 text-warning-600 dark:text-warning-300 ${className}`}
        >
          HACKATHON
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-secondary-300/70 dark:border-secondary-600/60 bg-secondary-100 dark:bg-secondary-800/40 text-muted ${className}`}
        >
          {status}
        </span>
      );
  }
};
