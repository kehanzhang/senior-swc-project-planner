import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const openai = new OpenAI();
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Say something tangentially related to the user prompt, be witty but not mean, max 10 words",
      },
      ...messages,
    ],
    max_tokens: 20,
  });

  const gptResponse = response.choices[0].message.content;
  return NextResponse.json({ response: gptResponse });
}
