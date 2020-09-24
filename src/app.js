// Library imports
import conLengthValidator from "express-content-length-validator";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import redis from 'redis';
import session from 'express-session';

// Middleware imports
import * as sesMw from './middlewares/sessions';

// File imports
import config from './config.json';
import pkg from '../package.json';

// Route imports
import authRouter from "./routes/auth.routes";
import accountRouter from "./routes/account.routes";
import profileRouter from "./routes/profile.routes";
import defaultRouter from "./routes/default.routes";

// Objects
const RedisStore = require('connect-redis')(session);
const RedisClient = redis.createClient();
const app = express();

// Settings
app.set('trust proxy', 1);
app.set('port', 2000);
app.set('pkg', pkg);

// Middleware settings
config.session.store = new RedisStore({ client: RedisClient });

// Middlewares
app.use(conLengthValidator.validateMax(config.content_length_validator));
app.use(rateLimit(config.ratelimit));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors(config.cors))
app.use(helmet());
app.use(session(config.session));
app.use(sesMw.injectSession);

// Routes
app.use("/account", accountRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use(defaultRouter);

export default app;