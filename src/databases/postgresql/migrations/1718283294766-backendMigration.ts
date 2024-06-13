import { MigrationInterface, QueryRunner } from "typeorm";

export class BackendMigration1718283294766 implements MigrationInterface {
    name = 'BackendMigration1718283294766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updatedAt"`);
    }

}
