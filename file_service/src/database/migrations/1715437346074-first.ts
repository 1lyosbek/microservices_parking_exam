import { MigrationInterface, QueryRunner } from "typeorm";

export class First1715437346074 implements MigrationInterface {
    name = 'First1715437346074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "url" text NOT NULL, "mimetype" character varying NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
