import * as core from 'express-serve-static-core';
import http from 'http'
import  { Server, Socket } from 'socket.io'
import { ClientToServerEvents, InterServerEvents, MessageInterface, RoomJoinInterface, ServerToClientEvents, SocketData, UserInterface } from '../../types/socket.io'
import roomService from '../../services/RoomService';
import { v4 as uuidV4} from 'uuid'


export class SocketController {

   server: http.Server

   io: Server<
      ClientToServerEvents, 
      ServerToClientEvents, 
      InterServerEvents, 
      SocketData
   >

   constructor(app: core.Express){
      this.server = http.createServer(app)
      this.io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(this.server)

      this.init()
   }

   roomJoin({roomId, userName, userAvatar}: RoomJoinInterface, socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>, clientId: string){
      socket.join(roomId)
      
      roomService.get(roomId)?.get('users')?.set(clientId, {userName, userAvatar})
      
      const users = [...roomService.get(roomId)?.get('users')?.values()]
      const allMessagesByRoomId = [...roomService?.get(roomId)?.get('messages')?.values()]

      this.io.to(roomId).emit('ROOM:JOINED', allMessagesByRoomId)
      this.io.to(roomId).emit('USERS:SET', users)
   }

   newMessage({text, userName, roomId, userAvatar, userId}: MessageInterface){
      const messages = roomService?.get(roomId)?.get('messages')
      messages.set(uuidV4(), {userName, text, userAvatar, userId, roomId})

      const allMessagesByRoomId = [...roomService?.get(roomId)?.get('messages')?.values()]
      this.io.to(roomId).emit('NEW:MESSAGE',allMessagesByRoomId)
   }

   messageWriting(data: { userName: UserInterface['userName'], roomId: RoomJoinInterface['roomId']}, clientId: string){
      const user = roomService?.get(data.roomId)?.get('users')?.get(clientId)
      this.io.to(data.roomId).emit('MESSAGE:WRITING', {userName: user.userName})
   }

   init(){
      this.io.on('connection', (socket) => {
         const clientId = socket.id

         socket.on('ROOM:JOIN', (roomData) => this.roomJoin(roomData, socket, clientId))
         socket.on('NEW:MESSAGE', this.newMessage.bind(this))
         socket.on('MESSAGE:WRITING', (data) => this.messageWriting(data, clientId))
         socket.on('disconnect', () => this.disconnect(clientId))
      })
   }


   disconnect(clientId: string){
      roomService.forEach((value, keyAsRoomId) => {

         if(value.get('users').has(clientId)){
            const leaveName = value.get('users').get(clientId)

            this.io.to(keyAsRoomId).emit('ROOM:LEAVE', leaveName) 

            value.get('users').delete(clientId)

            const users = [...value.get('users').values()]

            if(!users.length) {
               roomService.delete(keyAsRoomId)
            }

            this.io.to(keyAsRoomId).emit('USERS:SET', users)

         }
      })
   }
}

export default  SocketController