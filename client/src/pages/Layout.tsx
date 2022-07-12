import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Loader } from '../components/Common/Loader/Loader'
import { useAuth } from '../hooks/useAuth'
import { refreshAuth, selectUser, userThunk } from '../redux'
import { AppDispatch } from '../redux/configureStore'
import { LocalStorageService } from '../service/LocalStorageService'

interface LayoutProps {
   children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
   const { token, isAuthFetching, isAuth } = useAuth()
   const dispatch = useDispatch<AppDispatch>()


   useEffect(() => {
      !!token && dispatch(userThunk(token))
   }, [token])

   if(!isAuth && !isAuthFetching){
      <Redirect to='/' />
   }

   return (
      <Container maxWidth="lg">
         {
         isAuthFetching 

            ? <Loader/> 
            
            :  children
         }
      </Container>
      )
}