import { body } from "express-validator";


export const authValidator = [
   body('firstname').isLength({ min: 3 }),
   body('lastname').isLength({ min: 3 }),
   body('email').isEmail(),
   body('password').isLength({ min: 3 })
]