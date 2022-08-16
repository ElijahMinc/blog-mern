import { MyMap } from "./MyMap"

export class RoomService {
  private db: MyMap = MyMap.get()

   get(key: string): Map<any, any> | undefined{
      return this.db.map.get(key)
   }

   has(roomId: string): boolean{
      return this.db.map.has(roomId)
   }

   set(key: any, value: any): void{
       this.db.map.set(key, value)
   }

   keys(): IterableIterator<any>{
      return this.db.map.keys()
   }

   forEach(callbackfn: (value: any, key: any, map: Map<any, any>) => void, thisArg?: any): void{
      return this.db.map.forEach(callbackfn)
   }

   clear(room: Map<any, any>){
      room.clear()
   }

   delete(key: string) {
      this.db.map.delete(key)
        
   }
}


export default new RoomService