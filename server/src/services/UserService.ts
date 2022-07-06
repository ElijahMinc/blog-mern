import mongoose, { HydratedDocument } from "mongoose";
import User from "../modules/User/User";
import { UserInterface } from "../modules/User/user.interface";

export class UserService {

   async getById(id: string | mongoose.Types.ObjectId | undefined){
      const user = await User.findById(id)
      if(!user) throw new Error("Такого пользователя нет")
      return user
   }

   async find(email: string){
      const user = await User.findOne({ email })
      return user
   }

   async create(user: UserInterface){
      return await User.create(user)
   }

   async update(user: HydratedDocument<UserInterface>){
      return await user.save()
   }
}


export default new UserService