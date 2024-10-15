const express = require('express');
const cors = require('cors');
const { runGeminiAI } = require('./gemini/Api');
const { db } = require('./FirebaseConfig/FirebaseConfig');
const { ref, set, get, child } = require('firebase/database');  // Mudança para usar Realtime Database
const app = express();

/* Middleware para interpretar JSON */
app.use(express.json());
app.use(cors());

/* Rota principal (GET) */
app.get('/', (req, res) => {
    res.send('<h1>Hello, world!</h1>');
});

/* Rota para o endpoint /chat (POST) */
app.post('/chat', async (req, res) => {
    const { text } = req.body;
    const chatId = Date.now().toString();  // Criando um chatId único

    try {
        const result = await runGeminiAI(text);

        const chatData = {
            chatId,
            messages: [{ user: text, ai: result.text }],
            createdAt: new Date(),
        }

        // Salvar o chat no Realtime Database
        await set(ref(db, 'chats/' + chatId), chatData);  // Mudança para salvar no Realtime Database

        res.status(200).json({ chatId, text: result.text });

    } catch (error) {
        console.error('Erro ao salvar o histórico de chat:', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
});

/* Rota para buscar o histórico de um chat específico (GET) */
app.get('/chats/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const chatSnapshot = await get(child(ref(db), `chats/${id}`));  // Mudança para buscar do Realtime Database
        if (!chatSnapshot.exists()) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        res.status(200).json({ history: chatSnapshot.val().messages });

    } catch (error) {
        console.error('Error to fetch chat history: ' + error.message);
        res.status(500).json({ error: 'Error from server' });
    }
});

/* Inicializando o servidor na porta 5000 */
const port = 5000;
app.listen(port, () => console.log(`Servidor está ouvindo na porta ${port}`));
