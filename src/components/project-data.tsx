import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectStep } from "@/components/project-step";
import { LoadingSpinner } from "./LoadingSpinner";
import { AnimatedEllipsis } from "./AnimatedEllipsis";
import { useUserResponse } from "@/lib/contexts/UserResponseContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

export function ProjectData() {
  const { responses } = useUserResponse();
  const isGenerating = responses.isLoading;
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
    <>
      <h2 className="text-2xl font-bold my-6">Project Steps</h2>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <AnimatePresence>
          {responses.projectData.map((step) => (
            <motion.div key={step.step} variants={itemVariants}>
              <ProjectStep
                step={step}
                completed={completedSteps.includes(step.step)}
                expanded={expandedSteps.includes(step.step)}
                onToggleStep={toggleStep}
                onToggleExpand={toggleExpand}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
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
  );
}
