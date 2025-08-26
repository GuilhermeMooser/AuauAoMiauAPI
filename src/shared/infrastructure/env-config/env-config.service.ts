import { Injectable } from '@nestjs/common';
import { EnvConfig, NodeEnv } from './env-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    return Number(this.configService.get<number>('PORT'));
  }

  getNodeEnv(): NodeEnv {
    return this.configService.get<NodeEnv>('NODE_ENV');
  }

  getDbPort(): number {
    return Number(this.configService.get<number>('DB_PORT'));
  }

  getDbUsername(): string {
    return this.configService.get<string>('DB_USERNAME');
  }

  getDbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  getDbName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  getDbHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  getDbLogs(): boolean {
    return this.configService.get<boolean>('DB_LOGS');
  }

  getDbSslEnabled(): boolean {
    return this.configService.get<boolean>('DB_SSL_ENABLED');
  }

  getDbMaxConnections(): number {
    return this.configService.get<number>('DB_SSLDB_MAX_CONNECTIONS_ENABLED');
  }

  getDbMinConnections(): number {
    return this.configService.get<number>('DB_MIN_CONNECTIONS');
  }

  getDbConnectionTimeout(): number {
    return Number(
      this.configService.get<number>('DB_CONNECTION_TIMEOUT', 30000),
    );
  }

  getDbQueryTimeout(): number {
    return this.configService.get<number>('DB_QUERY_TIMEOUT');
  }

  getDbSynchronize(): boolean {
    return this.configService.get<boolean>('DB_SYNCHRONIZE');
  }

  getDbMigrationsRun(): boolean {
    return this.configService.get<boolean>('DB_MIGRATIONS_RUN');
  }

  // getDbDropSchema(): boolean {
  //   throw new Error('Method not implemented.');
  // }

  isProduction(): boolean {
    return this.getNodeEnv() === 'production';
  }

  isDevelopment(): boolean {
    return this.getNodeEnv() === 'development';
  }
}
