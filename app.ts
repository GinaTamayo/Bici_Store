import express from "express";
import bodyParser from 'body-parser';
import morgan from "morgan"
import register from './routes/register';
import auth from './routes/auth';
import updateProfile from './routes/updateProfile'
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

dotenv.config();

const app = express().use(bodyParser.json());

app.use(morgan('dev'))
app.use(cookieParser())
app.use('/register', register);
app.use('/auth', auth);
app.use('/updateProfile', updateProfile);


const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});
