import React from 'react'

import { Button, FormControl, Grid, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'

import styles from './AuthForm.module.css'
import {   useForm } from 'react-hook-form'
import { ThemedInput } from '../../ThemedInput/ThemedInput'
import { getFormRules } from '../../../../utils/formRules'
import { useCheckIsLoginPage } from '../../../../hooks/useCheckIsLoginPage'
import { AuthFormDefaultValues } from './types'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk, registerThunk, selectUser } from '../../../../redux'
import { AppDispatch } from '../../../../redux/configureStore'
import { useHistory, useLocation } from 'react-router-dom'



const defaultValues: AuthFormDefaultValues = {
   firstname: "",
   lastname: "",
   email: "",
   password: ""
}

export const AuthForm: React.FC = () => {
   const { isFetchingAuth } = useSelector(selectUser)
   const isLoginPage = useCheckIsLoginPage()
   const dispatch = useDispatch<AppDispatch>()
   const {push} = useHistory()
   const form = useForm<AuthFormDefaultValues>({
      defaultValues,
      mode: 'onSubmit',
   })

   const { handleSubmit } = form

   const onSubmit = async (data: AuthFormDefaultValues) =>  {
      if(isLoginPage){
        await dispatch(loginThunk(data))
      }   else{
        await dispatch(registerThunk(data))
      }

      push('/home')
   }


   return (
      <Container maxWidth="sm" sx={{
         display: 'flex',
         height: '80vh',
         justifyContent: 'center',
         alignItems: 'center',
      }}>
         <Paper classes={{ root: styles.root }}>
            <Typography variant="h4" component="h2" sx={{ flexGrow: 1, marginBottom: '20px' }} textAlign={'center'} >
              {isLoginPage ? 'Login' : 'Register'} 
            </Typography>
            <FormControl component="form"  autoComplete='false' fullWidth onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <ThemedInput<AuthFormDefaultValues> 
                        form={form}
                        name='firstname'
                        type="text"
                        className={styles.field}
                        label="Your Name"
                        rules={getFormRules('Name Field is Required', {
                           isName: true
                        })}
                     />
                     </Grid>
                     <Grid item xs={12}>
                     <ThemedInput<AuthFormDefaultValues>
                        form={form}
                        name='lastname'
                        type="text"
                        className={styles.field}
                        label="Your Lastname"
                        rules={getFormRules('Lastname Field is Required', {
                           isName: true
                        })}
                     />
                  </Grid>
                  <Grid item xs={12}>
                    <ThemedInput<AuthFormDefaultValues>
                     form={form}
                     name='email'
                     type="email"
                     className={styles.field}
                     label="Your Email"
                     rules={getFormRules('Email Field is Required', {
                        isEmail: true
                     })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <ThemedInput<AuthFormDefaultValues>
                     form={form}
                     name='password'
                     type="password"
                     className={styles.field}
                     label="Your Password"
                     rules={getFormRules('Password Field is Required', {
                        isPass: true
                     })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                     <Button type='submit' disabled={isFetchingAuth} variant="contained" fullWidth>Submit</Button>
                  </Grid>
               </Grid>
            </FormControl>
           
         </Paper>
      </Container>
     
      )
}