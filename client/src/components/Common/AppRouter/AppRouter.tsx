import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { Loader } from '@Common/Loader/Loader'
import {privateRoutes, publicRoutes} from '@/routes/routes'

export const AppRouter: React.FC = () => {
  const { isAuth, isAuthFetching } = useAuth()

   return isAuth ? (
            isAuthFetching ? (
               <Loader/> 
            ) : (
            <Switch>
                {privateRoutes.map(privateRoute => (
                <Route key={`route-${privateRoute.path}`} {...privateRoute}  />
                ))}
                <Redirect to="/home" />
            </Switch>
            )
         )
          : (
           <Switch>
               {publicRoutes.map(publicRoute => (
                 <Route key={`route-${publicRoute.path}`} {...publicRoute} />
               ))}
           <Redirect to="/login" />
        </Switch>
      )
}