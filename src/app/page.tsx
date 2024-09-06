'use client';

import QuestionnaireStep from '@/components/QuestionnaireStep';
import { useState } from 'react';

export default function ProjectDescription() {
  const [step, setStep] = useState(0);
  const [trail, setTrail] = useState<number[]>([]);

  return (
    <QuestionnaireStep
      index={step}
      setIndex={setStep}
      trail={trail}
      setTrail={setTrail}
    />
  );
}
