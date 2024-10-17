require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializa o modelo com a chave de API do arquivo .env
const genAI = new GoogleGenerativeAI(process.env.GEM_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function runGeminiAI(prompt) {
    try {
        // Gera conteúdo com o modelo
        const message = await model.generateContent(prompt);
        const response = await message.response;
        const text = await response.text();
        
        return text;
    } catch (error) {
        console.error("Erro ao gerar conteúdo:", error);
        throw new Error("Erro ao se comunicar com a API do Gemini AI");
    }
}

module.exports = { runGeminiAI };