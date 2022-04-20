const express = require('express');

const app = express();

app.use(express.json());

require('./src/models');

const userRouters = require('./src/routers/users');
const postRouters = require('./src/routers/posts');

app.use('/api/users', userRouters);
app.use('/api/posts', postRouters);

app.get('*', (req, res) => {
  res.status(404).json({ message: '404 Not Found' });
})

app.listen(3000);