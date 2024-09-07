'use client';

import React, { useEffect, useState } from 'react';
import { useUserResponse } from '@/lib/contexts/UserResponseContext';
import { processUserResponses } from '@/lib/utils/processUserResponses';
import { Step } from "@/lib/types/project";
import { ProjectStep } from "@/components/project-step";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/utils/variants";

export default function Response() {
    const { responses } = useUserResponse();
    const [guideContent, setGuideContent] = useState<Step[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

    useEffect(() => {
        const fetchGuideContent = async () => {
            try {
                setIsLoading(true);
                const processedResponses = await processUserResponses(responses);
                setGuideContent(processedResponses);
                setError(null);
            } catch (err) {
                console.error("Error processing responses:", err);
                setError("An error occurred while generating the guide. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchGuideContent();
    }, [responses]);

    const toggleStep = (stepNumber: number) => {
        setCompletedSteps((prev) =>
            prev.includes(stepNumber) ? prev.filter((step) => step !== stepNumber) : [...prev, stepNumber]
        );
    };

    const toggleExpand = (stepNumber: number) => {
        setExpandedSteps((prev) =>
            prev.includes(stepNumber) ? prev.filter((step) => step !== stepNumber) : [...prev, stepNumber]
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
            <h1 className="text-4xl font-bold mb-8">Your Project Setup Guide</h1>
            <div className="w-full max-w-3xl">
                {guideContent.length > 0 ? (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        <AnimatePresence>
                            {guideContent.map((step, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <ProjectStep
                                        step={{ ...step, step: index + 1 }}
                                        completed={completedSteps.includes(index + 1)}
                                        expanded={expandedSteps.includes(index + 1)}
                                        onToggleStep={toggleStep}
                                        onToggleExpand={toggleExpand}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <p>No guide content available. Please complete the questionnaire first.</p>
                )}
            </div>
        </main>
    );
}
