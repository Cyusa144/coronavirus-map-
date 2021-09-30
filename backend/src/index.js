import express from 'express';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import jwt from './config/passport';
import db from './db';
import routes from './routes';

dotenv.config();

const port = process.env.PORT || 4000;
const { DB_HOST } = process.env;

const app = express();
db.connect(DB_HOST);
app.use(cors());
app.use(passport.initialize());
jwt(passport);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);

app.get('/', (req, res) => res.send('Welcome to food preservation API'));
app.listen({ port }, () => {
  console.log(`Server running at http://localhost:${port}`);
});
