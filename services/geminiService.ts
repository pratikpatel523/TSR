
import { GoogleGenAI } from "@google/genai";
import { ParsedLogs } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI Assistant will not function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function* generateAnalysisStream(
    rawLogs: ParsedLogs['rawLogs'], 
    prompt: string
): AsyncGenerator<string, void, unknown> {
    
    if (!process.env.API_KEY) {
        yield "Error: API_KEY is not configured. Please set the environment variable.";
        return;
    }

    const model = 'gemini-2.5-flash';

    // Create a concise summary of logs to send as context
    const logContext = Object.entries(rawLogs)
        .map(([filename, content]) => `--- START ${filename} ---\n${content.substring(0, 2000)}...\n--- END ${filename} ---\n`)
        .join('\n');

    const fullPrompt = `
You are an expert TippingPoint IPS network security analyst. Your task is to analyze the provided log snippets and answer the user's question. Be concise and helpful.

Here are the log snippets:
${logContext}

User's question: "${prompt}"

Provide your analysis:
    `;

    try {
        const result = await ai.models.generateContentStream({
            model,
            contents: fullPrompt
        });

        for await (const chunk of result) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        yield `An error occurred while communicating with the AI. Details: ${error instanceof Error ? error.message : String(error)}`;
    }
}
