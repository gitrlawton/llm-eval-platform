import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    // Parse the incoming request body
    const { prompt, models } = await request.json();

    // Validate input
    if (!prompt || !models || models.length === 0) {
      return NextResponse.json(
        {
          error: "Prompt and at least one model are required",
        },
        { status: 400 }
      );
    }

    // Object to store responses
    const responses = {};

    // Parallel model calls
    const modelPromises = models.map(async (model) => {
      try {
        const groqResponse = await groq.chat.completions.create({
          model: model, // Directly use the model name passed in
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1024,
        });

        responses[model] = groqResponse.choices[0].message.content;
      } catch (modelError) {
        responses[model] = `Error: ${modelError.message}`;
      }
    });

    // Wait for all model calls to complete
    await Promise.all(modelPromises);

    // Return the responses
    return NextResponse.json({
      responses,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Comparison API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
