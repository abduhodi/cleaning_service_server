import { IsPhoneNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  name: string;

  @IsPhoneNumber('UZ')
  phone: string;
}
