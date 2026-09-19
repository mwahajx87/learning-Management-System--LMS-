import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Layout,
  BookOpen,
  Calendar,
  Check,
} from "lucide-react";
import { useStudent } from "../../../context/StudentContext";
import { useTeacher } from "../../../context/TeacherContext";

export const TeacherProgressTab = () => {
  const { progressModules, toggleTopicCompletion } = useStudent();
  const { teacherTrainer } = useTeacher();
  const [expandedModules, setExpandedModules] = useState({
    "mod-1": false,
    "mod-2": false,
    "mod-3": false,
    "mod-4": false,
  });
  const [filterMode, setFilterMode] = useState("all"); // 'all' | 'mine'

  const toggleAccordion = (id) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const CircularProgress = ({ percentage, color = "var(--theme-accent)" }) => {
    const size = 52;
    const strokeWidth = 4.5;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="var(--theme-accent)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={percentage === 100 ? "var(--theme-success)" : color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className="absolute text-[11px] font-bold">{percentage}%</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="border rounded-xl p-4 sm:p-5">
        <div className="text-[11px] uppercase tracking-wider font-bold mb-1">
          COURSE PROGRESS
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-1">
          <h2 className="text-base sm:text-lg font-bold">
            Course Progress Overview
          </h2>
          <button
            type="button"
            onClick={() =>
              setFilterMode((prev) => (prev === "mine" ? "all" : "mine"))
            }
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              filterMode === "mine" ? "" : ""
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>
              {filterMode === "mine"
                ? "Viewing: Only My Progress"
                : "Only My Progress"}
            </span>
          </button>
        </div>
      </div>

      <div className="border rounded-xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider mb-1">
              MY PROGRESS
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold">
                {teacherTrainer.name} - {teacherTrainer.campus}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold border">
                {teacherTrainer.batch}
              </span>
            </div>
            <div className="text-xs mt-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{teacherTrainer.schedule}</span>
            </div>
          </div>

          <div className="self-start sm:self-center">
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border shadow-sm">
              Topics: 56/81
            </span>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-5 mb-6">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-medium">Overall progress</span>
            <span className="font-bold text-sm">69%</span>
          </div>
          <div className="w-full h-2.5 rounded-full overflow-hidden border">
            <div
              className="h-full bg-white rounded-full transition-all duration-700 ease-out"
              style={{ width: "69%" }}
            />
          </div>
        </div>

        {/* Modules Accordion List */}
        <div className="flex flex-col gap-3.5">
          {progressModules.map((mod) => {
            const isExpanded = !!expandedModules[mod.id];
            const isComplete = mod.percentage === 100;

            return (
              <div
                key={mod.id}
                className="border rounded-xl overflow-hidden transition-all duration-200"
              >
                {/* Module Header Bar */}
                <div
                  onClick={() => toggleAccordion(mod.id)}
                  className="p-4 sm:p-4.5 flex items-center justify-between cursor-pointer transition-colors select-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Status Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                        isComplete ? "" : mod.percentage > 0 ? "" : ""
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold tracking-wide truncate">
                        {mod.title}
                      </h4>
                      <div className="text-xs mt-0.5">
                        Topics: {mod.topicsCompleted}/{mod.totalTopics}
                      </div>
                    </div>
                  </div>

                  {/* Circular Ring + Chevron */}
                  <div className="flex items-center gap-4">
                    <CircularProgress percentage={mod.percentage} />
                    <div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Collapsible Topics Content */}
                {isExpanded && (
                  <div className="border-t p-4">
                    <div className="text-xs mb-3 flex items-center justify-between">
                      <span>Click checkbox to update topic completion:</span>
                      <span className="text-[11px]">
                        {mod.topicsCompleted} of {mod.totalTopics} covered
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mod.topics &&
                        mod.topics.map((tpc, idx) => (
                          <div
                            key={idx}
                            onClick={() => toggleTopicCompletion(mod.id, tpc.name)}
                            className={`flex items-start gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer ${
                              tpc.completed ? "" : ""
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                                tpc.completed ? "" : ""
                              }`}
                            >
                              {tpc.completed && (
                                <Check className="w-3 h-3 stroke-3" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div
                                className={`text-xs font-medium leading-tight ${
                                  tpc.completed ? "" : ""
                                }`}
                              >
                                {tpc.name}
                              </div>
                              {tpc.coveredIn && tpc.coveredIn.length > 0 && (
                                <div className="text-[10px] mt-1 truncate">
                                  Covered in: {tpc.coveredIn.join(", ")}
                                </div>
                              )}
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
    </div>
  );
};
