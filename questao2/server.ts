import dotenv from 'dotenv';
dotenv.config();    
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import usersRouter from './src/modules/users/infra/http/routes/user.routes';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/users', usersRouter);


app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});

export default app;
