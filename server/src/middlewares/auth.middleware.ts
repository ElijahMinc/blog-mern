import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/global.interface";
import { verifyJWTToken } from "../utils/verifyJWTToken";

export default (req: Request, res: Response, next: NextFunction) => {
   const jwtBearerToken = req.header('Authorization') || ''
   if(!jwtBearerToken) return res.status(400).json({
      message: 'Ошибка авторизации! Нет токена!'
   })

   const token = jwtBearerToken.split(' ')[1]

   try {
      const verifyToken = verifyJWTToken(token)
   
      if(typeof verifyToken !== 'string'){
         (req as AuthRequest).userId = verifyToken._id
      }
   } catch (error) {
      return res.status(400).json({
         message: 'Ошибка авторизации!'
      })
   }

   
   next() 
}