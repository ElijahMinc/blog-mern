import axios, { AxiosInstance, AxiosResponse, CancelTokenSource, CancelTokenStatic } from "axios"
import { $AuthApi } from "./axios.http"


export class HttpRequest {
    public path: string

   $api: AxiosInstance
   cancelToken: CancelTokenStatic
   source: CancelTokenSource
 
   constructor(path: string) {
     this.$api = $AuthApi
     this.path = path
     this.cancelToken = axios.CancelToken
     this.source = this.cancelToken.source()
   }

   url(route = '', routeParams = ''){
      return `${this.path}${route}${routeParams}`
   }

   processError(error: any) {
      throw this.formatError(error)
   }
   formatError(error: any) {
    return JSON.parse(
      JSON.stringify({
        message: error.response?.data?.message ?? error.message,
        stack: error.stack,
        details: error.response?.data?.exception,
        config: error.config,
        status: error.response?.status,
      })
    )
  }
 
   async delete(routeParams = '', route = '', ): Promise<AxiosResponse<any, any> | void> {
     return await this.$api
       .delete(this.url(route, routeParams))
       .catch(this.processError.bind(this))
   }
 
   async get(routeParams = '', route = '', ): Promise<AxiosResponse<any, any> | void> {
     return await this.$api
       .get(this.url(route, routeParams))
       .catch(this.processError.bind(this))
   }
 
   async post<T>(data: T, routeParams = '', route = '' , ): Promise<AxiosResponse<any, any> | void> {
     return await this.$api
       .post(this.url(route, routeParams), data)
       .catch(this.processError.bind(this))
   }
 
   async put<T>(data: T, routeParams = '', route = '',  ): Promise<AxiosResponse<any, any> | void> {
     return await this.$api
       .put(this.url(route, routeParams), data)
       .catch(this.processError.bind(this))
   }
 
   abortRequest() {
     this.source.cancel()
     this.source = this.cancelToken.source()
   }
 }
