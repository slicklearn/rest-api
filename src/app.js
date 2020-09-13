// Libs
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as sesMw from './middlewares/sessions';
import config from './config.json';
import pkg from '../package.json';

// Route imports
import authRouter from "./routes/auth.routes";
import accountRouter from "./routes/account.routes";
import defaultRouter from "./routes/default.routes";

// Objects
const app = express();

// Settings
app.set('port', 2000);
app.set('pkg', pkg);

// Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(helmet());
app.use(session({
    secret: config.token_secret_word,
    resave: true,
    saveUninitialized: true
}));
app.use(sesMw.injectSession);

// Routes
app.use("/account", accountRouter);
app.use("/auth", authRouter);
app.use(defaultRouter);

export default app;