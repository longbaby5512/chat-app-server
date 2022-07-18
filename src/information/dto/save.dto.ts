import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SaveInformationDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsNotEmpty()
  socketId: string;
}
