import { LocalStorageKeys, LocalStorageService } from '@/service/LocalStorageService'
import axios, { AxiosRequestConfig } from 'axios'



const $AuthApi = axios.create({
   baseURL: `${process.env.REACT_APP_API_URL}`,
})


const $BaseApi = axios.create({
   baseURL: `${process.env.REACT_APP_API_URL}`,
})

$AuthApi.interceptors.request.use((config: AxiosRequestConfig<any>) => {
   if(!!config.headers){
      config.headers.Authorization = `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}`
   }

   return config
})


export { $AuthApi, $BaseApi }