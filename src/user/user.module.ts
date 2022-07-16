import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule, TypeOrmExModule.forCustomRepository(UserRepository)],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
