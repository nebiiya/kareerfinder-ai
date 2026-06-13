import {NextResponse} from "next/server";
import {GoogleGenAI, Type} from "@google/genai";

// Initialize the Google GenAI client using the server-side env variable
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY 
});

// Define the rigid JSON schema we want Gemini to output
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        recommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    role: {type: Type.STRING},
                    why_it_fits: {type: Type.STRING},
                    roadmap_3_months: {
                        type: Type.ARRAY,
                        items: {type: Type.STRING}
                    },
                    ph_resources: {
                        type: Type.ARRAY,
                        items: {type: Type.STRING}
                    }
                }, required: ["role", "why_it_fits", "roadmap_3_months", "ph_resources"]
            },
        },
    }, required: ["recommendations"]
};

export async function POST(request: Request) {
    try {
        // Parse the incoming student preferences from frontend
        const {interests, experience, activities} = await request.json();

        // Construct the prompt for Gemini
        const prompt = `You are an expert career counselor specializing in the Philippine tech industry. 
        Your mission is to bridge the "Exposure Gap" and "Skill Gap" for Filipino students. Analyze their inputs
        and match them exactly with 3 tech roles. For each role, provide a clear, concise, and encouraging "why
        it fits" explanation, a realistic 3-month roadmap to get started, and a list of free local resources available 
        in the Philippines (like tech communities, online courses, or accessuble free tracks like roadmap.sh).`

        const userPrompt = `A student is looking for a tech career path with these parameters:
        - Interests: ${interests.join(", ")}
        - Experience LeveL: ${experience}
        - Activities They Enjoy: ${activities}`;

        // Call the Gemini API with the prompt and the response schema
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",  // Fast, accurate, and cost-effective model
            contents: userPrompt,
            config: {
                systemInstruction: prompt,
                responseMimeType: "application/json", // Force the model to respond strictly inside JSON schema
                responseSchema: responseSchema,
                temperature: 0.5, // Moderate creativity for structured output
            }
        });

        // Parse and return the JSON data back to the frontend
        const responseText = response.text ?? "";
        if (!responseText) {
            throw new Error("Empty Gemini response text");
        }
        const data = JSON.parse(responseText);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            {error: "Failed to generate career path. Please try again."},
            {status: 500}
        );
    }
}