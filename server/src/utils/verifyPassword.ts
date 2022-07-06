
import bcrypt from 'bcrypt'

export const verifyPassword = (inputPassword: string, hashPassword: string) => {
   return bcrypt.compareSync(inputPassword, hashPassword)
}