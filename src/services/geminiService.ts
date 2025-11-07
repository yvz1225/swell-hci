
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getStylingAdvice(productName: string, brand: string): Promise<string> {
  if (!API_KEY) {
    return Promise.resolve("AI functionality is currently disabled. Please configure an API key.");
  }
  
  try {
    const prompt = `You are a professional fashion stylist. A user has a '${productName}' from the brand '${brand}'. 
    
Provide three distinct and creative outfit ideas using this item. For each outfit, suggest complementary pieces (e.g., pants, shoes, accessories) and describe the overall vibe or occasion it would be suitable for.
Format your response clearly in Markdown. Use headings for each outfit suggestion.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error('Error fetching styling advice:', error);
    return 'Sorry, I am having trouble coming up with styling advice right now. Please try again later.';
  }
}
