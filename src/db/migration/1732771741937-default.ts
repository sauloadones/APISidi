import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1732771741937 implements MigrationInterface {
    name = 'Default1732771741937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "checkin" ("id" int NOT NULL IDENTITY(1,1), "userId" uniqueidentifier NOT NULL, "timestamp" datetime2 NOT NULL CONSTRAINT "DF_99c481962c80c274a145fe1985d" DEFAULT getdate(), CONSTRAINT "PK_ceddab0cc0235c228a841bac49e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "checkin" ADD CONSTRAINT "FK_f0e7ca175107dbc1be7f0540a1e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "checkin" DROP CONSTRAINT "FK_f0e7ca175107dbc1be7f0540a1e"`);
        await queryRunner.query(`DROP TABLE "checkin"`);
    }

}
