import React, { useState } from "react";
import {
  Smartphone,
  GraduationCap,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { StatsCard } from "../components/common/StatsCard";

// Pixel-perfect SVG Circular Progress Indicator matching progress page.png
const CircularProgress = ({ percentage }) => {
  if (percentage === 0) {
    return (
      <div className="flex items-center justify-center min-w-[38px] text-sm font-semibold select-none">
        0
      </div>
    );
  }

  const size = 38;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center select-none shrink-0"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="var(--theme-accent)"
          stroke="var(--theme-accent)"
          strokeWidth={strokeWidth}
        />
        {/* Active progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--theme-accent)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10.5px] font-bold">
        {percentage}%
      </span>
    </div>
  );
};

export const ProgressPage = () => {
  const { progressSummary, progressModules, toggleTopicCompletion } = useApp();

  // Expanded modules state: toggles accordion items (collapsed by default to match screenshot)
  const [expandedModules, setExpandedModules] = useState([]);

  const toggleModule = (id) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    if (expandedModules.length === progressModules.length) {
      setExpandedModules([]);
    } else {
      setExpandedModules(progressModules.map((m) => m.id));
    }
  };

  return (
    <div
      id="progress-page-container"
      className="space-y-4 animate-fade-in pb-10"
    >
      {/* 1. Top Metrics Cards matching progress page.png */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          id="stats-card-total-topics"
          value={progressSummary.totalTopics}
          label="Total Topics"
          icon={Smartphone}
        />

        <StatsCard
          id="stats-card-completed-topics"
          value={progressSummary.completedTopics}
          label="Completed Topics"
          icon={GraduationCap}
        />

        <StatsCard
          id="stats-card-pending-topics"
          value={progressSummary.pendingTopics}
          label="Pending Topics"
          icon={Clock}
        />
      </div>

      <div className="space-y-4">
        {progressModules.map((module) => {
          const isExpanded = expandedModules.includes(module.id);
          const isCompleted = module.percentage === 100;

          return (
            <div
              key={module.id}
              id={`module-card-${module.id}`}
              className="border rounded-2xl overflow-hidden transition-all shadow-sm"
            >
              {/* Module Header Bar */}
              <div
                onClick={() => toggleModule(module.id)}
                className="flex items-center justify-between p-5 cursor-pointer transition-colors select-none"
              >
                {/* Left: Status Icon & Title & Subtitle */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 ${
                      isCompleted ? "" : ""
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-base sm:text-[17px] font-bold tracking-normal leading-snug">
                      {module.title}
                    </h4>
                    <p className="text-xs mt-0.5 font-normal">
                      Topics: {module.topicsCompleted}/{module.totalTopics}
                    </p>
                  </div>
                </div>

                {/* Right: Round Progress Ring & Chevron */}
                <div className="flex items-center gap-3.5">
                  {/* Round Circular Progress Indicator */}
                  <div id={`module-progress-badge-${module.id}`}>
                    <CircularProgress percentage={module.percentage} />
                  </div>

                  <div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t">
                  <div className="text-xs font-semibold py-2.5">
                    Topics in {module.title}:
                  </div>

                  <div className="space-y-2">
                    {module.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 rounded-xl border transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopicCompletion(module.id, topic.name);
                            }}
                            className="p-1 rounded-lg  transition-transform active:scale-90 mt-0.5 shrink-0"
                            title={
                              topic.completed
                                ? "Click to mark as pending"
                                : "Click to mark as completed"
                            }
                          >
                            {topic.completed ? (
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            ) : (
                              <Clock className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div>
                              <div className="text-sm font-semibold leading-snug">
                                {topic.name}
                              </div>

                              {topic.date && (
                                <div className="text-[11px] mt-0.5">
                                  Completed: {topic.date}
                                </div>
                              )}
                            </div>

                            {/* Linked Assignments List */}
                            {topic.coveredIn && topic.coveredIn.length > 0 && (
                              <div className="mt-2 border border-l-3 rounded-xl py-4 space-y-1 text-xs">
                                {topic.coveredIn.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 px-3 "
                                  >
                                    <div className="w-1.5 h-1.5 bg-white  rounded-full"></div>
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
