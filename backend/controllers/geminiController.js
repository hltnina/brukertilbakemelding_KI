import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateWithGemini(req, res) {
  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required in the request body.",
      });
    }

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Server missing GOOGLE_GEMINI_API_KEY",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const result = await model.generateContent(prompt);

    const message =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return res.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Gemini error message:", error?.message);
    console.error("Gemini error status:", error?.status);
    console.error("Gemini error stack:", error?.stack);
    console.error("Gemini error details:", error);

    return res.status(500).json({
      error: "Failed to generate content. Please try again.",
      details: error?.message || "Unknown Gemini error",
    });
  }
}