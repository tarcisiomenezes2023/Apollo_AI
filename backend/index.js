const express = require('express');
const cors = require('cors');
const { runGeminiAI } = require('./gemini/Api');
const app = express();

/* Middleware para interpretar JSON */
app.use(express.json());
app.use(cors()); /* Permite todas as origens. Você pode restringir a origem conforme necessário. */

/* Rota principal (GET) */
app.get('/', (req, res) => {
    res.send('<h1>Hello, world!</h1>');
});

/* Objeto para armazenar o histórico de chats */
let chatHistory = {};

/* Rota para o endpoint /chat (POST) */
app.post('/chat', async (req, res) => {
    const { text } = req.body;
    const chatId = Date.now().toString();

    try {
        const result = await runGeminiAI(text);

        chatHistory[chatId] = chatHistory[chatId] || [];
        chatHistory[chatId].push({ user: text, ai: result.text });

        res.status(200).json({ chatId, text: result.text });
    } catch (error) {
        console.error('Erro ao salvar o histórico de chat:', error);

        if (error.message.includes("SAFETY")) {
            return res.status(400).json({ error: 'A entrada foi bloqueada devido a questões de segurança.' });
        }

        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
});

/* Rota para buscar o histórico de um chat específico (GET) */
app.get('/chats/:id', (req, res) => {
    const { id } = req.params;
    // Envia o histórico de chat com base no chatId ou um array vazio se não houver histórico
    res.status(200).json({ history: chatHistory[id] || [] });
});

/* Inicializando o servidor na porta 3000 */
const port = 5000;
app.listen(port, () => console.log(`Servidor está ouvindo na porta ${port}`));