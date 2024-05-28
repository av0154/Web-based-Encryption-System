const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { encrypt, decrypt } = require('./encryption');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/encrypt', (req, res) => {
    const { text, password } = req.body;
    if (!text || !password) {
        return res.status(400).send('Text and password are required');
    }
    const encryptedText = encrypt(text, password);
    res.send({ encryptedText });
});

app.post('/decrypt', (req, res) => {
    const { encryptedText, password } = req.body;
    if (!encryptedText || !password) {
        return res.status(400).send('Encrypted text and password are required');
    }
    try {
        const decryptedText = decrypt(encryptedText, password);
        res.send({ decryptedText });
    } catch (error) {
        res.status(400).send('Decryption failed');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

