import { ChevronDown, ChevronUp } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Step } from "@/lib/types/project";

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
  return (
    <Card className="mb-4 rounded-sm shadow-none">
      <CardHeader>
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
        <CardDescription className="text-lg">{step.description}</CardDescription>
      </CardHeader>
      <div className={`relative ${completed && !expanded ? "h-20 overflow-hidden" : ""}`}>
        <CardContent className={`space-y-4 ${completed && !expanded ? "blur-sm" : ""}`}>
          {step.apiRoutes && step.apiRoutes.length > 0 && (
            <>
              <div>
                <h3 className="font-semibold mb-2">API Routes:</h3>
                <div className="flex flex-wrap gap-2">
                  {step.apiRoutes.map((route, idx) => (
                    <Badge key={idx} variant="secondary">
                      {route}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {step.features && step.features.length > 0 && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Features:</h3>
                <ul className="list-disc list-inside">
                  {step.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <Separator />
            </>
          )}

          {step.components && step.components.length > 0 && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Components:</h3>
                <div className="flex flex-wrap gap-2">
                  {step.components.map((component, idx) => (
                    <Badge key={idx} variant="outline">
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {step.considerations && step.considerations.length > 0 && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Considerations:</h3>
                <ul className="list-disc list-inside">
                  {step.considerations.map((consideration, idx) => (
                    <li key={idx} className="text-orange-600">
                      {consideration}
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
            </>
          )}

          {step.actionableSteps && step.actionableSteps.length > 0 && (
            <div>
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
            </div>
          )}
        </CardContent>
        {completed && <div className="h-12" />}
        {completed && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 bg-gradient-to-t from-background to-transparent">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleExpand(step.step)}
              className="flex items-center"
            >
              {expanded ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4 " />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Show
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
