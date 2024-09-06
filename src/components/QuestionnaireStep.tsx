import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useUserResponse, UserResponses } from '@/lib/contexts/UserResponseContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Define a type for the step data
type StepData = {
    question: string;
    responseKey: keyof UserResponses;
    contentType: 'textInput' | 'imageSelection' | 'singleImage' | 'selectAll';
    buttonLabels: string[];
    imagePaths?: string[];
};

// Update the stepData array with the correct type
const stepData: StepData[] = [
    {
        question: "What are you trying to build? Describe the features, use-cases, and flow/pages involved.",
        responseKey: "projectDescription",
        contentType: "textInput",
        buttonLabels: ["Generate with GPT-4o", "Generate with Claude 3.5 Sonnet"]
    },
    {
        question: "Do you want instructions for setting up Replit + Cursor?",
        responseKey: "setupInstructions",
        contentType: "singleImage",
        buttonLabels: ["Yes", "No"],
        imagePaths: ["/setup.png"]
    },
    {
        question: "Select all instructions you want to see",
        responseKey: "setupInstructions",
        contentType: "selectAll",
        buttonLabels: ["Replit basics", "Cursor basics", "connecting the two"],
    },
    {
        question: "What operating system are you using?",
        responseKey: "operatingSystem",
        contentType: "imageSelection",
        buttonLabels: ["Windows", "Mac"],
        imagePaths: ["/window.webp", "/apple.png"]
    },
    {
        question: "Do you want instructions for setting up Firebase?",
        responseKey: "firebaseInstructions",
        contentType: "singleImage",
        buttonLabels: ["Yes", "No"],
        imagePaths: ["/firebase.png"]
    },
    {
        question: "Do you want instructions for setting up Git?",
        responseKey: "gitInstructions",
        contentType: "singleImage",
        buttonLabels: ["Yes", "No"],
        imagePaths: ["/git.png"]
    },
]

export default function QuestionnaireStep({
    index,
    setIndex,
    trail,
    setTrail
}: {
    index: number;
    setIndex: (index: number) => void;
    trail: number[];
    setTrail: (trail: number[]) => void;
}) {
    if (index >= stepData.length) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">MAKE MORE MONEY</h1>
            </div>
        )
    }
    const { question, responseKey, contentType, buttonLabels, imagePaths } = stepData[index];
    const { responses, updateResponse } = useUserResponse();
    const router = useRouter();
    const [textInput, setTextInput] = useState(responses[responseKey] as string || '');
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextInput(e.target.value);
        updateResponse(responseKey, e.target.value);
    };

    const manageIndex = (label: string) => {
        console.log(`Trail: ${trail}`);
        console.log(`Current step: ${index}`);
        console.log(`Option selected: ${label}`);

        let jumpIndex = 1;

        switch (index) {
            case 1:
                if (label !== "Yes") { //skip setup questions
                    jumpIndex = 3
                }
                break;
            case 4:
                console.log(`Pushing to response page`);
                router.push('/response');
                break;
            default:
        }

        setTrail([...trail, index]);
        setIndex(index + jumpIndex);
    }

    const handleNext = (value: string) => {
        console.log(`Updating response for ${responseKey} with value: ${value}`);
        if (index > 0) {
            updateResponse(responseKey, value);
        }

        manageIndex(value);
    };

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (textInput.trim()) {
            handleNext(textInput.trim());
        }
    };

    const handleBack = () => {
        if (trail.length > 0) {
            const newTrail = [...trail];
            const previousIndex = newTrail.pop();
            setTrail(newTrail);
            if (previousIndex !== undefined) {
                setIndex(previousIndex);
            }
        }
    };

    return (
        <main className="flex min-h-screen p-24">

            {index > 0 && <Button onClick={handleBack}>Back</Button>}
            <div className="flex flex-col items-center justify-center">
                <p className="text-2xl mb-12 text-center">{question}</p>

                {contentType === 'textInput' && (
                    <form onSubmit={handleTextSubmit} className="w-full max-w-4xl mb-12">
                        <Textarea
                            className="w-full mb-4"
                            placeholder="Enter your response here..."
                            rows={10}
                            value={textInput}
                            onChange={handleInputChange}
                        />
                    </form>
                )}

                {contentType === 'singleImage' && imagePaths && imagePaths[0] && (
                    <div className="w-full max-w-4xl">
                        <div className="flex flex-wrap justify-center gap-8 w-full">
                            <div className="mb-16 p-4 rounded-lg">
                                <Image src={imagePaths[0]} alt="Single Image" width={600} height={300} />
                            </div>
                        </div>
                    </div>
                )}

                {contentType === 'selectAll' && (
                    <div className="w-full max-w-4xl">
                        <div className="flex flex-wrap justify-center gap-8 w-full">
                            {buttonLabels.map((label, index) => (
                                <Button
                                    key={index}
                                    variant={label === 'continue' ? "default" : selectedOptions.includes(label) ? "default" : "outline"}
                                    className="w-72 h-12 text-base"
                                    onClick={() => {
                                        if (selectedOptions.includes(label)) {
                                            setSelectedOptions(selectedOptions.filter(option => option !== label));
                                        } else {
                                            setSelectedOptions([...selectedOptions, label]);
                                        }
                                    }}
                                >
                                    {label}
                                </Button>
                            ))}

                        </div>
                        <div className="flex justify-center mt-8">
                            <Button
                                variant="default"
                                className="w-72 h-12 text-base"
                                onClick={() => handleNext(selectedOptions.join(', '))}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                )}




                {contentType !== 'selectAll' && (
                    <div className="w-full max-w-4xl">
                        <div className="flex flex-wrap justify-center gap-8 w-full">
                            {buttonLabels.map((label, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    {contentType === 'imageSelection' && imagePaths && imagePaths[index] && (
                                        <div className="mb-16 p-4 rounded-lg">
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
                )}
            </div>
        </main>
    );
}