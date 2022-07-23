import { CustomRepository } from '../database/typeorm-ex.decorator';
import { ModelRepository } from '../base/model.repostitory';
import { NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserEntity } from './serializers/user.serializer';
import { Log } from '../common/logger';

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

  override async updateEntity(user: UserEntity, inputs: User) {
    // Log.logObject(UserRepository.name, inputs);
    return await this.createQueryBuilder()
      .innerJoinAndMapMany(
        'users.infomations',
        'infomations',
        'infomations.user_id = users.id',
      )
      .update(User)
      .set({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        key: inputs.key,
        refreshToken: inputs.refreshToken,
      })
      .where('id = :id', { id: user.id })
      .execute()
      .then(async (model: any) => {
        return await this.findEntityById(user.id);
      })
      .catch((error) => Promise.reject(error));
  }
}
