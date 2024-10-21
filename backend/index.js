const express = require('express');
const cors = require('cors');
const { runGeminiAI } = require('./gemini/Api');
const { db } = require('./FirebaseConfig/FirebaseConfig');
const { ref, get, child, push } = require('firebase/database');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

/* socket.io instance */
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Apollo Chat API' });
});

let isProcessing = false; /* flag to avoid multiples */

app.post('/chat', async (req, res) => {
  const { text, chatId } = req.body;

  if (!chatId) {
    return res.status(400).json({ error: 'Chat ID is required' });
  }

  if (isProcessing) {
    return res.status(429).json({ error: 'Request already in process' });
  }

  isProcessing = true; /* initialize proccess */

  try {
    const result = await runGeminiAI(text);
    const newMessage = {
      user: text,
      ai: result,
    };

    await push(ref(db, `chats/${chatId}`), newMessage);

    /* emitting only for the clients in the chat with the specific id */
    io.to(chatId).emit('newMessage', newMessage);

    res.status(200).json({ text: result });
  } catch (error) {
    console.error('Erro ao processar o chat:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  } finally {
    isProcessing = false; /* allow the proccess */
  }
});

app.get('/chats', async (req, res) => {
  try {
    const chatsSnapshot = await get(ref(db, 'chats'));
    if (!chatsSnapshot.exists()) {
      return res.status(404).json({ error: 'No chats found' });
    }

    const chats = chatsSnapshot.val();
    res.status(200).json({ chats });
  } catch (error) {
    console.error('Erro ao recuperar chats:', error.message);
    res.status(500).json({ error: 'Error retrieving chats', details: error.message });
  }
});

app.get('/chats/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const chatSnapshot = await get(child(ref(db), `chats/${id}`));
    if (!chatSnapshot.exists()) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const messagesObj = chatSnapshot.val();
    const messagesArray = Object.values(messagesObj);
    res.status(200).json({ messages: messagesArray });
  } catch (error) {
    console.error('Erro ao buscar chat:', error.message);
    res.status(500).json({ error: 'Error from server' });
  }
});

/* handle connections between clients and socket.io */
io.on('connection', (socket) => {
  console.log('Novo cliente conectado', socket.id);

  /* handle the event "joinchat" */
  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
    console.log(`Cliente ${socket.id} entrou no chat ${chatId}`);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });
});

const port = 5000;
server.listen(port, () => console.log(`Servidor está ouvindo na porta ${port}`));