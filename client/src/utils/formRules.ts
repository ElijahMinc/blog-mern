import { ControllerProps } from "react-hook-form"
import { regExp } from "./regExp"


const emailRule = {
   message: 'Invalid Email Rule',
   value: regExp.email
}

const passRule = {
   message: 'Invalid Pass Rule',
   value: regExp.password
}

type keysRules = 'isEmail' | 'isPass' | 'isName' | 'isLength'


type ConfigRules = Record<keysRules, boolean>

export const getFormRules = (message: string, config: Partial<ConfigRules> = {}) => {
  const rules: ControllerProps['rules'] = { 
      required: message,
  }

   if(config.isEmail) {
      rules.pattern = emailRule
   }

   if(config.isPass) {
      rules.pattern = passRule
   }

   if(config.isName) {
      rules.minLength = {
         message: 'min Length is 3',
         value: 3
      }
      rules.maxLength = {
         message: 'max Length is 20',
         value: 20
      }
   }

   return rules
}