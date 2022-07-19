import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SendMessageDto } from '../../message/dto/send-message.dto';

//Get data from switchToWs
export const GetMessage = createParamDecorator(
  (_data: unknown, context: ExecutionContext): SendMessageDto => {
    const data = context.switchToWs().getData();
    const message: SendMessageDto = {
      from: data.from,
      to: data.to,
      content: data.content,
      type: data.type,
    };
    return message;
  },
);
