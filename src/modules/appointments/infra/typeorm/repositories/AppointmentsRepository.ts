// Arquivo que é responsável por tudo que vai mexer nos dados de agendamento de alguma forma
// Detentor das operações que irá fazer encima dos dados da aplicação

import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

// typeorm já possui os metodos create, update...

// SOLID - L: Liskov Substitution Principle:
// camadas de integrações com bibliotecas, devem ser substituível
// por um conjunto de regras (no caso, seria o IAppointmentsRepository)

// Criar métodos na mão
class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
