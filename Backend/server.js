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
const Register = require('./models/Register'); // Create a User schema using mongoose
app.get('/api/data', (req, res) => {
  const dataToEncrypt = { name: 'harsha', place: "Bangalore" };
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
    const user = new Register({
      username: req.body.firstName,
      password: req.body.password,
      dateofBirth: req.body.dob,
      email: req.body.email,
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const user = await Register.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed 1' });
    }
    const passwordMatch = req.body.password;
    if (passwordMatch != user.password) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
// const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
res.status(200).json({ message: 'Authentication Success' });

  } catch (error) {

    res.status(500).json({ error: 'Authentication failed' });

  }

});
mongoConenct.mongodb();




