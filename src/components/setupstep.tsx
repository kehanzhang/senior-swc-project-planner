import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface SetupStep {
    step: number;
    title: string;
    description: string;
    videoLink: string;
    timestamps: string[];
}

interface SetupStepProps {
    step: SetupStep;
    completed: boolean;
    expanded: boolean;
    onToggleStep: (stepNumber: number) => void;
    onToggleExpand: (stepNumber: number) => void;
}

export function SetupStep({
    step,
    completed,
    expanded,
    onToggleStep,
    onToggleExpand,
}: SetupStepProps) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const springConfig = { stiffness: 300, damping: 30 };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", ...springConfig },
        },
    };

    const contentVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                type: "spring",
                ...springConfig,
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", ...springConfig },
        },
    };

    const getTimestampSeconds = (timestamp: string) => {
        const [minutes, seconds] = timestamp.split(':').map(Number);
        return minutes * 60 + seconds;
    };

    const handleToggleStep = (stepNumber: number) => {
        onToggleStep(stepNumber);
        if (expanded && !completed) {
            onToggleExpand(stepNumber);
        }
    };

    const getEmbedUrl = (videoLink: string) => {
        const videoId = videoLink.split('/').pop();
        return `https://share.descript.com/embed/${videoId}`;
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={cardVariants}
        >
            <Card className="mb-4 rounded-sm shadow-none w-full">
                <motion.div variants={contentVariants}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id={`setup-step-${step.step}`}
                                checked={completed}
                                onCheckedChange={() => handleToggleStep(step.step)}
                            />
                            <CardTitle className="text-xl">
                                <label
                                    htmlFor={`setup-step-${step.step}`}
                                    className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Step {step.step}: {step.title}
                                </label>
                            </CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleExpand(step.step)}
                            className="p-0"
                        >
                            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CardHeader>
                    <motion.div variants={itemVariants}>
                        <CardDescription className="text-lg px-6">{step.description}</CardDescription>
                    </motion.div>
                    <AnimatePresence initial={false}>
                        {expanded && (
                            <motion.div
                                key="content"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={contentVariants}
                            >
                                <CardContent className="space-y-4">
                                    {/* Video Embed */}
                                    <motion.div variants={itemVariants}>
                                        <h3 className="font-semibold mb-2">Video Tutorial:</h3>
                                        <div className="aspect-w-16 aspect-h-9">
                                            <iframe
                                                src={getEmbedUrl(step.videoLink)}
                                                width="640"
                                                height="360"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <Separator className="mt-4" />
                                    </motion.div>

                                    {/* Timestamps */}
                                    <motion.div variants={itemVariants}>
                                        <h3 className="font-semibold mb-2">Timestamps:</h3>
                                        <ul className="list-disc list-inside">
                                            {step.timestamps.map((timestamp, idx) => {
                                                const [time, description] = timestamp.split(' - ');
                                                const seconds = getTimestampSeconds(time);
                                                const timestampUrl = `${step.videoLink}?t=${seconds}`;
                                                return (
                                                    <li key={idx}>
                                                        <a
                                                            href={timestampUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:underline"
                                                        >
                                                            {time}
                                                        </a>
                                                        {' - '}{description}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </motion.div>
                                </CardContent>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Card>
        </motion.div>
    );
}
