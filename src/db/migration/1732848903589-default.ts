import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1732848903589 implements MigrationInterface {
    name = 'Default1732848903589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_a3ffb1c0c8416b9fc6f907b7433" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_204e9b624861ff4a5b268192101" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "baterponto" ("id" int NOT NULL IDENTITY(1,1), "userId" nvarchar(255) NOT NULL, "checkInHorario" nvarchar(255) NOT NULL, "checkOutHorario" nvarchar(255) NOT NULL, "intervalEntradaHorario" nvarchar(255) NOT NULL, "checkInData" nvarchar(255) NOT NULL, "checkOutData" nvarchar(255) NOT NULL, "intervalEntradaData" nvarchar(255) NOT NULL, "intervalSaidaData" nvarchar(255) NOT NULL, "intervalSaidaHorario" nvarchar(255) NOT NULL, CONSTRAINT "PK_fb4b670368d0546fa4a97896ad2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "baterponto"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}