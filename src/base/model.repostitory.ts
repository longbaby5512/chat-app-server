import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelEntity } from './model.serializer';
import { Nullable, NullableArray } from '../common/type';
import { plainToClass } from 'class-transformer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ModelRepository<
  T extends { id: number },
  K extends ModelEntity,
> extends Repository<T> {
  async findAllEntities(
    relations?: string[],
    throws?: boolean,
  ): Promise<NullableArray<K>> {
    return await this.find({ relations }).then((models) => {
      if (!models && throws) {
        return Promise.reject(new NotFoundException('No models found'));
      }
      return Promise.resolve(models ? this.transformMany(models) : null);
    });
  }

  async findEntityById(
    id: number,
    relations?: string[],
    throws?: boolean,
  ): Promise<Nullable<K>> {
    const findOptions: FindOneOptions<{ id: number }> = {
      where: { id },
      relations,
    };
    return await this.findOne(findOptions as FindOneOptions<T>).then(
      (model) => {
        if (!model && throws) {
          return Promise.reject(new NotFoundException('No model found'));
        }
        return Promise.resolve(model ? this.transform(model) : null);
      },
    );
  }

  async createEntity(inputs: DeepPartial<T>, relations?: string[]): Promise<K> {
    return await this.save(inputs)
      .then(async (model: any) => {
        return await this.findEntityById(model.id, relations);
      })
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    entity: K,
    inputs: QueryDeepPartialEntity<T>,
    relations?: string[],
  ): Promise<K> {
    return await this.update(entity.id, inputs)
      .then(async (model: any) => {
        return await this.findEntityById(model.id, relations);
      })
      .catch((error) => Promise.reject(error));
  }

  async deleteEntityById(id: number | string): Promise<void> {
    return await this.delete(id)
      .then(() => Promise.resolve())
      .catch((error) => Promise.reject(error));
  }

  transform(model: T, transformOptions = {}): K {
    return plainToClass(ModelEntity, model, transformOptions) as K;
  }

  transformMany(model: T[], transformOptions = {}): K[] {
    return model.map((model) => this.transform(model, transformOptions));
  }
}
