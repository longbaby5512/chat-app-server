import { ConfigModule } from '@nestjs/config';
import { InformationController } from './information.controller';
import { InformationRepository } from './information.repository';
import { InformationService } from './information.service';
import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../database/typeorm-ex.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmExModule.forCustomRepository(InformationRepository),
  ],
  providers: [InformationService],
  controllers: [InformationController],
  exports: [InformationService],
})
export class InformationModule {}
