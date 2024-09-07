"use client";

import React, { useEffect, useState } from "react";
import { useUserResponse } from "@/lib/contexts/UserResponseContext";
import { processUserResponses } from "@/lib/utils/processUserResponses";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { parseTimestamp } from "@/lib/utils/timeUtils";
import { ProjectData } from "@/components/project-data";
import { useRouter } from "next/navigation";

interface Section {
    title: string;
    content?: string;
    videoLink?: string;
    timestamps?: string[];
}

export default function Response() {
    const { responses } = useUserResponse();
    const router = useRouter();
    const [guideContent, setGuideContent] = useState<Section[]>([]);

    useEffect(() => {
        const processedResponses = processUserResponses(responses);
        setGuideContent(processedResponses);
    }, [responses]);

    const getEmbedUrl = (videoLink: string) => {
        const videoId = videoLink.split('/').pop();
        return `https://share.descript.com/embed/${videoId}`;
    };


    const getTimestampSeconds = (timestamp: string) => {
        const [minutes, seconds] = timestamp.split(':').map(Number);
        return minutes * 60 + seconds;
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
            <h1 className="text-4xl font-bold mb-8">Your Project Setup Guide</h1>
            <div className="w-full max-w-3xl">
                {guideContent.map((section, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                        {section.content && <p className="mb-4">{section.content}</p>}
                        {section.videoLink && (
                            <div className="mb-4">
                                <div className="relative pb-[56.25%] h-0">
                                    <iframe
                                        src={getEmbedUrl(section.videoLink)}
                                        width="640"
                                        height="360"
                                        className="absolute top-0 left-0 w-full h-full"
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                        {section.timestamps && section.videoLink && (
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="timestamps">
                                    <AccordionTrigger>Relevant timestamps</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc pl-5">
                                            {section.timestamps.map((timestamp, i) => {
                                                const [time, description] = timestamp.split(' - ');
                                                const seconds = getTimestampSeconds(time);

                                                const timestampUrl = `${section.videoLink}?t=${seconds}`;
                                                return (
                                                    <li key={i}>
                                                        <a
                                                            href={timestampUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:underline"
                                                        >
                                                            {timestamp}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )}
                    </div>
                ))}
            </div>

            <ProjectData />
        </main>
    );
}
