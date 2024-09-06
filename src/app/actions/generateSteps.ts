"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";
import { createStreamableValue } from "ai/rsc";
import { Step } from "@/lib/types/project";

export async function generateSteps(idea: string) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const prompt = `
      As an expert Next.js developer, outline the development steps for this project:

      ${idea}

      Context: Next.js (App Router) project with Firebase integration. Replit and Cursor are set up for development.

      For each major feature of the app:
      1. List the feature and its core functionality
      2. Outline the implementation steps (components, API routes, Firebase integration)
      3. Mention any technical challenges or considerations

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

    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4"),
      messages: [{ role: "user", content: prompt }],
      output: "array",
      schema: StepSchema,
    });

    for await (const partialObject of partialObjectStream) {
      console.log(partialObject);
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { steps: stream.value };
}
