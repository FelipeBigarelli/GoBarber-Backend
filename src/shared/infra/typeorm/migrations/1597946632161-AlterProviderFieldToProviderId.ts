import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1597946632161
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider', //nome para fazer o down
                columnNames: ['provider_id'], //qual coluna receberá a chave estrangeira
                referencedColumnNames: ['id'], //qual o nome da coluna na tabela d user q vai representar o userID
                referencedTableName: 'users', //tabela users
                onDelete: 'SET NULL', //oq vai acontecer caso o user seja deletado
                onUpdate: 'CASCADE', //caso o ID tenha alterado (raro)
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // desfazer item por item ao contrario
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }
}
