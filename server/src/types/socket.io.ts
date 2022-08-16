
export interface RoomJoinInterface{
  userName: string
  roomId: string
  userAvatar: string
} 


export interface MessageInterface{
  userId: string
  userAvatar: string
  userName: string
  text: string
  roomId: string
} 

export interface UserInterface{
  userName: string
  userAvatar: string

}

export enum SOCKET_EMIT_KEYS {
  ['ROOM:JOIN'] = 'ROOM:JOIN',
  ['NEW:MESSAGE'] = 'NEW:MESSAGE'
}

export enum SOCKET_ON_KEYS {
  ['ROOM:JOINED'] = 'ROOM:JOINED',
  ['USERS:SET'] = 'USERS:SET',
  ['NEW:MESSAGE'] = 'NEW:MESSAGE',
  ['ROOM:LEAVE'] = 'ROOM:LEAVE'
}

export interface ServerToClientEvents {
   ['ROOM:JOINED']:  (allMessagesByRoomId: MessageInterface[]) => void;
   ['USERS:SET']: (users: UserInterface[]) => void;
   ['NEW:MESSAGE']: (messageData: MessageInterface[]) => void
   ['ROOM:LEAVE']: (leaveName: string) => void
   ['MESSAGE:WRITING']: (data: { userName: UserInterface['userName']}) => void

 }
 
 export interface ClientToServerEvents {
  ['ROOM:JOIN']: (connectData: RoomJoinInterface) => void
  ['NEW:MESSAGE']: (messageData: MessageInterface) => void
  ['MESSAGE:WRITING']: (data: { userName: UserInterface['userName'], roomId: RoomJoinInterface['roomId']}) => void

 }
 
 export interface InterServerEvents {}
 
 export interface SocketData {}