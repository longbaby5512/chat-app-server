import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from '../common/logger';
import { User } from './entities/user.entity';
import { UserEntity } from './serializers/user.serializer';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(relations?: string[], throws?: boolean) {
    return await this.userRepository.findAllEntities(relations, throws);
  }

  async findById(id: number, relations?: string[], throws?: boolean) {
    return await this.userRepository.findEntityById(id, relations, throws);
  }

  async findByEmail(email: string, relations?: string[], throws?: boolean) {
    return await this.userRepository.findByEmail(email, relations, throws);
  }

  async create(inputs: any) {
    // Log.logObject(UserService.name, inputs);
    return await this.userRepository.createEntity(inputs);
  }

  async update(user: UserEntity, inputs: User) {
    return await this.userRepository.updateEntity(user, inputs);
  }

  async delete(id: number) {
    return await this.userRepository.deleteEntityById(id);
  }
}
