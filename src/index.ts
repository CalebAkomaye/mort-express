import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import router from './router';
import cors from 'cors';

export const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use('/', router());
app.use(express.urlencoded({ extended: true }));
