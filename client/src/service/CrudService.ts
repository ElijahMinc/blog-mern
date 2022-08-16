import { QueryParams } from "@/types/queryParams"
import { getParams } from "@/utils/getParams"
import { HttpRequest } from "../http/HttpRequest"



class CrudService {
   httpRequest: HttpRequest

   constructor(path: string) {
     this.httpRequest = new HttpRequest(path)
   }
 
   async getAll(params: QueryParams, route?: string,) {
    const routeParams = getParams(params)
    return await this.httpRequest.get(routeParams, route)
  }

   async getById(id?: string) {
     return await this.httpRequest.get('', `/${id}`)
   }

   async create<T>(data: T) {
     return await this.httpRequest.post(data)
   }
 
   async update<T>(data: T, params?: QueryParams, route?: string, ) {
     const routeParams = getParams(params ?? {})
     return await this.httpRequest.put(data, routeParams, route)
   }
 
   async delete(params?: QueryParams, route?: string) {
     const routeParams = getParams(params ?? {})
     return await this.httpRequest.delete(routeParams, route)
   }
 
   abortRequest() {
     this.httpRequest.abortRequest()
   }
 }
 
 export default CrudService
 