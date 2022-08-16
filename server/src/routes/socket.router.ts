import { Request, Response, Router } from "express";
import SocketController from "../controllers/RoomController/RoomController";
import authMiddleware from "../middlewares/auth.middleware";
import corsMiddleware from "../middlewares/cors.middleware";


const socketRouter = Router()



socketRouter.post(SocketController.joinRoomUrl, authMiddleware, corsMiddleware, SocketController.joinRoom)
socketRouter.get(SocketController.getRoomUrl, authMiddleware, corsMiddleware, SocketController.getRooms)





export default socketRouter