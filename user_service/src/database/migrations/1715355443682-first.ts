import { MigrationInterface, QueryRunner } from "typeorm";

export class First1715355443682 implements MigrationInterface {
    name = 'First1715355443682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_tariff" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "tariff_id" integer NOT NULL, "started_at" TIMESTAMP NOT NULL, "ended_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_615b026db430cf9da3d6040afb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "phone" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "park_id" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "avatar" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_tariff"`);
    }

}
