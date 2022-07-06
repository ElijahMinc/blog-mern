import { Response } from "express";
import { AuthRequest } from "../../types/global.interface";
import PostService from "../../services/PostService";
import { v4 as uuidv4 } from 'uuid'
import UserService from "../../services/UserService";

import {  CommentInterface, RequestBodyComments } from '../../modules/Comment/comment.interface';
import Comment from '../../modules/Comment/Comment';
import CommentService from "../../services/CommentService";

export class CommentController {
   getAllCommentByPostIdUrl: string = '/comment/:postId'

   getAllCommentUrl: string = '/comment'
   createCommentUrl: string = '/comment'


   async getAll(_: AuthRequest, res: Response) {
      try {
         const comments = await CommentService.getAll()

         return res.status(200).json(comments)
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }

   async getByPostId(req: AuthRequest, res: Response) {
      try {
         const { postId } = req.params as { postId: string }
         const comments = await CommentService.getByPostId(postId)

         return res.status(200).json(comments)
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }


   async createComment(req: AuthRequest, res: Response) {
      try {
         const { postId, userId, text } = req.body as RequestBodyComments
         const post = await PostService.getById(postId)
         const user = await UserService.getById(userId)

         const comment: CommentInterface = {
            postId: post._id,
            userId: user._id,
            userInfo: {
               firstname: user.firstname,
               lastname: user.lastname,
               avatar: user?.avatar || null
            },
            text
         }

         const newComment = await CommentService.create(comment)

         return res.status(200).json(newComment)
         
      } catch (e) {
         console.log(e)
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }

}

export default new CommentController