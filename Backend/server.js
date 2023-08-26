const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const encryptionUtils = require('./encryptionUtils');
const app = express();
const port = 3000; // Change this to your desired port
const mongoConenct = require('./MongoDBConnection');
app.use(cors());
app.use(bodyParser.json());
const User = require('./models/User'); // Create a User schema using mongoose
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



app.post('/api/register', async (req, res) => {
  try {
    console.log(req.body)
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});
mongoConenct.mongodb();




