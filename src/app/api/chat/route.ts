import { OpenAIStream, AnthropicStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  if (model.startsWith("gpt")) {
    const response = await openai.chat.completions.create({
      model,
      messages,
      stream: true,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } else if (model.startsWith("claude")) {
    const response = await anthropic.messages.create({
      model,
      messages,
      stream: true,
    });
    const stream = AnthropicStream(response);
    return new StreamingTextResponse(stream);
  } else {
    return new Response("Invalid model specified", { status: 400 });
  }
}
