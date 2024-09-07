import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";

export const runtime = "edge";

export async function POST(req: Request) {
  const { idea } = await req.json();

  const prompt = `
    You are an expert project planner and developer. A user wants to build the following:
    
    ${idea}
    
    Please provide a structured list of steps they need to take to complete this project. 
    Include major milestones, key tasks, and any important considerations or potential challenges.
    Format your response as a JSON array of objects, where each object represents a step and has the following structure:
    {
      "step": "ordered number of the step",
      "title": "brief title of the step",
      "description": "detailed explanation of what needs to be done in this step",
      "considerations": "any important points to keep in mind or potential challenges"
    }
  `;

  const response = await streamObject({
    model: openai("gpt-4o"),
    messages: [{ role: "user", content: prompt }],
    schema: z.array(
      z.object({
        step: z.number(),
        title: z.string(),
        description: z.string(),
        considerations: z.string(),
      }),
    ),
  });

  // Return the stream as the response
  return response.toTextStreamResponse();
}
