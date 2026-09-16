import React from 'react';

export const StatsCard = ({
  id,
  value,
  label,
  icon: Icon,
  iconColor = '',
  iconBg = ''
}) => {
  return (
    <div
      id={id || `stats-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className="border rounded-2xl p-6 flex items-center justify-between"
    >
      <div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight">
          {value}
        </div>
        <div className="text-sm font-normal mt-1.5">
          {label}
        </div>
      </div>

      {Icon && (
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border ${iconBg} ${iconColor} shrink-0`}
        >
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};
