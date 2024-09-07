"use client";

import OutputConsole from "@/components/outputConsole";
import QuestionnaireStep from "@/components/QuestionnaireStep";

export default function ProjectDescription() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen relative">
      <div className="flex-grow flex items-center justify-center w-full">
        <QuestionnaireStep />
      </div>
      <div className="w-full flex justify-center mb-4">
        <OutputConsole />
      </div>
    </div>
  );
}
