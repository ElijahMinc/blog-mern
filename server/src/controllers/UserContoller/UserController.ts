import User from "../../modules/User/User";
import { Request, Response } from "express";
import UserService from "../../services/UserService";
import { AuthRequest } from "../../types/global.interface";
import { UserInterface } from "../../modules/User/user.interface";
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import PostService from "../../services/PostService";
import CommentService from "../../services/CommentService";
import fs from 'fs'
import cloudinary from "../../utils/cloudinary";

export class UserController {
   setAvatarUrl: string = '/user/avatar'
   deleteAvatarUrl: string = '/user/avatar'


   getUserUrl: string = '/user'
   createUserUrl: string = '/user'
   updateUserUrl: string = '/user'
   deleteUserUrl: string = '/user'

   async getUser(req: AuthRequest, res: Response) {
      try {
         const user = await UserService.getById(req?.userId)

         return res.status(200).json(user)
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }

   async createUser(req: AuthRequest, res: Response) {
      try {
         
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }
   async updateUser(req: AuthRequest, res: Response) {
      try {
         
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with update user'
         })
      }
   }

   async setAvatar(req: AuthRequest, res: Response){

      try {

         const image = req?.file

         if(!image) return res.status(400).json({
            message: 'Ошибка установки аватара!',
         })

         const user = await UserService.getById(req.userId)

         const result = await cloudinary.uploader.upload(image.path, {
            folder: `project/user.avatar.${req.userId}`
         });
         
         user.cloudinaryAvatarId = result.public_id
         user.cloudinaryAvatarUrl = result.secure_url

         const updatedUser =  await UserService.update(user)

          await PostService.updateManyAvatarByUserId(req.userId, updatedUser.cloudinaryAvatarUrl)
          await CommentService.updateManyAvatarByUserId(req.userId, updatedUser.cloudinaryAvatarUrl)
          

         return res.status(200).json({
            message: 'Аватар успешно установлен',
            user: updatedUser
         })
      } catch (error) {
         return res.status(500).json({
            message: 'Error with set avatar'
         })
      }
      
   }

   async deleteAvatar(req: AuthRequest, res: Response) {

      try {
         const user = await UserService.getById(req.userId)
         if(!user?.cloudinaryAvatarId) return res.status(400).json({
            message: "You dont have avatar"
         })

         await cloudinary.uploader.destroy(user.cloudinaryAvatarId);
   
         await cloudinary.api.delete_folder(`project/user.avatar.${user._id}`);

         user.cloudinaryAvatarId = null
         user.cloudinaryAvatarUrl = null

         await PostService.updateManyAvatarByUserId(req.userId, null)
         await CommentService.updateManyAvatarByUserId(req.userId, null)

         const updatedUser = await UserService.update(user)


         return res.status(200).json({
            message: 'Аватар успешно удален',
            user: updatedUser
         })
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with delete user'
         })
      }
   }
}

export default new UserController