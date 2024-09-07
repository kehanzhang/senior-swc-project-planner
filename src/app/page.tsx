'use client';

import OutputConsole from '@/components/outputConsole';
import QuestionnaireStep from '@/components/QuestionnaireStep';
import { useState } from 'react';

export default function ProjectDescription() {
  const [step, setStep] = useState(0);
  const [trail, setTrail] = useState<number[]>([]);

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <QuestionnaireStep
        index={step}
        setIndex={setStep}
        trail={trail}
        setTrail={setTrail}
      />
      <OutputConsole />
    </div>
  );
}