import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmExModule.forCustomRepository(MessageRepository),
    UserModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, JwtStrategy],
  exports: [MessageService],
})
export class MessageModule {}
