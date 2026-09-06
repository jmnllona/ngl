declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    EMAIL_USER?: string;
    EMAIL_PASS?: string;
    SECRET_KEY?: string;

    DB_USER?: string;
    DB_HOST?: string;
    DB_NAME?: string;
    DB_PASSWORD?: string;
    DB_PORT?: string;
    DATABASE_URL?: string;
  }
}