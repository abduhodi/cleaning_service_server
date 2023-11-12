import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/message.model';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private message: typeof Message) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      await this.message.create({ ...createMessageDto });
      return {
        status: HttpStatus.CREATED,
        data: { message: 'create success' },
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        error: error.message,
      };
    }
  }

  async findAll() {
    try {
      const messages = await this.message.findAll();
      return {
        status: HttpStatus.OK,
        data: [...messages],
        error: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        error: error.message,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async remove(id: number) {
    try {
      await this.message.destroy({ where: { id } });
      return {
        status: HttpStatus.OK,
        data: { message: 'delete success' },
        error: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        error: error.message,
      };
    }
  }
}
