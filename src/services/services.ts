import db from '../../utils/repository';
import { Reminder } from '../models/Reminder';
import { getDay } from 'date-fns';

export default class ReminderServices {
    async getAllReminders() {
        try {
            const remindersSnapshot = await db.collection('reminders').get();

            // array para armazenar os dados dos lembretes
            const remindersData: Reminder[] = [];

            remindersSnapshot.forEach(doc => {
                const reminderData = doc.data();
            
                const reminder: Reminder = {
                    id: doc.id,
                    name: reminderData.name,
                    date: reminderData.date.toDate(),
                    day_of_the_week: reminderData.day_of_the_week
                };
            
                remindersData.push(reminder);
            });        

            return remindersData;
        } catch (error) {
            throw new Error('Erro ao obter os lembretes do banco de dados.');
        }
    }

    async addReminder(name: string, date: string | Date) {

        // se a data for uma string, converte para Date. se a data já for um Date, atribui diretamente
        let formattedDate: Date;
        if (typeof date === 'string') {
            formattedDate = new Date(date); 
        } else {
            formattedDate = date;
        }
        console.log(formattedDate);

        const dayOfWeek = getDay(formattedDate) + 1;

        const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const dayOfWeekString = weekdays[dayOfWeek];

        // cria o lembrete com os dados da requisição
        const newReminder: Reminder = {
            name: name,
            date: formattedDate,
            day_of_the_week: dayOfWeekString
        };

        // adiciona documento a coleção
        // await db.collection('reminders').add(newReminder);
        const reminder = await db.collection('reminders').add(newReminder);
        newReminder.id = reminder.id;
        return newReminder;
    }

    async deleteReminder(id: string) {
        // exclui documento da coleção
        await db.collection('reminders').doc(id).delete();
    }

}
