import Post from "../modules/Post/Post";
import User from "../modules/User/User";
import { UserInterface } from "../modules/User/user.interface";

export class FileService {

   async upload(file: File){
      const user = await Post.find()
      return user
   }

   async delete(){
      return await Post.create()
   }
}


export default new FileService