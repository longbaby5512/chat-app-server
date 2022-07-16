import { Request } from 'express';
import { UserEntity } from '../../user/serializers/user.serializer';

export class RequestWithUser extends Request {
  user: UserEntity;
}
