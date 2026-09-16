import React from 'react';

export const StatusBadge = ({ status, className = '' }) => {
  const normalized = (status || '').toUpperCase();

  switch (normalized) {
    case 'APPROVED':
      return (
        <span
          id="badge-approved"
          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase border ${className}`}
        >
          APPROVED
        </span>
      );

    case 'SUBMITTED':
      return (
        <span
          id="badge-submitted"
          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase border ${className}`}
        >
          SUBMITTED
        </span>
      );

    case 'NOT SUBMITTED':
      return (
        <span
          id="badge-not-submitted"
          className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase border ${className}`}
        >
          NOT SUBMITTED
        </span>
      );

    case 'PRESENT':
      return (
        <span
          id="badge-present"
          className={`inline-flex items-center justify-center px-3.5 py-1 rounded-md text-xs font-semibold tracking-wider uppercase border ${className}`}
        >
          PRESENT
        </span>
      );

    case 'ABSENT':
      return (
        <span
          id="badge-absent"
          className={`inline-flex items-center justify-center px-3.5 py-1 rounded-md text-xs font-semibold tracking-wider uppercase border ${className}`}
        >
          ABSENT
        </span>
      );

    case 'LEAVE':
      return (
        <span
          id="badge-leave"
          className={`inline-flex items-center justify-center px-3.5 py-1 rounded-md text-xs font-semibold tracking-wider uppercase border ${className}`}
        >
          LEAVE
        </span>
      );

    case 'PAID':
      return (
        <span
          id="badge-paid"
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider border ${className}`}
        >
          PAID
        </span>
      );

    case 'PASSED':
      return (
        <span
          id="badge-passed"
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border ${className}`}
        >
          PASSED
        </span>
      );

    case 'HACKATHON':
      return (
        <span
          id="badge-hackathon"
          className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border ${className}`}
        >
          HACKATHON
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${className}`}
        >
          {status}
        </span>
      );
  }
};
