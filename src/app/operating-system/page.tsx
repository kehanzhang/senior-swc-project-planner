'use client';

import { QuestionnaireStep } from '@/components/QuestionnaireStep';

export default function OperatingSystem() {
    return (
        <QuestionnaireStep
            question="What operating system are you using?"
            responseKey="operatingSystem"
            nextStep="/setup-instructions"
            showTextArea={false}
            buttonLabels={["Windows", "Mac"]}
            imagePaths={["/window.webp", "/apple.png"]}
        />
    );
}