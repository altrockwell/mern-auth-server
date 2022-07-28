import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './middlewares/passport';
import authRouter from './routes/auth/auth.router';

const app = express();

dotenv.config();

const googleStrategyConfig = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: '/auth/google/callback',
};

passportConfig(googleStrategyConfig);

app.use(morgan('dev'));
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: 'GET,POST,PUT,DELETE',
		credentials: true,
	})
);
app.use(helmet());

app.use(
	session({
		secret: 'somethingsecretgoeshere',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/auth', authRouter);

export default app;
