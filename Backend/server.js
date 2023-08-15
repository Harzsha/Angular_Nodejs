const express = require('express');
const cors = require('cors'); // Import the cors package
const encryptionUtils = require('./encryptionUtils');
const app = express();
const port = 3000; // Change this to your desired port
const mongoConenct = require('./MongoDBConnection');
app.use(cors())
app.get('/api/data', (req, res) => {
  const dataToEncrypt = { name: 'harsha', place:"Bangalore" };
  const encryptedData = encryptionUtils.encrypt(dataToEncrypt);
  console.log(encryptedData)
  res.json(encryptedData);
});

app.get('/api/decrypt/:encryptedData', (req, res) => {
  const decryptedData = encryptionUtils.decrypt(req.params.encryptedData);
  res.json({ decryptedData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
mongoConenct.mongodb();




