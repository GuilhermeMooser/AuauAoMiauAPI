import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../env-config/env-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from '../env-config/env-config.service';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { AdopterSchema } from '@/adopter/infrastructure/adopter.schema';
import { AdopterAddressSchema } from '@/adopter-address/infrastructure/adopter-address.schema';
import { AdopterContactSchema } from '@/adopter-contact/infrastructure/adopter-contact.schema';
import { AnimalSchema } from '@/animals/infrastructure/animal.schema';
import { TermSchema } from '@/terms/infrastructure/term.schema';
import { CitySchema } from '@/city/infrastructure/city.schema';
import { StateUfSchema } from '@/state-uf/infrastructure/state-uf.schema';
import { UserSchema } from '@/user/infrastructure/user.schema';
import { UserRoleSchema } from '@/user-role/infrastructure/user-role.schema';
import { SessionSchema } from '@/session/infrastructure/session.schema';

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

          entities: [
            AdopterSchema,
            AdopterAddressSchema,
            AdopterContactSchema,
            AnimalSchema,
            TermSchema,
            CitySchema,
            StateUfSchema,
            UserSchema,
            UserRoleSchema,
            SessionSchema,
          ],

          migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
          migrationsTableName: 'migrations_history',
          migrationsRun: configService.getDbMigrationsRun(),
          migrationsTransactionMode: 'each',

          synchronize: false,
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
