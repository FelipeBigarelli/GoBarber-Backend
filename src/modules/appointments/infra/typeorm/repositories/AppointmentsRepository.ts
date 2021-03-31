// Arquivo que é responsável por tudo que vai mexer nos dados de agendamento de alguma forma
// Detentor das operações que irá fazer encima dos dados da aplicação

import { getRepository, Repository, Raw } from 'typeorm';
// Raw: escrever condição/texto que será diretamente passado pro postgres

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

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

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        // resolver problema do mes typeorm (padrão 0 mes 01, 02..)
        // padStart: se a string nao tiver 2 digitos, preencher os faltantes a esquerda com 0
        // ex: 1 -> fica 01
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = this.ormRepository.find({
            where: {
                provider_id,
                //Raw(dateFieldName => vai pegar nome com código gerado automatico do postgres
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });

        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
        });

        return appointments;
    }

    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            provider_id,
            user_id,
            date,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
