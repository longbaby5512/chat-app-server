import { ChatGateway } from './chat-gateway.gateway';
import { ConfigModule } from '@nestjs/config';
import { InformationModule } from '../information/information.module';
import { jwtConfig } from '../config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { MessageModule } from '../message/message.module';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.registerAsync(jwtConfig),
    MessageModule,
    InformationModule,
  ],
  providers: [ChatGateway],
})
export class ChatGatewayModule {}
