import { body } from "express-validator";


export const validateUser = [
   body('firstname').isLength({ min: 3 }),
   body('lastname').isLength({ min: 3 }),
   body('email').isEmail(),
   body('password').isLength({ min: 3 }),
   body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
]