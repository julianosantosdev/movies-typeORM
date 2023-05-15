import 'express-async-errors';
import 'reflect-metadata';
import express, { Application, json } from 'express';
import { movieRouter } from './routes/movies.routes';
import { handleErrors } from './error';

const app: Application = express();
app.use(json());
app.use('/movies', movieRouter);
app.use(handleErrors);

export default app;
