import CrudService from "@service/CrudService"



class CommentService extends CrudService {

   constructor() {
      super('/comment')
   }
 
   async getAllComments(): Promise<any> {
      try {
         return await this.getAll({})

      } catch (error: any) {
         throw error?.message 
      }
   }

   async getCommentById(id: string): Promise<any> {
      try {
         return await this.getById(id)
         
      } catch (error:any) {
         throw error?.message
      }
   }
 
   async createComment(data: FormData): Promise<any> {
      try {
         return await this.create(data)
         
      } catch (error: any) {
         throw error?.message
         
      }
   }

 }

 const commentService = new CommentService()
 
 export { commentService }
 