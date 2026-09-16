import React from "react";
import { Hash, User, MapPin, Navigation } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const CourseCard = () => {
  const { courseDetails } = useApp();

  return (
    <div
      id="active-course-banner-card"
      className="border rounded-2xl overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center  justify-between gap-3 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight break-words min-w-0">
            {courseDetails.title}
          </h2>
          <span
            id="badge-enrolled"
            className="px-2.5 py-0.5 text-xs font-semibold tracking-wider rounded-md border uppercase"
          >
            {courseDetails.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-5">
          {courseDetails.schedule.map((timing, idx) => (
            <div
              key={idx}
              className="px-3.5 py-1.5 rounded-lg border text-xs font-normal"
            >
              {timing}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-300" />
      <div className="px-4 sm:px-6 py-4 sm:py-5">
        <div className="mb-6 flex flex-col gap-5">
          <div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span>Progress</span>
              <span className="font-medium ">
                {courseDetails.progressPercentage}% Completed
              </span>
            </div>
            <div className="w-full h-2 border rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${courseDetails.progressPercentage}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
            <div className="flex items-center gap-2">
              <Hash className="w-3.5 h-3.5" />
              <div>
                <span className="font-semibold">Batch: </span>
                <span>{courseDetails.batch}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <div>
                <span className="font-semibold">Roll: </span>
                <span>{courseDetails.roll}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <div className="truncate">
                <span className="font-semibold">Campus: </span>
                <span>{courseDetails.campus}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5" />
              <div>
                <span className="font-semibold">City: </span>
                <span>{courseDetails.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
