"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface QuestionnaireContextType {
  step: number;
  setStep: (step: number) => void;
  trail: number[];
  setTrail: (trail: number[]) => void;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [trail, setTrail] = useState<number[]>([]);

  return (
    <QuestionnaireContext.Provider value={{ step, setStep, trail, setTrail }}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error("useQuestionnaire must be used within a QuestionnaireProvider");
  }
  return context;
}
