import { DataSource, DataSourceOptions } from "typeorm";
import config from "@/config";
import { models } from "./entities/";

const isProduction = process.env.NODE_ENV === "production";

const options: DataSourceOptions = {
  ...config.databases.postgresql,
  synchronize: false,
  logging: false,
  dropSchema: false,
  type: "postgres",
  maxQueryExecutionTime: 1000,
  entities: models,
  subscribers: !isProduction ? ["src/**/subscribers/*.ts"] : ["dist/**/subscribers/*.js"],
  migrations: config.env.isMigrationEnv
    ? ["src/databases/postgresql/migrations/*.ts"]
    : ["dist/databases/postgresql/migrations/*.js"],
  extra: {
    connectionLimit: 10
  },
  // @ts-expect-error Check types
  cli: {
    migrationsDir: "./src/databases/postgresql/migrations/"
  }
};

const source = new DataSource(options);
void source.initialize();

export default source;
