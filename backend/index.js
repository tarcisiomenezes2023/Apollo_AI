const express = require('express'); 
const cors = require('cors');
const { runGeminiAI } = require('./gemini/Api');
const { db } = require('./FirebaseConfig/FirebaseConfig');
const { ref, get, child, push } = require('firebase/database'); // Importando 'push'
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Apollo Chat API' });
})

app.post('/chat', async (req, res) => {
    const { text, chatId } = req.body;
  
    if (!chatId) {
      return res.status(400).json({ error: 'Chat ID is required' });
    }
  
    try {
      const result = await runGeminiAI(text);
      const newMessage = {
        user: text,
        ai: result,
      };
  
      // Salva a nova mensagem no Firebase
      await push(ref(db, `chats/${chatId}`), newMessage);
  
      // Retorna a resposta gerada ao frontend
      res.status(200).json({ text: result });
    } catch (error) {
      console.error("Erro ao processar o chat:", error.message);
      res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
  });

// Rota para obter todos os chats
app.get('/chats', async (req, res) => {
  try {
    const chatsSnapshot = await get(ref(db, 'chats'));
    if (!chatsSnapshot.exists()) {
      return res.status(404).json({ error: 'No chats found' });
    }

    const chats = chatsSnapshot.val();
    res.status(200).json({ chats });
  } catch (error) {
    console.error("Erro ao recuperar chats:", error.message);
    res.status(500).json({ error: 'Error retrieving chats', details: error.message });
  }
});

// Rota para obter um chat específico pelo ID
// Rota para obter um chat específico pelo ID
app.get('/chats/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const chatSnapshot = await get(child(ref(db), `chats/${id}`));
      if (!chatSnapshot.exists()) {
        return res.status(404).json({ error: 'Chat not found' });
      }
  
      // Obtém as mensagens diretamente
      const messagesObj = chatSnapshot.val();
      // Converte o objeto de mensagens em um array
      const messagesArray = Object.values(messagesObj);
      res.status(200).json({ messages: messagesArray }); // Retorna as mensagens como um array
    } catch (error) {
      console.error("Erro ao buscar chat:", error.message);
      res.status(500).json({ error: 'Error from server' });
    }
  });
  

const port = 5000;
app.listen(port, () => console.log(`Servidor está ouvindo na porta ${port}`));