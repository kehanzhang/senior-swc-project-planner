"use client";

import { useUserResponse } from "@/lib/contexts/UserResponseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "./LoadingSpinner";
import { useRouter } from "next/navigation";

export function GenerateIdeaInput() {
  const { responses, updateResponse, onGenerateSteps } = useUserResponse();
  const isGenerating = responses.isLoading;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateResponse("idea", "");
    router.push(`/questions?idea=${encodeURIComponent(responses.idea)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex relative border border-gray-300 rounded-md py-2 px-2">
        <Input
          value={responses.idea}
          onChange={(e) => updateResponse("idea", e.target.value)}
          placeholder="Enter your project idea..."
          className="border-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 shadow-none"
        />
        <Button
          type="submit"
          disabled={isGenerating || !responses.idea || responses.idea.length === 0}
        >
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
