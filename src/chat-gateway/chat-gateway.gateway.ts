import { AuthPayload } from '../auth/interfaces/auth-payload.interface'
import { GetMessage } from './decorators/get-message.decorator'
import { getMessageType } from '../message/interfaces/message.interface'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { InformationService } from '../information/information.service'
import { JwtService } from '@nestjs/jwt'
import { Log } from '../common/logger'
import { MessageService } from '../message/message.service'
import { SaveInformationDto } from '../information/dto/save.dto'
import { SendMessageDto } from '../message/dto/send-message.dto'
import { Server, Socket } from 'socket.io'
import { UserService } from '../user/user.service'
import { WsGuard } from './guards/ws.guard'
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@UseGuards(WsGuard)
@WebSocketGateway({
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly userService: UserService,
    private readonly informationService: InformationService,
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
  ) {}

  afterInit(server: Server) {
    Log.log(
      ChatGateway.name,
      `Websocket server started at port ${server.engine}`,
    );
  }
  async handleConnection(client: Socket, ...args: any[]) {
    const authToken: any = client.handshake.query.token;
    try {
      const id: number = this.jwtService.verify(authToken).id;
      Log.log(ChatGateway.name, id.toString());
      const user = await this.userService.findById(id);
      const info: SaveInformationDto = {
        userId: user.id,
        socketId: client.id,
      };
      await this.informationService.create(info);
      return { status: true };
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } finally {
      return { status: false };
    }
  }
  async handleDisconnect(client: Socket) {
    const authToken: any = client.handshake.query.token;
    try {
      const id: number = this.jwtService.verify(authToken).id;
      Log.log(ChatGateway.name, id.toString());
      const user = await this.userService.findById(id);
      await this.informationService.deleteByValue(user.id, client.id);
      return { status: true };
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } finally {
      return { status: false };
    }
  }

  @SubscribeMessage('send_message')
  async onMessage(client: Socket, @GetMessage() data: SendMessageDto) {
    Log.logObject(ChatGateway.name, data);

    await this.messageService.create(data);

    const socketIds = (
      await this.informationService.findSocketId([data.to])
    ).map((info) => {
      return info.socketId;
    });
    Log.logObject(ChatGateway.name, socketIds);
    // Log.log(ChatGateway.name, `onMessgae: \n${JSON.stringify(data, null, 2)}`);
    if (socketIds.length == 0) return { status: false };
    this.server.to(socketIds).emit('receive_message', data);
    return { status: true, message: data };
  }
}
