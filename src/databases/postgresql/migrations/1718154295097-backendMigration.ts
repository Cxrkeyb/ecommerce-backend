import { MigrationInterface, QueryRunner } from "typeorm";

export class BackendMigration1718154295097 implements MigrationInterface {
    name = 'BackendMigration1718154295097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" double precision NOT NULL, "stock" integer NOT NULL, "image" text NOT NULL, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bebc9158e480b949565b4dc7a8" ON "product" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_bebc9158e480b949565b4dc7a8"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
