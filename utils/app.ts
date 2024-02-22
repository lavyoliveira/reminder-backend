import express from 'express';
import remindersRoutes from '../src/routes/reminders';

const app = express();

app.use(express.json());

// Configuração das rotas
app.use('/reminders', remindersRoutes);

export default app;