"use client";

import React from "react";
import { GenerateIdeaInput } from "@/components/GenerateIdeaInput";

export function ProjectPlanner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full px-4">
        <h1 className="font-heading text-pretty text-center text-[22px] font-semibold tracking-tighter text-gray-900 sm:text-[30px] md:text-[36px]">
          What can I help you ship today?
        </h1>
        <h2 className="text-balance text-center text-sm text-gray-700">
          Give us your idea and we&apos;ll generate a step-by-step guide to help you ship it.
        </h2>
        <div className="mt-6"></div>
        <GenerateIdeaInput />
      </div>
    </div>
  );
}
