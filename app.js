// Import necessary modules
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes for main site
import indexRouter from './src/routes/indexRoute.js';
import userRouter from './src/routes/userRoute.js';

// Import routes for dashboard
import dashboardRouter from './src/routes/dashboard/dashboardRoute.js';
import loginRouter from './src/routes/dashboard/loginRoute.js';
import { isAuthenticated } from './src/middleware/authenticationMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: '42a6401f2aea4e019fd5ab45681b4d29',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.isAuthenticated = !!req.session.user;
    res.locals.currentUser = req.session.user || null;

    // Set layout based on route
    if(req.path.startsWith('/dashboard/login')) {
        res.locals.layout = './layouts/blank';
    } else if (req.path.startsWith('/dashboard')) {
        res.locals.layout = './layouts/dashboard';
    } else {
        res.locals.layout = './layouts/main';
    }

    next();
})

// Template engine setup
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Routes
app.use('/', indexRouter);
app.use('/', userRouter);

app.use('/', loginRouter);
app.use('/', isAuthenticated, dashboardRouter);

export default app;