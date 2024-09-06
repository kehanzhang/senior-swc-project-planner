'use client';

import { QuestionnaireStep } from '@/components/QuestionnaireStep';

export default function SetupInstructions() {
    return (
        <QuestionnaireStep
            question="Do you want instructions for setting up Replit + Cursor?"
            responseKey="setupInstructions"
            nextStep="/final-step" // Replace with the actual final step route
            buttonLabels={["Yes", "No"]}
        />
    );
}