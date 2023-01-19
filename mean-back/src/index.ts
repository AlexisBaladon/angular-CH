import express from 'express';
import cors from 'cors';
//import conn from './db/conn';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.routes';
import corsCredentials from './middlewares/cors.middleware';
import corsOptions from './config/corsOptions';
import cookieParser from 'cookie-parser';

dotenv.config({ path: "./config.env" });
const app = express();
const port = Number.parseInt(process.env.PORT) || 5000;

app.use(corsCredentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use('/api', apiRoutes)

app.listen(port, () => {
  // perform a database connection when server starts
  //conn.connectToDatabase((err: Error) => {
  //  if (err) console.error(err);
  //});
  console.log(`Server is running on port: ${port}`);
});