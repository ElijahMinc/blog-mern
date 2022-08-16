import { Request, Response } from 'express'
import { ApiError } from '../services/ErrorService'



export default function (err: ApiError | Error,  req: Request,  res: Response,  next) {
   if(err instanceof ApiError){
      return res.status(err.status).json({
         message: err.message,
         errors: err?.errors ?? []
      })
   }

   return res.status(500).json({
      message: 'An unexpected server error occurred'
   })
}