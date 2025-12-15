import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import morgan from 'morgan';


const app = express();

app.use(morgan('dev'));
app.use(express.json());

//Template engine setup
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Welcome to Movie Vault!');
});

export default app;