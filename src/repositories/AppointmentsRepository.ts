// Arquivo que é responsável por tudo que vai mexer nos dados de agendamento de alguma forma
// Detentor das operações que irá fazer encima dos dados da aplicação

import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

// typeorm já possui os metodos create, update...

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
