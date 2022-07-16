import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { InformationModule } from './information/information.module';
import { ChatGatewayModule } from './chat-gateway/chat-gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .default('development')
          .valid('development', 'production', 'test', 'staging'),
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().required().default('localhost'),
        DB_PORT: Joi.number().required().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().default(false),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().required(),
        JWT_ALGORITHM: Joi.string().default('HS256'),
      }),
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    AuthModule,
    UserModule,
    MessageModule,
    InformationModule,
    ChatGatewayModule,
  ],
})
export class AppModule {}
