"use client";

import React, { useState } from "react";
import { ProjectStep } from "@/components/project-step";
import { Step } from "@/lib/types/project";
import { generateSteps } from "@/app/actions/generateSteps";
import { readStreamableValue } from "ai/rsc";
import { AnimatedEllipsis } from "@/components/AnimatedEllipsis";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function ProjectPlanner() {
  const [idea, setIdea] = useState("");
  const [projectData, setProjectData] = useState<Step[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setProjectData([]);
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

  const ellipsisVariants = {
    animate: {
      opacity: [0, 1, 1, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        times: [0, 0.25, 0.5, 0.75, 1],
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Enter your project idea..."
          className="w-full p-2 border rounded"
          rows={4}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Steps"}
        </button>
      </form>
      {projectData.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6">Project Steps</h2>
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
        </>
      )}
      {isGenerating && (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
          <span className="ml-2 text-sm text-gray-500">
            Generating more steps
            <AnimatedEllipsis />
          </span>
        </div>
      )}
    </div>
  );
}
