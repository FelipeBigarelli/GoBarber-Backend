// Tirar tudo que seja do typeorm
// Usar JavaScript puro para testes
import { v4 as uuid } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment =>
                isEqual(appointment.date, date) &&
                appointment.provider_id === provider_id,
        );

        return findAppointment;
    }

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );

        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );

        return appointments;
    }

    // Criando um agendamento local (somente para testes), sem usar BD
    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id, user_id });
        // Object.assign: junta informações dentro do objeto (mesma coisa do codigo comentado abaixo)
        // appointment.id = uuid();
        // appointment.date = date;
        // appointment.provider_id = provider_id;

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
