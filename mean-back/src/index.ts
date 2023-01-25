import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database/conn';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.routes';
import corsCredentials from './middlewares/cors.middleware';
import corsOptions from './config/corsOptions';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

dotenv.config({ path: "./config.env" });
const app = express();
const port = Number.parseInt(process.env.PORT) || 5000;

app.use(morgan('dev'))
app.use(corsCredentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.listen(port, () => {
  connectToDatabase().then(() => {
    app.use('/api', apiRoutes)
    console.log(`Successfully connected to database`);
  }).catch((err) => {
    console.log(`Error connecting to database: ${err}`);
  });
  console.log(`Server is running on port: ${port}`);
});