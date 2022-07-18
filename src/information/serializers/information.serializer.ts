import { IInformation } from '../interfaces/information.interface';
import { ModelEntity } from '../../base/model.serializer';
export class InformationEntity extends ModelEntity implements IInformation {
  id: number;
  userId: number;
  socketId: string;
}
