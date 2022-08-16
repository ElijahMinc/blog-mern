import CrudService from "../CrudService"



class UserService extends CrudService {

   constructor() {
      super('/user')
   }

   async getUser(): Promise<any>  {
     try {
      return await this.getAll({}, '')
     } catch (e: any) {
         throw e?.response?.data?.message
     }
   }
 
 }

 const userService = new UserService()
 
 export { userService }