import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('combined'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Movie Vault!');
});

export default app;