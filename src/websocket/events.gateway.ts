import { WebSocketAdapter } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Client } from 'socket.io/dist/client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('message')
  handleEvent(@MessageBody() message: string) {
    this.server.emit('message', message);
  }
}
