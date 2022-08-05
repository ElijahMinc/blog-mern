import mongoose, { model, Schema } from "mongoose";
import { UserInterface } from "./user.interface";

const User = new Schema<UserInterface>({
   firstname: {
      type: String,
      required: true
   },
   lastname: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
   },
   cloudinaryAvatarUrl: {
      type: String,
      default: null
   },
   cloudinaryAvatarId: {
      type: String,
      default: null
   }
}, {
   timestamps: true
})

export default model('User', User);