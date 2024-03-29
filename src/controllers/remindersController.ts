import { Request, Response } from 'express';

import ReminderServices from '../services/services';

export default class RemindersController{
    async getAllReminders(req: Request, res: Response) {
        const reminderServices = new ReminderServices();
        try {
            const reminders = await reminderServices.getAllReminders();
            return res.json(reminders); // Retornar o resultado usando res.json()
        } catch (error) {
            console.error('Erro ao obter os lembretes do banco de dados:', error);
            return res.status(500).json({ error: 'Erro ao obter os lembretes do banco de dados.' });
        }
    }

    async addReminder(req: Request, res: Response) {
        const reminderServices = new ReminderServices();
        try {        
            const { name, date } = req.body;

            const newReminder = await reminderServices.addReminder(name, date);

            return res.status(201).json(newReminder);
        } catch (error) {
            console.error('Erro ao adicionar o lembrete:', error);
            return res.status(500).json({ error: 'Erro ao adicionar o lembrete.' });
        }
    }

    async deleteReminder(req: Request, res: Response) {
        const reminderServices = new ReminderServices();
        try {
            const id = req.params.id;

            await reminderServices.deleteReminder(id);

            return res.json({ message: 'Lembrete deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar o lembrete:', error);
            return res.status(500).json({ error: 'Erro ao deletar o lembrete.' });
        }
    }
    
}