
const bcrypt = require('bcryptjs')

export const verifyPassword = (inputPassword: string, hashPassword: string) => {
   return bcrypt.compareSync(inputPassword, hashPassword)
}