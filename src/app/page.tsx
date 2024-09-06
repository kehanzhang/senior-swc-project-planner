'use client';

import { QuestionnaireStep } from '@/components/QuestionnaireStep';

export default function ProjectDescription() {
  return (
    <QuestionnaireStep
      question="What are you trying to build? Describe the features, use-cases, and flow/pages involved."
      responseKey="projectDescription"
      nextStep="/operating-system"
      buttonLabels={["Generate with GPT-4", "Generate with Claude 3.5 Sonnet"]}
    />
  );
}
