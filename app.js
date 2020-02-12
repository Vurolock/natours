const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'server says hi', app: 'natours' });
});

app.post('/', (req, res) => {
  res.send('post here!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
