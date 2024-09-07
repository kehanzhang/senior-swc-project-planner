import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Step } from "@/lib/types/project";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { parseTimestamp } from "@/lib/utils/timeUtils";

interface StepProps {
  step: Step;
  completed: boolean;
  expanded: boolean;
  onToggleStep: (stepNumber: number) => void;
  onToggleExpand: (stepNumber: number) => void;
}

export function ProjectStep({
  step,
  completed,
  expanded,
  onToggleStep,
  onToggleExpand,
}: StepProps) {
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        ...springConfig,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <Card className="mb-4 rounded-sm shadow-none">
        <motion.div variants={contentVariants}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`step-${step.step}`}
                checked={completed}
                onCheckedChange={() => onToggleStep(step.step)}
              />
              <CardTitle className="text-xl">
                <label
                  htmlFor={`step-${step.step}`}
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
              className="flex items-center"
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
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
                  <motion.div variants={itemVariants}>
                    <CardDescription className="text-lg">{step.description}</CardDescription>
                  </motion.div>
                  {step.type === "roadmap" && (
                    <>
                      {/* Roadmap-specific content */}
                      {step.apiRoutes && step.apiRoutes.length > 0 && (
                        <motion.div custom={0} variants={sectionVariants}>
                          <h3 className="font-semibold mb-2">API Routes:</h3>
                          <div className="flex flex-wrap gap-2">
                            {step.apiRoutes.map((route, idx) => (
                              <Badge key={idx} variant="secondary">
                                {route}
                              </Badge>
                            ))}
                          </div>
                          <Separator className="mt-4" />
                        </motion.div>
                      )}

                      {step.features && step.features.length > 0 && (
                        <motion.div custom={1} variants={sectionVariants}>
                          <h3 className="font-semibold mb-2">Features:</h3>
                          <ul className="list-disc list-inside">
                            {step.features.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                          <Separator className="mt-4" />
                        </motion.div>
                      )}

                      {step.components && step.components.length > 0 && (
                        <motion.div custom={2} variants={sectionVariants}>
                          <h3 className="font-semibold mb-2">Components:</h3>
                          <div className="flex flex-wrap gap-2">
                            {step.components.map((component, idx) => (
                              <Badge key={idx} variant="outline">
                                {component}
                              </Badge>
                            ))}
                          </div>
                          <Separator className="mt-4" />
                        </motion.div>
                      )}

                      {step.considerations && step.considerations.length > 0 && (
                        <motion.div custom={3} variants={sectionVariants}>
                          <h3 className="font-semibold mb-2">Considerations:</h3>
                          <ul className="list-disc list-inside">
                            {step.considerations.map((consideration, idx) => (
                              <li key={idx} className="text-orange-600">
                                {consideration}
                              </li>
                            ))}
                          </ul>
                          <Separator className="mt-4" />
                        </motion.div>
                      )}

                      {step.actionableSteps && step.actionableSteps.length > 0 && (
                        <motion.div custom={4} variants={sectionVariants}>
                          <h3 className="font-semibold mb-2">Actionable Steps:</h3>
                          <div className="space-y-2">
                            {step.actionableSteps.map((actionableStep, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <Checkbox id={`step-${step.step}-action-${idx}`} />
                                <label
                                  htmlFor={`step-${step.step}-action-${idx}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {actionableStep}
                                </label>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}

                  {step.type === "setup" && (
                    <>
                      {/* Setup-specific content */}
                      {step.videoId && (
                        <motion.div custom={0} variants={sectionVariants}>
                          <div className="mb-4">
                            <div className="relative pb-[56.25%] h-0">
                              <iframe
                                src={`https://www.youtube.com/embed/${step.videoId}`}
                                title={`Video for ${step.title}`}
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step.timestamps && step.videoId && (
                        <motion.div custom={1} variants={sectionVariants}>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="timestamps">
                              <AccordionTrigger>Relevant timestamps</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5">
                                  {step.timestamps.map((timestamp, i) => {
                                    const seconds = parseTimestamp(timestamp);
                                    const embedUrl = `https://www.youtube.com/embed/${step.videoId}?start=${seconds}`;
                                    return (
                                      <li key={i}>
                                        <a href={embedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                          {timestamp}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </motion.div>
                      )}
                    </>
                  )}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Card>
    </motion.div>
  );
}
