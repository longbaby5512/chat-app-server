import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getMessageType } from '../../message/interfaces/message.interface';
import { JwtService } from '@nestjs/jwt';
import { Log } from '../../common/logger';
import { SendMessageDto } from '../../message/dto/send-message.dto';
import { Socket } from 'socket.io';
import { throwNotFound } from '../../common/utils';
import { UserService } from '../../user/user.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | any | Promise<boolean | any>> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const authToken: any = client.handshake.query.token;
    try {
      const decoded = this.jwtService.verify(authToken);
      const user = await this.userService.findById(decoded.id);
      throwNotFound(user, 'User not found');
      const data = context.switchToWs().getData();
      data.from = user.id;
      data.to = data.to;
      data.content = data.content;
      data.type = getMessageType(data.type);
      return true;
    } catch (ex) {
      return false;
    }
  }
}
