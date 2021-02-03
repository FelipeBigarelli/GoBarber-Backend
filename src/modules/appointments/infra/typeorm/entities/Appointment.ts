/* eslint-disable camelcase */
// import { uuid } from 'uuidv4';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'; // model que vai ser salvo no BD

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments') //Como se fosse uma funcao, e como parametro, passa a class abaixo como parametro
class Appointment {
    @PrimaryGeneratedColumn('uuid') //substitui o uuid()
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User) //Muitos agendamentos para um user
    @JoinColumn({ name: 'provider_id' }) //info do obj q é relacionado isso aqui
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Ao criar uma Entity do typeorm, o constructor é criado automaticamente
    // constructor({ provider, date }: Omit<Appointment, 'id'>) {
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date;
    // }
}

export default Appointment;
