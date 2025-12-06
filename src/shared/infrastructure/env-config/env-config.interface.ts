export type NodeEnv = 'production' | 'development';
export type CookiesSameSite = 'lax' | 'none' | 'strict';

export interface EnvConfig {
  //App
  getAppPort(): number;
  getNodeEnv(): NodeEnv;
  getCookieSecret(): string;

  //Database
  getDbPort(): number;
  getDbUsername(): string;
  getDbPassword(): string;
  getDbName(): string;
  getDbHost(): string;
  getDbLogs(): boolean;

  //Prod
  getDbSslEnabled(): boolean;
  getDbMaxConnections(): number;
  getDbMinConnections(): number;
  getDbConnectionTimeout(): number;
  getDbQueryTimeout(): number;
  getDbSynchronize(): boolean;
  getDbMigrationsRun(): boolean;
  // getDbDropSchema(): boolean;
  getCookieSecret(): string;
  getEncryptionSalts(): number;
  getJwtExpiresInSeconds(): number;
  getJwtSecret(): string;
  getCookieSecure(): boolean;
  getCookieDomain(): string;
  getCookieSameSite(): CookiesSameSite;
}
