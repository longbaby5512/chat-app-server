import { CustomRepository } from '../database/typeorm-ex.decorator';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { Log } from '../common/logger';
import { ModelRepository } from '../base/model.repostitory';
import { NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserEntity } from './serializers/user.serializer';

@CustomRepository(User)
export class UserRepository extends ModelRepository<User, UserEntity> {
  async findByEmail(email: string, relations?: string[], throws?: boolean) {
    return await this.findOne({ where: { email }, relations })
      .then((entity) => {
        if (!entity && throws) {
          return Promise.reject(new NotFoundException('No models found'));
        }
        // Log.logObject(UserRepository.name, entity);
        return Promise.resolve(entity ? this.transform(entity) : null);
      })
      .catch((error) => Promise.reject(error));
  }
}
