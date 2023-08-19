const CryptoJS = require('crypto-js');
const secretKey = 'your-secret-key';

function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

function decrypt(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

module.exports = {
  encrypt,
  decrypt
};
