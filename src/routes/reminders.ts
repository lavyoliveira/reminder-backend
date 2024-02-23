import express from 'express';

import RemindersController from '../controllers/remindersController';

const router = express.Router();

const remindersController = new RemindersController();

// Rota para obter todos os lembretes
router.get('/', remindersController.getAllReminders);

// Rota para adicionar um lembrete
router.post('/', remindersController.addReminder);

// Rota para excluir um lembrete
router.delete('/:id', remindersController.deleteReminder);

export default router;