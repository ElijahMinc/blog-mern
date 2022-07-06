export enum LocalStorageKeys {
   TOKEN = 'TOKEN',
   USER = 'USER'
}

export class LocalStorageService {

   public static get<T>(key: LocalStorageKeys): T | null { 
      const data = localStorage.getItem(key)
   
     if(!data) return null

     return JSON.parse(data)
   }

   public static set<T>(key: string, data: NonNullable<T>): void{
         if(!data) return 

         const stringifyData = JSON.stringify(data)
         localStorage.setItem(key, stringifyData)
   }

   public static delete<T>(key: string): void{
      localStorage.removeItem(key)
   }
 
   public static clear(): void {
      localStorage.clear()
   }                                                                                                                                                        
}