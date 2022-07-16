import { AuthPayload } from '../auth/interfaces/auth-payload.interface'
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
@WebSocketGateway( {
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
  }
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
    Log.log(ChatGateway.name, `Client connected: ${client.id}`);
    const user = await this.getDataUserFromToken(client);
    const info: SaveInformationDto = {
      userId: user.id,
      socketId: client.id,
    };
    await this.informationService.create(info);
  }
  async handleDisconnect(client: Socket) {
    Log.log(ChatGateway.name, `Client disconnected: ${client.id}`);
    const user = await this.getDataUserFromToken(client);
    await this.informationService.deleteByValue(user.id, client.id);
  }

  @SubscribeMessage('send_message')
  async onMessage(client: Socket, @MessageBody() data: SendMessageDto) {
    // Log.log(ChatGateway.name, `onMessgae: \n${JSON.stringify(data, null, 2)}`);
    await this.messageService.create(data);
    // Log.log(ChatGateway.name, `onMessgae: \n${JSON.stringify(data, null, 2)}`);

    const socketIds = (
      await this.informationService.findSocketId([data.to])
    ).map((info) => {
      return info.socketId;
    });
    // Log.log(ChatGateway.name, `onMessgae: \n${JSON.stringify(data, null, 2)}`);

    this.server.to(socketIds).emit('receive_message', data);
    return;
  }

  async getDataUserFromToken(client: Socket) {
    const authToken: any = client.handshake.query.token;
    try {
      const decoded: AuthPayload = this.jwtService.verify(authToken);
      return await this.userService.findById(decoded.id); // response to function
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
