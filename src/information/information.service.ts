import { InformationEntity } from './serializers/information.serializer';
import { InformationRepository } from './information.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveInformationDto } from './dto/save.dto';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(InformationRepository)
    private readonly informationRepository: InformationRepository,
  ) {}

  async findAll(relations?: string[], throws?: boolean) {
    return await this.informationRepository.findAllEntities(relations, throws);
  }

  async create(inputs: SaveInformationDto) {
    return await this.informationRepository.createEntity(inputs);
  }

  async findById(id: number, relations?: string[], throws?: boolean) {
    return await this.informationRepository.findEntityById(
      id,
      relations,
      throws,
    );
  }

  async findSocketId(userId: number[]) {
    return await this.informationRepository.findSocketId(userId);
  }

  async update(
    Information: InformationEntity,
    inputs: SaveInformationDto,
  ): Promise<InformationEntity> {
    return await this.informationRepository.updateEntity(Information, inputs);
  }

  async deleteById(id: number) {
    return await this.informationRepository.deleteEntityById(id);
  }

  async deleteByValue(userId: number, socketId: string) {
    return await this.informationRepository.deleteByValue(userId, socketId);
  }
}
