import React from "react";
import { GraduationCap } from "lucide-react";

export const SmitLogo = ({ size = "normal", showSubtitle = true }) => {
  const isLarge = size === "large";

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative flex items-center">
        <div
          className={`absolute ${
            isLarge ? "-top-5 -left-1" : "-top-3 left-0"
          } pointer-events-none transform -rotate-12`}
        >
          <GraduationCap
            className={`${
              isLarge ? "w-8 h-8" : "w-5 h-5"
            } text-accent-600 dark:text-accent-300`}
          />
        </div>

        <div
          className={`flex items-baseline font-black tracking-normal text-primary-500 dark:text-primary-400 ${
            isLarge ? "text-4xl" : "text-[15px]"
          }`}
          style={{ fontFamily: "'Signika', sans-serif" }}
        >
          <span>S</span>
          <span>M</span>
          <span>I</span>
          <span>T</span>
        </div>
      </div>

      {showSubtitle && (
        <span
          className={`font-bold tracking-[0.18em] uppercase text-muted ${
            isLarge ? "text-[9px] mt-1" : "text-[7px] mt-0.5"
          }`}
        >
          Saylani Mass IT Training
        </span>
      )}
    </div>
  );
};
