import { Post, TabValue } from "@/redux"
import { QueryParams } from "@/types/queryParams"
import CrudService from "../CrudService"



class PostService extends CrudService {

   constructor() {
      super('/post')
   }
 
   async getAllPosts(params: QueryParams) {
      try {
         let path = '';
         switch (params.typeTab) {
            case TabValue.ALL:
              break;
            case TabValue.POPULARY:
               path += '-popular'
              break;
            case TabValue.CHOSEN_POST:
               path += `/${params.id}`
              break;
            default:
              break;
          }
   
        return await this.getAll(params, path)
      } catch (error: any) {
         throw error?.response?.data?.message
      }
    
   }

   async getPopularTags(params: QueryParams, route?: string) {
      try {
         return await this.getAll(params, route)
         
      } catch (error:any) {
         throw error?.response?.data?.message
         
      }
    }

   async getPostById(id?: string) {
     
   }
 
   async createPost(data: Post) {
      try {
         return await this.create(data)
         
      } catch (error: any) {
         throw error?.response?.data?.message
         
      }
   }
 
   async updatePost(data: Post) {
      try {
         return await this.update<Post>(data)
         
      } catch (error: any) {
         throw error?.response?.data?.message
      }
   }
 
   async likePost(id: string): Promise<any> {
      try {
         return await this.update<Post['_id']>(id, {}, `/like/${id}`)
         
      } catch (error: any) {
         throw error?.response?.data?.message
      }
   }

   async deletePost(id: string) {
      try {
         return await this.delete({}, `/${id}`)

      } catch (error: any) {
         throw error?.response?.data?.message
      }
      
   }
 
 }

 const postService = new PostService()
 
 export { postService }
 