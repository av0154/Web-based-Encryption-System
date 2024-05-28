'use strict';

const crypto = require('crypto');

const IV_LENGTH = 16; // For AES, this is always 16
const SALT_LENGTH = 16; // Length of salt for key derivation
const ITERATIONS = 10000; // Number of iterations for PBKDF2

function getKeyFromPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256');
}

function encrypt(text, password) {
    const salt = crypto.randomBytes(SALT_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);
    const key = getKeyFromPassword(password, salt);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return salt.toString('hex') + ':' + iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text, password) {
    const textParts = text.split(':');
    const salt = Buffer.from(textParts.shift(), 'hex');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const key = getKeyFromPassword(password, salt);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = { encrypt, decrypt };

