import { UserInterface } from './../User/user.interface';
import mongoose, { HydratedDocument, Types } from "mongoose"

export interface PostInterface {
   title: string
   text: string
   userId: mongoose.Schema.Types.ObjectId | string
   userInfo: Pick<UserInterface, 'firstname' | 'lastname'> & { avatar?: string | null }
   tags?: string[]
   imageName?: string | null
   likes: {
      userIds: (mongoose.Schema.Types.ObjectId | string)[]
      likes: number
   }
}


export type HydratedPostInterface = Omit<PostInterface, 'userId' | 'userInfo' | 'likes'> & Pick<HydratedDocument<PostInterface>, '_id'>
export type RequestPostBody = Omit<PostInterface, 'imageName' | 'user'>