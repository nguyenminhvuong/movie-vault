import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import morgan from 'morgan';

import indexRouter from './src/routes/indexRoute.js';
import userRouter from './src/routes/userRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Template engine setup
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Routes
app.use('/', indexRouter);
app.use('/', userRouter);

export default app;