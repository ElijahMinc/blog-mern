import mongoose, { HydratedDocument, Types } from "mongoose";
import { CommentInterface } from "../modules/Comment/comment.interface";
import User from "../modules/User/User";
import Comment from '../modules/Comment/Comment';

import { UserInterface } from "../modules/User/user.interface";

export class CommentService {

   async getById(id: string | mongoose.Types.ObjectId | undefined){
      const comment = await Comment.findById(id)
      if(!comment) throw new Error("Такого комментария нет")
      return comment
   }

   async getByPostId(postId: string | mongoose.Types.ObjectId | undefined){
      const commentsByPostId = await Comment.find({ postId: {$all: postId } })

      if(!commentsByPostId) throw new Error("Комментарий к посту нет")
      return commentsByPostId
   }
   //userInfo: CommentInterface['userInfo']
   async updateManyAvatarByUserId(userId: Types.ObjectId | string | undefined, avatar: string | null | undefined){

      // const commentsByUserId = await Comment.updateMany({ userId: {$all: userId } }, {$set: { userInfo }})
      const commentsByUserId = await Comment.updateMany({ userId: {$all: userId } }, {$set: { "userInfo.avatar": avatar }})
      
      if(!commentsByUserId) throw new Error("Таких постов нет")
      return commentsByUserId
   }


   async removeAllCommentsByIdPost(postId:  Types.ObjectId | string | undefined){
      const commentsByUserId = await Comment.deleteMany({ postId: {$all: postId } })
      
      if(!commentsByUserId) throw new Error("Failed with delete Comments")
      return commentsByUserId
   }

   async getAll(){
      const comments = await Comment.find()
      return comments
   }

   async create(comment: CommentInterface){
      return await Comment.create(comment)
   }
}


export default new CommentService