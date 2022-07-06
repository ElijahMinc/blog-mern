import { HttpRequest } from "../httpRequest";
import User from "../../modules/User/User";
import { Request, Response } from "express";
import UserService from "../../services/UserService";
import { AuthRequest } from "../../types/global.interface";
import { UserInterface } from "../../modules/User/user.interface";
import { UploadedFile } from "express-fileupload";
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import PostService from "../../services/PostService";
import CommentService from "../../services/CommentService";
import fs from 'fs'

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
         const defaultPath = path.resolve(__dirname, '../../static/')

         const image = req?.files?.image as UploadedFile | undefined

         const user = await UserService.getById(req?.userId)

         let generatedNameImg: string | undefined = undefined

         if(!image) return res.status(400).json({
            message: 'Ошибка установки аватара!',
         })

         generatedNameImg = `${uuidv4()}.jpg`

         await image.mv(path.join(defaultPath, generatedNameImg))

         user.avatar = generatedNameImg

         console.log('DELETED')

         const updatedUser =  await UserService.update(user)
         console.log('user.avatar', updatedUser)
         // const userInfo: Pick<UserInterface, 'firstname' | 'lastname' | 'avatar'> = {
         //    firstname: updatedUser.firstname,
         //    lastname: updatedUser.lastname,
         //    avatar: updatedUser.avatar
         // }
         console.log('user.avatar', user.avatar)
          await PostService.updateManyAvatarByUserId(req.userId, updatedUser.avatar)
          await CommentService.updateManyAvatarByUserId(req.userId, updatedUser.avatar)
          

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
      const defaultPath = path.resolve(__dirname, '../../static/')
      try {
         const user = await UserService.getById(req.userId)
         if(!user?.avatar) return res.status(400).json({
            message: "У пользователя нет аватарка"
         })


         const imagePath = path.join(defaultPath, user.avatar);
         fs.unlinkSync(imagePath)

         user.avatar = null

         // const userInfo: Pick<UserInterface, 'firstname' | 'lastname' | 'avatar'> = {
         //    firstname: user.firstname,
         //    lastname: user.lastname,
         //    avatar: user.avatar
         // }


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