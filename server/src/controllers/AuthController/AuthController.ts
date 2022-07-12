import { Request, Response } from "express";
import { validationResult } from "express-validator";
import UserService from "../../services/UserService";
import { generateHashPassword } from "../../utils/genereateHashPassword";
import { generateJWTToken } from "../../utils/generateJWTToken";
import User from "../../modules/User/User";
import { verifyPassword } from "../../utils/verifyPassword";

export class AuthController {
   registerUrl: string = '/register'
   loginUrl: string = '/login'

   async login(req: Request, res: Response) {
      try {
         const { email, password } = req.body

         const user = await UserService.find(email)

         if(!user){
            return res.status(400).json({
               message: 'Такого пользователя нет'
            })
         }

         const validPassword = verifyPassword(password, user.password)
         
         if(!validPassword){
            return res.status(400).json({
               message: 'Не правильный пароль'
            })
         }

         const token = generateJWTToken(user._id)


         return res.status(200).json({
            message: 'Вы успешно авторизировались',
            user,
            token
         })

      } catch (e) {
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }

   async register(req: Request, res: Response) {

      try {
         const { firstname, lastname, email, password } = req.body

         const errors = validationResult(req)

         if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
         }

         const hasUser = await UserService.find(email)

         if(hasUser){
            return res.status(400).json({
               message: 'Такой пользователь уже есть'
            })
         }

         const hashPassword = await generateHashPassword(password)

         const user = new User({
            email,
            firstname,
            lastname,
            password: hashPassword
         })

         const token = generateJWTToken(user._id)

        const newUser = await user.save()

         return res.status(200).json({
            message: 'Пользователь успешно создан',
            user: newUser,
            token
         })
      } catch (e) {
         console.log('ERROR', e)
         return res.status(400).json({
            message: 'Faild with post'
         })
      }
   }
}

export default new AuthController