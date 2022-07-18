import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerOptions } from 'typeorm';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export class TypeOrmConfig {
  static getOrmConfig = (
    configService: ConfigService,
  ): TypeOrmModuleOptions => {
    const result: TypeOrmModuleOptions = {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      logging: TypeOrmConfig.logging(configService),
      migrations: ['dist/database/migrations/**/*{.ts,.js}'],
      migrationsRun: true,
      migrationsTableName: 'migrations',
      synchronize: false,
      dropSchema: false,
      ssl: TypeOrmConfig.isProduction(configService)
        ? { rejectUnauthorized: false }
        : false,
    };
    return result;
  };
  static isProduction = (configService: ConfigService): boolean => {
    return configService.get('NODE_ENV') === 'production';
  };

  static logging = (configService: ConfigService): LoggerOptions => {
    return TypeOrmConfig.isProduction(configService)
      ? ['error', 'warn', 'migration']
      : 'all';
  };
}

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
