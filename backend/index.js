const express = require('express');
const { runGeminiAI } = require('./gemini/Api');
const app = express();

/* Middleware for JSON interpreter */
app.use(express.json());

/* Main route (GET) */
app.get('/', (req, res) => {
    res.send('<h1>Hello, world!</h1>');
});

/* Route for the endpoint /chat (POST) */
app.post('/chat', async (req, res) => {
    const { text } = req.body; /* Getting the text sent to the body */
    try {
        const result = await runGeminiAI(text); /* Repassing the text for the function runGeminiAI */
        res.status(200).json(result); /* Sending the response to the client in JSON format */
    } catch (error) {
        console.error('Error running the API script:', error);
        res.status(500).send('Internal Server Error');
    }
});

/* Initialize the server on port 3000 */
const port = 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));