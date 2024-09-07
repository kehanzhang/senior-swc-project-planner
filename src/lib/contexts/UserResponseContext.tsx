"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Step } from "@/lib/types/project";
import { generateSteps } from "@/app/actions/generateSteps";

export interface UserResponses {
  idea: string;
  operatingSystem: "mac" | "windows" | null;
  aiModel: "gpt" | "claude" | null;
  setupInstructions: boolean | null;
  firebaseInstructions: boolean | null;
  gitInstructions: boolean | null;
  projectData: Step[];
  isLoading: boolean;
}

interface UserResponseContextType {
  responses: UserResponses;
  updateResponse: (key: keyof UserResponses, value: any) => void;
  onGenerateSteps: (idea: string) => Promise<void>;
}

const UserResponseContext = createContext<UserResponseContextType | undefined>(undefined);

export function UserResponseProvider({ children }: { children: ReactNode }) {
  const [responses, setResponses] = useState<UserResponses>({
    idea: "",
    operatingSystem: null,
    aiModel: null,
    setupInstructions: null,
    firebaseInstructions: null,
    gitInstructions: null,
    projectData: [],
    isLoading: false,
  });

  const onGenerateSteps = async (idea: string) => {
    console.log("idea: " + idea);
    console.log("Generating steps");
    if (idea.length > 0) {
      setResponses((prev) => ({ ...prev, isLoading: true }));
      const steps = await generateSteps(idea);
      setResponses((prev) => ({ ...prev, projectData: steps, isLoading: false }));
      console.log(`Step generated ${steps.length}`, JSON.stringify(steps));
    }
    console.log("Steps generated: " + JSON.stringify(responses.projectData));
  };

  const updateResponse = (key: keyof UserResponses, value: any) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <UserResponseContext.Provider value={{ responses, updateResponse, onGenerateSteps }}>
      {children}
    </UserResponseContext.Provider>
  );
}

export const useUserResponse = () => {
  const context = useContext(UserResponseContext);
  if (!context) {
    throw new Error("useUserResponse must be used within a UserResponseProvider");
  }
  return context;
};
