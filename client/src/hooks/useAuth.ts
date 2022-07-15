import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, setToken } from "../redux"
import { AppDispatch } from "../redux/configureStore"
import { LocalStorageKeys, LocalStorageService } from "../service/LocalStorageService"

interface HookAuthDataReturned {
   isAuth: boolean
   token: string | null
   isAuthFetching: boolean
   error: string
}

export const useAuth = (): HookAuthDataReturned => {
   const { data: { 
      isAuth,
      token,
     },
     isFetching,
     error
    } = useSelector(selectUser)

  const dispatch = useDispatch<AppDispatch>()

  const TOKEN = useMemo(() => LocalStorageService.get<string>(LocalStorageKeys.TOKEN), [token])


  useEffect(() => {
   if(!!TOKEN){
     dispatch(setToken(TOKEN))
   }
  }, [TOKEN])

  return {
   isAuth: isAuth || !!TOKEN,
   token: token || TOKEN,
   isAuthFetching: isFetching,
   error
  }
}