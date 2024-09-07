"use client";

import React, { useState } from "react";
import { ProjectStep } from "@/components/project-step";
import { Step } from "@/lib/types/project";
import { GenerateIdeaInput } from "@/components/GenerateIdeaInput";
import { LoadingSpinner } from "./LoadingSpinner";
import { AnimatedEllipsis } from "./AnimatedEllipsis";
import { generateSteps } from "@/app/actions/generateSteps";
import { readStreamableValue } from "ai/rsc";

export function ProjectPlanner() {
  const [projectData, setProjectData] = useState<Step[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSteps = async (idea: string) => {
    setIsGenerating(true);

    const { steps: stepsStream, loadingState } = await generateSteps(idea);

    for await (const steps of readStreamableValue(stepsStream)) {
      if (steps) {
        setProjectData(steps);
      }
    }
    for await (const loadingDelta of readStreamableValue(loadingState)) {
      if (loadingDelta) {
        setIsGenerating(loadingDelta.loading);
      }
    }
  };

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
    <div className="max-w-4xl mx-auto">
      <GenerateIdeaInput onGenerateSteps={handleGenerateSteps} isGenerating={isGenerating} />
      {projectData.length > 0 && (
        <>
          <h2 className="text-2xl font-bold my-6">Project Steps</h2>
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
          {isGenerating && (
            <div className="flex justify-center items-center">
              <LoadingSpinner />
              <span className="ml-2 text-sm text-gray-500">
                Generating more steps
                <AnimatedEllipsis />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
