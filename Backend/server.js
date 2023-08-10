const express = require('express');
const app = express();
const port = 3000; // Change this to your desired port

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the our backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
