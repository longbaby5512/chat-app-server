import { ConfigModule } from '@nestjs/config'
import { ConversationController } from './conversation.controller'
import { ConversationRepository } from './conversation.repository'
import { ConversationService } from './conversation.service'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'
import { Module } from '@nestjs/common'
import { TypeOrmExModule } from '../database/typeorm-ex.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    ConfigModule,
    TypeOrmExModule.forCustomRepository(ConversationRepository),
    UserModule,
  ],
  providers: [ConversationService, JwtStrategy],
  controllers: [ConversationController],
  exports: [ConversationService],
})
export class ConversationModule {}
