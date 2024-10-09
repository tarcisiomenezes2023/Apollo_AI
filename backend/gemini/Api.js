require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

/* Initialize the API with the key */
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function runGeminiAI(prompt) {
    try {
        /* the correct model */
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        /* calling the method generativeContent with the prompt */
        const result = await model.generateContent(prompt);

        /* verifying the return and result */
        const responseText = result.response.text();  /* Result = text/string */
        console.log("Generated text:", responseText);

        return { text: responseText };
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
}

module.exports = { runGeminiAI };