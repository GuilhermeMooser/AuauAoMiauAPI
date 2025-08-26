import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../env-config/env-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from '../env-config/env-config.service';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      useFactory: (configService: EnvConfigService) => {
        const baseConfig: DataSourceOptions = {
          type: 'postgres',
          host: configService.getDbHost(),
          port: configService.getDbPort(),
          username: configService.getDbUsername(),
          password: configService.getDbPassword(),
          database: configService.getDbName(),

          entities: configService.isDevelopment()
            ? [join(__dirname, '/../../**/*.schema{.ts,.js}')]
            : [join(__dirname, '/../../**/*.schema.js')],

          migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
          migrationsTableName: 'migrations_history',
          migrationsRun: configService.getDbMigrationsRun(),
          migrationsTransactionMode: 'each',

          synchronize: configService.getDbSynchronize(),
          // dropSchema: configService.getDbDropSchema(),
          logging: configService.getDbLogs()
            ? configService.isProduction()
              ? ['error', 'warn']
              : 'all'
            : false,
          logger: configService.isDevelopment() ? 'advanced-console' : 'file',

          maxQueryExecutionTime: configService.getDbQueryTimeout(),

          extra: {
            max: configService.getDbMaxConnections(),
            min: configService.getDbMinConnections(),
            acquire: configService.getDbConnectionTimeout(),
            idle: 10000,
            evict: 60000,
            handleDisconnects: true,
          },

          // SSL para produção
          // ssl: configService.getDbSslEnabled()
          //   ? {
          //       rejectUnauthorized: false,
          //     }
          //   : false,
          ssl: false,
        };

        return baseConfig;
      },
      inject: [EnvConfigService],
    }),
  ],
  // providers: [DatabaseService],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
