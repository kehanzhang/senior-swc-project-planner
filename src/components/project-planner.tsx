"use client";

import React, { useState } from "react";
import { ProjectStep } from "@/components/project-step";
import { Step } from "@/lib/types/project";

export function ProjectPlanner({ projectData }: { projectData: Step[] }) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((step) => step !== stepNumber) : [...prev, stepNumber]
    );
    // Automatically collapse the step when it's checked
    setExpandedSteps((prev) => prev.filter((step) => step !== stepNumber));
  };

  const toggleExpand = (stepNumber: number) => {
    setExpandedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((step) => step !== stepNumber) : [...prev, stepNumber]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Project Planner</h1>
      {projectData.map((step) => (
        <ProjectStep
          key={step.step}
          step={step}
          completed={completedSteps.includes(step.step)}
          expanded={expandedSteps.includes(step.step)}
          onToggleStep={toggleStep}
          onToggleExpand={toggleExpand}
        />
      ))}
    </div>
  );
}
