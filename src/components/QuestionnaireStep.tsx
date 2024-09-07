import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserResponse, UserResponses } from "@/lib/contexts/UserResponseContext";
import { useQuestionnaire } from "@/lib/contexts/QuestionnaireContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { debounce } from "lodash"; // Make sure to install lodash if not already installed

// Define a type for the step data
type StepData = {
    question: string;
    responseKey: keyof UserResponses;
    contentType: "textInput" | "imageSelection" | "singleImage" | "selectAll";
    buttonLabels: string[];
    imagePaths?: string[];
};

// Update the stepData array with the correct type
const stepData: StepData[] = [
    {
        //0
        question: "Do you want instructions for setting up Replit + Cursor?",
        responseKey: "setupInstructions",
        contentType: "singleImage",
        buttonLabels: ["Yes", "No"],
        imagePaths: ["/setup.png"],
    },
    {
        //1
        question: "Select all instructions you want to see",
        responseKey: "setupInstructions",
        contentType: "selectAll",
        buttonLabels: ["Replit basics", "Cursor basics", "connecting the two"],
    },
    {
        //2
        question: "What operating system are you using?",
        responseKey: "operatingSystem",
        contentType: "imageSelection",
        buttonLabels: ["Windows", "Mac"],
        imagePaths: ["/window.webp", "/apple.png"],
    },
    {
        //3
        question: "Do you want instructions for setting up Firebase?",
        responseKey: "firebaseInstructions",
        contentType: "singleImage",
        buttonLabels: ["Yes", "No"],
        imagePaths: ["/firebase.png"],
    },
    {
        //4
        question: "Do you want a rundown on how to to use this setup?",
        responseKey: "usingToolsInProject",
        contentType: "singleImage",
        buttonLabels: ["Yes", "No"],
        imagePaths: ["/allTools.png"],
    },

    {
        //5
        question: "Do you want instructions for setting up Git?",
        responseKey: "gitInstructions",
        contentType: "singleImage",
        buttonLabels: ["Yes", "No"],
        imagePaths: ["/git.png"], //TODO update
    },
];

export default function QuestionnaireStep() {
    const { step, setStep, trail, setTrail } = useQuestionnaire();
    const { question, responseKey, contentType, buttonLabels, imagePaths } = stepData[step];
    const { responses, updateResponse } = useUserResponse();
    const isLoading = responses.isLoading;
    const router = useRouter();
    const [textInput, setTextInput] = useState((responses[responseKey] as string) || "");
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const debouncedUpdateResponse = useCallback(
        debounce((value: string) => {
            updateResponse(responseKey, value);
        }, 500),
        [responseKey, updateResponse]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setTextInput(value);
        debouncedUpdateResponse(value);
    };

    const manageIndex = async (label: string) => {
        console.log(`Trail: ${trail}`);
        console.log(`Current step: ${step}`);
        console.log(`Option selected: ${label}`);

        let jumpIndex = 1;
        let proceed = true;
        switch (step) {
            case 0:
                if (label !== "Yes") {
                    //skip setup questions
                    jumpIndex = 2;
                }
                break;
            case 5:
                // Simulate a delay of 3 seconds
                await new Promise((resolve) => setTimeout(resolve, 3000));
                console.log(`Pushing to response page`);
                router.push("/response");
                proceed = false;
                break;
            default:
        }

        if (proceed) {
            setTrail([...trail, step]);
            setStep(step + jumpIndex);
        }
    };

    const handleNext = (value: string | string[]) => {
        console.log(`Updating response for ${responseKey} with value: ${value}`);
        if (step === 0) {
            updateResponse("setupInstructions", value === "Yes");
        } else if (step === 1) {
            updateResponse("setupInstructions", value);
        } else if (step === 2) {
            updateResponse("operatingSystem", value);
        } else if (step === 3) {
            updateResponse("firebaseInstructions", value === "Yes");
        } else if (step === 4) {
            updateResponse("gitInstructions", value === "Yes");
        }

        manageIndex(value as string);
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
                setStep(previousIndex);
            }
        }
    };

    if (step >= stepData.length) {
        return null;
    }

    return (
        <main className="flex min-h-screen p-24 relative">
            {step > 0 && (
                <Button onClick={handleBack} className="fixed top-12 left-12 z-10">
                    Back
                </Button>
            )}
            <div className="flex flex-col items-center justify-center w-full">
                <p className="text-2xl mb-4 text-center text-semibold">{question}</p>
                {contentType === "textInput" && (
                    <form onSubmit={handleTextSubmit} className="w-full max-w-4xl mb-12 flex justify-center">
                        <Textarea
                            className="w-full mb-4"
                            placeholder="Enter your response here..."
                            rows={2}
                            value={textInput}
                            onChange={handleInputChange}
                        />
                    </form>
                )}

                {contentType === "singleImage" && imagePaths && imagePaths[0] && (
                    <div className="w-full max-w-4xl">
                        <div className="flex flex-wrap justify-center gap-8 w-full">
                            <div className="mb-16 p-4 rounded-lg">
                                <Image src={imagePaths[0]} alt="Single Image" width={600} height={300} />
                            </div>
                        </div>
                    </div>
                )}

                {contentType === "selectAll" && (
                    <div className="w-full max-w-4xl">
                        <div className="flex justify-center gap-8 w-full pt-12">
                            {buttonLabels.map((label, index) => (
                                <Button
                                    key={index}
                                    variant={
                                        label === "continue"
                                            ? "default"
                                            : selectedOptions.includes(label)
                                                ? "default"
                                                : "outline"
                                    }
                                    className="w-72 h-12 text-base"
                                    onClick={() => {
                                        if (selectedOptions.includes(label)) {
                                            setSelectedOptions(selectedOptions.filter((option) => option !== label));
                                        } else {
                                            setSelectedOptions([...selectedOptions, label]);
                                        }
                                    }}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                        <div className="flex justify-center mt-20">
                            <Button
                                variant="default"
                                className="w-72 h-12 text-base"
                                onClick={() => handleNext(selectedOptions)}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                )}

                {contentType !== "selectAll" && (
                    <div className="w-full max-w-4xl ">
                        <div className="flex flex-wrap justify-center gap-8 w-full h-full">
                            {buttonLabels.map((label, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    {contentType === "imageSelection" && imagePaths && imagePaths[index] && (
                                        <div className="mb-16 p-4 rounded-lg">
                                            <Image
                                                src={imagePaths[index]}
                                                alt={`Option ${index + 1}`}
                                                width={200}
                                                height={200}
                                            />
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
