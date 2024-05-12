import { MigrationInterface, QueryRunner } from "typeorm";

export class First1715356157177 implements MigrationInterface {
    name = 'First1715356157177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "shot_credit_id" integer NOT NULL, "shot_debit_id" integer NOT NULL, "service_id" integer NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shots" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_40b52561334dcee2a4421b371d7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shots"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
