import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Layout } from '../../../pages/Layout'
import { refreshAuth, selectUser, setToken, userThunk } from '../../../redux'
import { AppDispatch } from '../../../redux/configureStore'
import { privateRoutes, publicRoutes } from '../../../routes/routes'
import { LocalStorageKeys, LocalStorageService } from '../../../service/LocalStorageService'

interface AppRouterProps {

}

export const AppRouter: React.FC<AppRouterProps> = () => {
  const { isAuth } = useAuth()

   return isAuth ? (
           <Layout>
              <Switch>
                {privateRoutes.map(privateRoute => (
                    <Route key={`route-${privateRoute.path}`} {...privateRoute}  />
                ))}
                <Redirect to="/home" />
              </Switch>
           </Layout>
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