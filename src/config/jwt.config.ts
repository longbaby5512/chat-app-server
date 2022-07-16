import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export class JwtConfig {
  static getJwtConfig(configService: ConfigService): JwtModuleOptions {
    const result: JwtModuleOptions = {
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get('JWT_EXPIRES_IN')}s`,
        algorithm: configService.get('JWT_ALGORITHM'),
      },
    };
    return result;
  }
}

export const jwtConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    JwtConfig.getJwtConfig(configService),
};
