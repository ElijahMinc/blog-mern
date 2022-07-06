import jwt from 'jsonwebtoken'
import { ObjectId, Types } from 'mongoose'
import { SECRET_KEY } from '..'
import { UserInterface } from '../modules/User/user.interface'

export const generateJWTToken = (userId: Types.ObjectId): string => {
   const expiresIn = '7d'

   const token = jwt.sign({ _id: userId }, SECRET_KEY, { expiresIn })
   return token
}

