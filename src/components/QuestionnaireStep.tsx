import React from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useUserResponse, UserResponses } from '@/lib/contexts/UserResponseContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface QuestionnaireStepProps {
    question: string;
    responseKey: keyof UserResponses;
    nextStep: string;
    showTextArea?: boolean;
    buttonLabels: string[];
    imagePaths?: string[];
}

export function QuestionnaireStep({
    question,
    responseKey,
    nextStep,
    showTextArea = true,
    buttonLabels,
    imagePaths
}: QuestionnaireStepProps) {
    const { responses, updateResponse } = useUserResponse();
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateResponse(responseKey, e.target.value);
    };

    const handleNext = (value: string) => {
        updateResponse(responseKey, value);
        router.push(nextStep);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <p className="text-2xl mb-12 text-center">{question}</p>
            {showTextArea && (
                <Textarea
                    className="w-full max-w-4xl mb-12"
                    placeholder="Enter your response here..."
                    rows={10}
                    value={responses[responseKey] as string || ''}
                    onChange={handleInputChange}
                />
            )}
            <div className="w-full max-w-4xl">
                <div className="flex flex-wrap justify-center gap-8 w-full">
                    {buttonLabels.map((label, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {imagePaths && imagePaths[index] && (
                                <div className="mb-16 p-4rounded-lg">
                                    <Image src={imagePaths[index]} alt={`Option ${index + 1}`} width={200} height={200} />
                                </div>
                            )}
                            <Button
                                variant="outline"
                                className="w-72 h-12 text-base"
                                onClick={() => handleNext(label)}
                            >
                                {label}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}