import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// OBS: só pode alterar uma migration se ainda não foi pro controle de versão

export default class CreateAppointments1597854024582
    implements MigrationInterface {
    // UP: o que quer fazer no BD quando essa migration for executada
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        //coluna do ID
                        name: 'id',
                        type: 'uuid', // uuid
                        isPrimary: true,
                        generationStrategy: 'uuid', //gerar o campo id automatico sendo uuid
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone', //salva alem do horario, o fuso horario desse hrrio tb
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    // Utilizar como um fall back: se acontecer um problema e precisa voltar atrás da migration?
    // Método para desfazer o que fez no método UP
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }
}
