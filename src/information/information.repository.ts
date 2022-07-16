import { CustomRepository } from '../database/typeorm-ex.decorator';
import { In } from 'typeorm';
import { Information } from './entities/information.entity';
import { InformationEntity } from './serializers/information.serializer';
import { ModelRepository } from '../base/model.repostitory';

@CustomRepository(Information)
export class InformationRepository extends ModelRepository<
  Information,
  InformationEntity
> {
  async findSocketId(userId: number[]) {
    return await this.find({
      where: { userId: In(userId) },
      select: ['socketId'],
    }).then((socket) => {
      return this.transformMany(socket);
    });
  }

  async deleteByValue(userId: number, socketId: string) {
    return await this.delete({
      userId,
      socketId,
    })
      .then(() => {
        return;
      })
      .catch((error) => Promise.reject(error));
  }
}
