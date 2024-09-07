"use client";

import { ProjectPlanner } from "@/components/project-planner";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export default function TestPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Step Generator</h1>
      <ProjectPlanner />
    </div>
  );
}
