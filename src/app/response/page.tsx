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
interface Section {
  title: string;
  content?: string;
  videoLink?: string;
  timestamps?: string[];
  videoId?: string; // Add this line
}

export default function Response() {
  const { responses } = useUserResponse();
  const [guideContent, setGuideContent] = useState<Section[]>([]);

  useEffect(() => {
    const processedResponses = processUserResponses(responses);
    setGuideContent(processedResponses);
  }, [responses]);

  console.log(JSON.stringify(guideContent, null, 2));

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Your Project Setup Guide</h1>
      <div className="w-full max-w-3xl">
        {guideContent.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            {section.content && <p className="mb-4">{section.content}</p>}
            {section.videoId && (
              <div className="mb-4">
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${section.videoId}`}
                    title={`Video for ${section.title}`}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            {section.timestamps && section.videoId && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="timestamps">
                  <AccordionTrigger>Relevant timestamps</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5">
                      {section.timestamps.map((timestamp, i) => {
                        const seconds = parseTimestamp(timestamp);
                        const embedUrl = `https://www.youtube.com/embed/${section.videoId}?start=${seconds}`;
                        return (
                          <li key={i}>
                            <a
                              href={embedUrl}
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
    </main>
  );
}
