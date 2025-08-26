export type NodeEnv = 'production' | 'development';

export interface EnvConfig {
  //App
  getAppPort(): number;
  getNodeEnv(): NodeEnv;

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
}
