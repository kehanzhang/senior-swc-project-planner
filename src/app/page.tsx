'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ProjectStep } from "@/components/project-step";
import { Step } from "@/lib/types/project";
import { useUserResponse } from '@/lib/contexts/UserResponseContext';
import { processUserResponses } from '@/lib/utils/processUserResponses';
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AnimatedEllipsis } from "@/components/AnimatedEllipsis";
import { containerVariants, itemVariants } from "@/lib/utils/variants";
import OutputConsole from '@/components/outputConsole';
import QuestionnaireStep from '@/components/QuestionnaireStep';

export default function ProjectDescription() {
  const [step, setStep] = useState(0);
  const [trail, setTrail] = useState<number[]>([]);
  const [setupSteps, setSetupSteps] = useState<Step[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { responses } = useUserResponse();

  useEffect(() => {
    const generateSetupSteps = async () => {
      setIsGenerating(true);
      const allSteps = await processUserResponses(responses);

      const revealSteps = async () => {
        for (let i = 0; i < allSteps.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setSetupSteps((prevSteps) => [...prevSteps, allSteps[i]]);
          setCurrentStepIndex(i + 1);
        }
        setIsGenerating(false);
      };

      revealSteps();
    };

    if (Object.keys(responses).length > 0) {
      generateSetupSteps();
    }
  }, [responses]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((step) => step !== stepNumber) : [...prev, stepNumber]
    );
    setExpandedSteps((prev) => prev.filter((step) => step !== stepNumber));
  };

  const toggleExpand = (stepNumber: number) => {
    setExpandedSteps((prev) =>
      prev.includes(stepNumber) ? prev.filter((step) => step !== stepNumber) : [...prev, stepNumber]
    );
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen relative">
      <div className="flex-grow flex items-center justify-center w-full">
        <QuestionnaireStep
          index={step}
          setIndex={setStep}
          trail={trail}
          setTrail={setTrail}
        />
      </div>
      {setupSteps.length > 0 && (
        <div className="w-full max-w-4xl mx-auto mt-8">
          <h2 className="text-2xl font-bold my-6">Setup Steps</h2>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <AnimatePresence>
              {setupSteps.map((step) => (
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
                Generating setup steps ({currentStepIndex}/{setupSteps.length})
                <AnimatedEllipsis />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="w-full flex justify-center mb-4">
        <OutputConsole />
      </div>
    </div>
  );
}