async function encryptText() {
    const inputText = document.getElementById('inputText').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/encrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText, password: password })
    });
    const data = await response.json();
    document.getElementById('encryptedText').value = data.encryptedText;
}

async function decryptText() {
    const encryptedText = document.getElementById('encryptedText').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/decrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ encryptedText: encryptedText, password: password })
    });
    const data = await response.json();
    document.getElementById('decryptedText').value = data.decryptedText;
}

