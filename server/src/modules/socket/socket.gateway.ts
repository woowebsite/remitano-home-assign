import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WsGuard } from '../jwt/jwt-ws.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedClients: Set<string> = new Set();

  handleConnection(client: Socket) {
    this.connectedClients.add(client.id);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('notify-new-video')
  handleMessage(client: Socket, message: string) {
    client.broadcast.emit('receive-new-video', message);
  }
}
