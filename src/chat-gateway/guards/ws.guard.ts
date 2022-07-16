import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Log } from '../../common/logger'
import { Socket } from 'socket.io'
import { UserService } from '../../user/user.service'

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
      context.switchToWs().getData().publicKey = user.key.publicKey
      // Log.logObject(WsGuard.name, context.switchToWs().getData())
      return user;
    } catch (ex) {
      return false;
    }
  }
}
