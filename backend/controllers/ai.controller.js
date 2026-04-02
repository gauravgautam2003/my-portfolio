import { GoogleGenerativeAI } from "@google/generative-ai";
import ENV from "../config/env.js";

// Initialize the API only if the key exists
const genAI = ENV.GEMINI_API_KEY ? new GoogleGenerativeAI(ENV.GEMINI_API_KEY) : null;

// POST /api/ai/enhance
export const enhanceText = async (req, res) => {
    const { text, contextType } = req.body;

    try {
        if (!genAI) {
            return res.status(400).json({
                success: false,
                message: "Gemini API Key is missing. Please add GEMINI_API_KEY to your backend .env file.",
            });
        }

        if (!text) {
            return res.status(400).json({ success: false, message: "Text to enhance is required." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let prompt = "";

        if (contextType === "skill") {
            prompt = `Fix any spelling errors and provide the exact canonical proper capitalization for this technology name. 
            Do not provide any extra sentences or punctuation. Return ONLY the technology name.
            Input: "${text}"`;
        } else if (contextType === "description") {
            prompt = `Fix grammar, spelling, and improve the professional tone of this description for a developer portfolio.
            Do not change the underlying meaning, just make it read professionally and concisely.
            Ensure no pre-amble text is returned. Return ONLY the enhanced description.
            Input: "${text}"`;
        } else {
            prompt = `Fix spelling and grammar for this text: "${text}". Return only the fixed text.`;
        }

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        res.status(200).json({
            success: true,
            enhancedText: responseText,
        });

    } catch (error) {
        console.error("AI enhancement error:", error);
        res.status(500).json({
            success: false,
            message: "AI failed to process the request.",
        });
    }
};
