import React from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink, CalendarDays, Award } from 'lucide-react';

export const SubTabsWidget = () => {
  const {
    dashboardSubTab,
    setDashboardSubTab,
    assignments,
    quizzes,
    setSelectedAssignment,
    setSelectedQuiz,
    setActiveNav
  } = useApp();

  const tabs = [
    { id: 'assignments', label: 'Assignments' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'events', label: 'Events' }
  ];

  return (
    <div
      id="dashboard-subtabs-widget"
      className="border rounded-2xl p-4"
    >
      {/* Segmented Tab Headers */}
      <div className="flex items-center justify-between p-1 rounded-xl mb-4">
        {tabs.map((tab) => {
          const isActive = dashboardSubTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-toggle-${tab.id}`}
              onClick={() => setDashboardSubTab(tab.id)}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-lg transition-all text-center ${
                isActive
                  ? ' shadow-sm font-semibold'
                  : ''
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Areas */}
      <div className="min-h-[135px] flex items-center justify-center text-center">
        {dashboardSubTab === 'quizzes' && (
          <div className="w-full flex flex-col items-center justify-center py-2">
            <p className="text-sm font-normal">
              No upcoming quizzes
            </p>
            <button
              onClick={() => setActiveNav('quizzes')}
              className="mt-2.5 text-xs font-semibold flex items-center gap-1"
            >
              <span>View Past Quiz Results ({quizzes.length})</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}

        {dashboardSubTab === 'assignments' && (
          <div className="w-full text-left space-y-2">
            {assignments.slice(0, 2).map((asg) => (
              <div
                key={asg.id}
                onClick={() => setSelectedAssignment(asg)}
                className="p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all"
              >
                <div className="overflow-hidden pr-2">
                  <div className="text-xs font-semibold truncate">
                    {asg.title}
                  </div>
                  <div className="text-[11px] mt-0.5">
                    Due: {asg.dueDate}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </div>
            ))}
          </div>
        )}

        {dashboardSubTab === 'events' && (
          <div className="w-full text-left space-y-2">
            <div className="p-2.5 rounded-xl border">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Next Class Session</span>
              </div>
              <p className="text-xs mt-1">
                Advanced React & Architecture
              </p>
              <span className="text-[10px]">
                Friday, 01:00 PM - 03:00 PM (Gulshan Lab 2)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
