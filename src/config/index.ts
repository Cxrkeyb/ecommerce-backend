import dotenv from "dotenv";

dotenv.config();

const config = {
  databases: {
    postgresql: {
      host: process.env.DATABASE_HOST ?? "localhost",
      port: parseInt(process.env.DATABASE_PORT ?? "5432", 10),
      username: process.env.DATABASE_USERNAME ?? "backend",
      password: process.env.DATABASE_PASSWORD ?? "backend",
      database: process.env.DATABASE_NAME ?? "backend"
    }
  },
  web: {
    port: parseInt(process.env.WEB_SERVER_PORT!, 10),
    cookieSecret: process.env.COOKIE_SECRET,
    allowedHosts: ["localhost"],
    appName: process.env.APP_NAME ?? "Backend",
    appUrl: process.env.APP_URL ?? "http://localhost",
    cookieName: process.env.COOKIE_NAME ?? "x-access-token"
  },
  env: {
    isDevEnv: process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "migration",
    isMigrationEnv: process.env.MIGRATION_ENV === "true",
    isScriptEnv: process.env.NODE_ENV === "script",
    isProdEnv: process.env.NODE_ENV === "production"
  },
  jwt: {
    AT_EXPIRE_HR: process.env.JWT_AT_EXPIRE_HR ?? "10 minutes",
    RT_EXPIRE_HR: process.env.JWT_RT_EXPIRE_HR ?? "1 day",
    AT_EXPIRE_TS: parseInt(process.env.JWT_AT_EXPIRE_TS ?? "30000", 10),
    RT_EXPIRE_TS: parseInt(process.env.JWT_RT_EXPIRE_TS ?? "86400000", 10)
  }
};

export default config;
