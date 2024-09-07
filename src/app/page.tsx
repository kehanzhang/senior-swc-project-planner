'use client';

import OutputConsole from '@/components/outputConsole';
import QuestionnaireStep from '@/components/QuestionnaireStep';
import { useState } from 'react';

export default function ProjectDescription() {
  const [step, setStep] = useState(0);
  const [trail, setTrail] = useState<number[]>([]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen relative">
      <div className="flex-grow flex items-center justify-center w-full">
        <QuestionnaireStep
          index={step}
          setIndex={setStep}
          trail={trail}
          setTrail={setTrail}
        />
      </div>
      <div className="w-full flex justify-center mb-4">
        <OutputConsole />
      </div>
    </div>
  );
}