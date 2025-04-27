// getapikey.js
const fs = require('fs');
const path = require('path');

function generateApiKey(length = 20) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}

function saveApiKey(key) {
  fs.writeFileSync(path.join(__dirname, 'key.txt'), key);
  fs.writeFileSync(path.join(__dirname, 'key.json'), JSON.stringify({ apiKey: key }, null, 2));
}

function loadOrCreateApiKey() {
  const keyPath = path.join(__dirname, 'key.json');
  if (fs.existsSync(keyPath)) {
    const data = fs.readFileSync(keyPath);
    const json = JSON.parse(data);
    return json.apiKey;
  } else {
    const newKey = generateApiKey();
    saveApiKey(newKey);
    return newKey;
  }
}

module.exports = loadOrCreateApiKey;
