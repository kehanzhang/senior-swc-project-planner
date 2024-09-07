"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "./LoadingSpinner";

interface GenerateIdeaInputProps {
  onGenerateSteps: (idea: string) => Promise<void>;
  isGenerating: boolean;
}

export function GenerateIdeaInput({ onGenerateSteps, isGenerating }: GenerateIdeaInputProps) {
  const [idea, setIdea] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onGenerateSteps(idea);
    setIdea("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex space-x-2">
        <Input
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Enter your project idea..."
          className="flex-grow"
        />
        <Button type="submit" disabled={isGenerating}>
          {isGenerating ? (
            <>
              <LoadingSpinner />
              Generating...
            </>
          ) : (
            "Generate Steps"
          )}
        </Button>
      </div>
    </form>
  );
}
