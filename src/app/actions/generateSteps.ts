"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";
import { createStreamableValue } from "ai/rsc";

export async function generateSteps(idea: string) {
  const stream = createStreamableValue();

  (async () => {
    const prompt = `
      You are an expert project planner and developer. A user wants to build the following:
      
      ${idea}
      
      Please provide a structured list of steps they need to take to complete this project. 
      Include major milestones, key tasks, and any important considerations or potential challenges.
    `;

    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4"),
      messages: [{ role: "user", content: prompt }],
      schema: z.array(
        z.object({
          step: z.number(),
          title: z.string(),
          description: z.string(),
          considerations: z.string(),
        })
      ),
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { steps: stream.value };
}
