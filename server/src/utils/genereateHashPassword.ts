const bcrypt = require ('bcryptjs')

export const generateHashPassword = async (password: string): Promise<string> => {
   const saltRounds = 6;
   const hashPassword = await bcrypt.hash(password, saltRounds)
   return hashPassword
}