const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/todos', todosRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4001;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI in environment');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB Successfully!');

  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
