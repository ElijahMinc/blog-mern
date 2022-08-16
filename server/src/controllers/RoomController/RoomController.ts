import { Response } from "express"
import { AuthRequest } from "../../types/global.interface"
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../../types/socket.io"
import { MyMap } from "../../services/MyMap"
import roomService from "../../services/RoomService"


export class RoomController {

   joinRoomUrl = '/join-room'
   getRoomUrl = '/rooms'

   async joinRoom(req: AuthRequest, res: Response) {
      try {
         const { userName, roomId } = req.body as { userName: string, roomId: string }
         if(!roomId){
            return res.status(400).json({
               message: 'You not enter userName or roomId'
            })
         }
         if(!roomService.has(roomId)){
            roomService.set(roomId,  new Map(
               [
                  ['users', new Map()],
                  ['messages', new Map()]
               ]
             
            ))
         }

         const roomNames = [...roomService.keys()]

         return res.json(roomNames)

      } catch (e) {
         return res.status(500).json({
            message: 'Error with Join Room'
         })
      }
   }
   
   async getRooms(_: AuthRequest, res: Response) {
      try {
         const roomNames = [...roomService.keys()]
   
         return res.json(roomNames)
   
      } catch (e) {
         console.log('e', e)
         return res.status(500).json({
            message: 'Failed with get Rooms'
         })
      }
   }
}

export default new RoomController