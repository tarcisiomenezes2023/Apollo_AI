const express = require('express');
const cors = require('cors');
const { runGeminiAI } = require('./gemini/Api');
const { db } = require('./FirebaseConfig/FirebaseConfig');
const { doc, setDoc } = require('firebase/firestore');
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

        const chatData = {
            chatId,
            messages: [{ user: text, ai: result.text }],
            createdAt: new Date(),
        }

        await setDoc(doc(db, 'chats', chatId), chatData) /* Save in Firestore */

/*         chatHistory[chatId] = chatHistory[chatId] || [];
        chatHistory[chatId].push({ user: text, ai: result.text }); */

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
app.get('/chats/:id', async (req, res) => {
    const { id } = req.params;

     try {
        const chatDoc = await getDoc(doc(db, 'chats', id))
        if (!chatDoc.exists()) {
            return res.status(404).json({ error: 'Chat not found'})
        }

    res.status(200).json({ history: chatDoc.data().messages });

     } catch (error) {
        console.error('Error to fetch chat history: ' + error.message)
        res.status(500).json({ error: 'Error from server' })
     }
});

/* Inicializando o servidor na porta 3000 */
const port = 5000;
app.listen(port, () => console.log(`Servidor está ouvindo na porta ${port}`));