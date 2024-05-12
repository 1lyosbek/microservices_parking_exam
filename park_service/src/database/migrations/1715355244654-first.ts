import { MigrationInterface, QueryRunner } from "typeorm";

export class First1715355244654 implements MigrationInterface {
    name = 'First1715355244654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tariffs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "park_id" integer NOT NULL, "price" numeric NOT NULL, "time" integer NOT NULL, CONSTRAINT "PK_7f32baf8d8b4bb0cf4d7ac97741" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parks" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "owner" integer NOT NULL, "image" integer NOT NULL, CONSTRAINT "PK_035f21558c39565edbf33f03210" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "park_id" integer NOT NULL, "user_id" integer NOT NULL, "started_at" TIMESTAMP NOT NULL, "ended_at" TIMESTAMP, "price" integer NOT NULL, "tariff_id" integer, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "layers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "floor" integer, "park_id" integer NOT NULL, CONSTRAINT "PK_611c9a60a779f18c5e55e1f31b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "places" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "layer_id" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "places"`);
        await queryRunner.query(`DROP TABLE "layers"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "parks"`);
        await queryRunner.query(`DROP TABLE "tariffs"`);
    }

}
