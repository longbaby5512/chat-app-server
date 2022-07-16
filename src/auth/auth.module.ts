import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '../config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
