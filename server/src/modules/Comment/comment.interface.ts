import { UserInterface } from '../User/user.interface';
import mongoose, { HydratedDocument, Types } from "mongoose"
import { HydratedPostInterface, PostInterface } from '../Post/post.interface';

export interface CommentInterface {
   postId: Types.ObjectId | string
   userId: Types.ObjectId | string
   text: string
   userInfo: PostInterface['userInfo']
}


export type RequestBodyComments = Omit<CommentInterface, 'userInfo'>