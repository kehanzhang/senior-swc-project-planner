"use client";

import OutputConsole from "@/components/outputConsole";
import QuestionnaireStep from "@/components/QuestionnaireStep";
import { useUserResponse } from "@/lib/contexts/UserResponseContext";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ProjectDescription() {
  const { onGenerateSteps } = useUserResponse();
  const searchParams = useSearchParams();
  const idea = searchParams.get("idea");
  const hasGeneratedSteps = useRef(false);
  const router = useRouter();
  useEffect(() => {
    if (!idea) {
      router.push("/");
    }
    if (idea && !hasGeneratedSteps.current) {
      onGenerateSteps(idea);
      hasGeneratedSteps.current = true;
    }
  }, [idea, onGenerateSteps, router]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen relative">
      <div className="flex-grow flex items-center justify-center w-full">
        <QuestionnaireStep />
      </div>
      <div className="w-full flex justify-center mb-4">
        <OutputConsole />
      </div>
    </div>
  );
}
