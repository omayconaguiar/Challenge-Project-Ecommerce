import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { userRouter } from './controllers/user.controller';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middlewares padrões para segurança e parse de JSON
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas de usuários (exemplo)
app.use('/api/users', userRouter);

// Middleware de tratamento de erros
app.use(errorHandler);

export { app };
