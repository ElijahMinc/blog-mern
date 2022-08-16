import { NextFunction, Request, Response } from "express";
import UserService from "../../services/UserService";
import { generateHashPassword } from "../../utils/genereateHashPassword";
import { generateJWTToken } from "../../utils/generateJWTToken";
import User from "../../modules/User/User";
import { verifyPassword } from "../../utils/verifyPassword";
import { validationResult } from "express-validator";
import { ApiError } from "../../services/ErrorService";

export class AuthController {
   registerUrl: string = '/register'
   loginUrl: string = '/login'

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed Login', errors.array()))
         }

         const { email, password } = req.body

         const user = await UserService.find(email)

         if(!user){
            return next(ApiError.BadRequest('There is no such user'))

         }

         const validPassword = verifyPassword(password, user.password)
         
         if(!validPassword){
            return next(ApiError.BadRequest('Wrong password'))
         }

         const token = generateJWTToken(user._id)


         return res.status(200).json({
            message: 'Вы успешно авторизировались',
            user,
            token
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async register(req: Request, res: Response, next: NextFunction) {

      try {
         const { firstname, lastname, email, password } = req.body

         const errors = validationResult(req)

         if(!errors.isEmpty()){
          
            return  next(ApiError.BadRequest('Failed Register', errors.array()))
         }

         const hasUser = await UserService.find(email)

         if(hasUser){
            return next(ApiError.BadRequest('Such a user already exists'))
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
      } 
      catch (e) {
         next(e)
      }
   }
}

export default new AuthController