"use server";

import { openai } from "@ai-sdk/openai";
import { generateObject, streamObject } from "ai";
import { z } from "zod";
import { createStreamableValue } from "ai/rsc";
import { Step } from "@/lib/types/project";

// Common function to get prompt and schema
function getPromptAndSchema(idea: string) {
  const prompt = `
    You are an expert Next.js developer helping a user who does not know how to code on a website called Software Composers.
    
    They have an idea for a project and want to know the exact steps to develop it.

    Idea: ${idea}

    Context: We have already helped the user setup their development environment with Next.js 14 (App Router) project with Firebase integration. They are using Replit to preview and deploy their project. They are using Cursor to tell AI to generate code for them.

    Now, you must generate the next steps for the user to follow. These are mainly features that they need to implement. You give them an outline of the clear next steps to go to deploying their project.

    For each major feature of the app:
    1. List the feature and its core functionality
    2. Outline the implementation steps (components, API routes, Firebase integration)
    3. Mention any technical challenges or considerations in simple terms

    Include steps for:
    - Component and page creation
    - State management and data flow
    - API route development
    - Firebase data modeling and integration
    - Testing and debugging
    - Final deployment on Replit

    Provide concise, actionable steps focused on coding and technical implementation, assuming the development environment is ready.
  `;

  const StepSchema = z.object({
    step: z.number(),
    title: z.string(),
    description: z.string(),
    apiRoutes: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    components: z.array(z.string()).optional(),
    considerations: z.array(z.string()).optional(),
    actionableSteps: z.array(z.string()).optional(),
  }) satisfies z.ZodType<Step>;

  return { prompt, StepSchema };
}

export async function generateStepsStreamable(idea: string) {
  "use server";
  const stream = createStreamableValue();
  const loadingState = createStreamableValue({ loading: true });

  (async () => {
    const { prompt, StepSchema } = getPromptAndSchema(idea);

    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o"),
      messages: [{ role: "user", content: prompt }],
      output: "array",
      schema: StepSchema,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
    loadingState.update({ loading: false });
  })();

  return { steps: stream.value, loadingState: loadingState.value };
}

export async function generateSteps(idea: string) {
  "use server";
  const { prompt, StepSchema } = getPromptAndSchema(idea);

  const { object: steps } = await generateObject({
    model: openai("gpt-4o"),
    messages: [{ role: "user", content: prompt }],
    output: "array",
    schema: StepSchema,
  });

  return steps;
}
