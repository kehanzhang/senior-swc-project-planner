'use client';

import React, { useEffect, useState } from 'react';
import { useUserResponse } from '@/lib/contexts/UserResponseContext';
import { processUserResponses } from '@/lib/utils/processUserResponses';
import { SetupStep } from '@/components/setupstep';
import { ProjectData } from '@/components/project-data';

interface Section {
    step: number;
    title: string;
    description: string;
    videoLink: string;
    timestamps: string[];
}

export default function Response() {
    const { responses } = useUserResponse();
    const [guideContent, setGuideContent] = useState<Section[]>([]);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

    useEffect(() => {
        const processedResponses = processUserResponses(responses);
        const content = processedResponses.map((section, index) => ({
            step: index + 1,
            title: section.title,
            description: section.content || '',
            videoLink: section.videoLink || '',
            timestamps: section.timestamps || [],
        }));
        setGuideContent(content);
        // Initialize expandedSteps with all step numbers
        setExpandedSteps(content.map(section => section.step));
    }, [responses]);

    const toggleStep = (stepNumber: number) => {
        setCompletedSteps(prev =>
            prev.includes(stepNumber)
                ? prev.filter(step => step !== stepNumber)
                : [...prev, stepNumber]
        );
    };

    const toggleExpand = (stepNumber: number) => {
        setExpandedSteps(prev =>
            prev.includes(stepNumber)
                ? prev.filter(step => step !== stepNumber)
                : [...prev, stepNumber]
        );
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
            <h1 className="text-4xl font-bold mb-8">Setting up your project</h1>
            <div className="w-full max-w-3xl">
                {guideContent.map((section, index) => (
                    <SetupStep
                        key={index}
                        step={{ ...section, step: index + 1 }}
                        completed={completedSteps.includes(index + 1)}
                        expanded={expandedSteps.includes(index + 1)}
                        onToggleStep={toggleStep}
                        onToggleExpand={toggleExpand}
                    />
                ))}
            </div>
            <p className="text-4xl font-bold mb-8 py-2">Project roadmap</p>
            <ProjectData />
        </main>
    );
}
