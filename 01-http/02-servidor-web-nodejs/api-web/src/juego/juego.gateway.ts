import {
    SubscribeMessage, WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Client} from "socket.io";

@WebSocketGateway(3001, {
    namespace: '/websockets'
})
export class JuegoGateway{
    @WebSocketServer() server;
    constructor(){
        console.log(this.server);
    }
    @SubscribeMessage('trivia')
    trivia(client: Client |any, data: any){
        client.broadcast.emit('respuesta',data);

    }
}