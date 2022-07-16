import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    return request.user;
  },
);
