import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './middlewares/passport';
import authRouter from './routes/auth/auth.router';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

const app = express();

dotenv.config();
passportConfig();

app.use(morgan('dev'));

app.use(helmet());

// const sessionDB = mongoose
// 	.createConnection('mongodb://127.0.0.1:27017/mern_auth_sessions')
// 	.then((m) => m.connection.getClient());

mongoose.connect('mongodb://127.0.0.1:27017/mern_auth', () => {
	console.log('Connected to Database');
});
// mongoose.connect('mongodb://127.0.0.1:27017/mern_auth', () => {
// 	console.log('Connected to Database');
// });

app.use(cors());
// app.use(
// 	session({
// 		secret: 'somethingsecretgoeshere',
// 		resave: false,
// 		saveUninitialized: true,
// 		// store: MongoStore.create({
// 		// 	clientPromise: sessionDB,
// 		// 	stringify: false,
// 		// }),
// 		cookie: {
// 			secure: true,
// 		},
// 	})
// );

// app.use(cookieParser());
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/auth', authRouter);

export default app;
