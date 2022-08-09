import { ClientToServerEvents, ServerToClientEvents } from "@/types/socket.io";
import { io, Socket } from "socket.io-client";

// please note that the types are reversed
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(process.env.REACT_APP_API_URL!, {transports: ["websocket"]});