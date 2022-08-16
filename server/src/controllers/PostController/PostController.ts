import { NextFunction, Response } from "express";
import { AuthRequest } from "../../types/global.interface";
import PostService from "../../services/PostService";
import { HydratedPostInterface, PostInterface, RequestPostBody } from "../../modules/Post/post.interface";
import UserService from "../../services/UserService";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { UserInterface } from "../../modules/User/user.interface";
import CommentService from '../../services/CommentService';
import cloudinary from '../../utils/cloudinary'
import { ApiError } from "../../services/ErrorService";


export class PostController {

   getOnePostUrl: string = '/post/:id'

   updateLikeUrlPost: string = '/post/like/:id'
   getPopularPostsUrl: string = '/post-popular'
   getTagsByPopularPostsUrl: string = '/post-popular-tags'

   getAllPostUrl: string = '/post'
   createPostUrl: string = '/post'
   updatePostUrl: string = '/post'
   deletePostUrl: string = '/post/:id'

   async getAll(req: AuthRequest, res: Response, next: NextFunction) {
      try {
         const query = req.query as {page: string, searchValue?: string}
         const posts = await PostService.getAll(query)

         return res.status(200).json(posts)
      } catch (e) {
         next(e)
      }
   }
   
   async getOne(req: AuthRequest, res: Response, next: NextFunction) {
      try {
         const { id: _id } = req.params 

         const post = await PostService.getById(_id)
         if(Array.isArray(post)) return res.status(200).json(post)

         return res.status(200).json({ posts: [post] })
      } catch (e) {
         next(e)
      }
   }

   async getPopular(req: AuthRequest, res: Response, next: NextFunction) {
      try {
         const query = req.query as { page: string }

         const posts = await PostService.getPopular(query)

         return res.status(200).json(posts)
      } catch (e) {
         next(e)
      }
   }

   async getTagsByPopularPost(_: AuthRequest, res: Response, next: NextFunction) {
      try {
         const tags = await PostService.getTagsByPopular()

         return res.status(200).json(tags)
      } catch (e) {
         next(e)
      }
   }


   async likePost(req: AuthRequest, res: Response, next: NextFunction){
      try {

         const { id: _id } = req.params 
         const post = await PostService.getById(_id)

         const isLikedPostOfUserStatus = post.likes.userIds.some(_id => {
            if(_id instanceof mongoose.Types.ObjectId){
               const castToObjectId = new mongoose.Types.ObjectId(req.userId!)

              return _id.equals(castToObjectId)
            }
         })
         // Если найденные айди совпадают, значит юзер лайкнул пост

   

         if(isLikedPostOfUserStatus){
            post.likes.userIds = post.likes.userIds.filter((userId) => {
               if(userId instanceof mongoose.Types.ObjectId){
                  const castToObjectId = new mongoose.Types.ObjectId(req.userId!)

                 return !userId.equals(castToObjectId)
               }
            })
            post.likes.likes = --post.likes.likes

         }else { 
            post.likes.userIds.push(req.userId!)
            post.likes.likes = ++post.likes.likes

         }

         const updatedPost = await PostService.savePost(post)


         if(Array.isArray(post)) return res.status(200).json(updatedPost)

         return res.status(200).json([post])
      } catch (e) {
         next(e)
      }
   }

   async createPost(req: AuthRequest, res: Response, next: NextFunction) {

      try {
         const { text, title, ...rest } = req.body as RequestPostBody
         const tagNames = rest.tags as string[]
         const image = req?.file 

         const user = await UserService.getById(req.userId) as HydratedDocument<UserInterface>
 
         if(image && image.size >= 524288){
            next(ApiError.BadRequest('File is very big!'))
         }

         const post: PostInterface = {
            text,
            title,
            userInfo: {
               firstname: user.firstname,
               lastname: user.lastname,
               cloudinaryAvatarUrl: user?.cloudinaryAvatarUrl || null
            },
            likes: {
               userIds: [],
               likes: 0
            },
            userId: req.userId!,
            cloudinaryUrl: null,
            cloudinaryId: null,
            tags: []
         }

         if(tagNames) post.tags = tagNames


               
         const newPost = await PostService.createSync(post)

         if(!!image){
            // const generateUniqueName = 
            const result = await cloudinary.uploader.upload(image.path, {
               folder: `project/${newPost._id}`
            });
            
            newPost.cloudinaryId = result.public_id
            newPost.cloudinaryUrl = result.secure_url
         }


         await PostService.savePost(newPost)

         return res.status(200).json(newPost)
         
      } catch (e) {
         next(e)
      }
   }

   async updatePost(req: AuthRequest, res: Response, next: NextFunction) {
      try {
         const {  tags, text, title, _id } = req.body as HydratedPostInterface

         const image = req?.file

         if(image && image.size >= 524288){
            next(ApiError.BadRequest('File is very big!'))
         }

         const post = await PostService.getById(_id)

         if(title) post.title = title
         if(text) post.text = text
         if(!!tags) post.tags = tags
        

         if(!!image) {
            
            if(post.cloudinaryId){ // if image was load
               await cloudinary.uploader.destroy(post.cloudinaryId);
            }
          
            const result = await cloudinary.uploader.upload(image.path, {
               folder: `project/${post._id}`
            });
            
            post.cloudinaryId = result.public_id
            post.cloudinaryUrl = result.secure_url
         }

        const updatedPost = await PostService.update(post)

         return res.status(200).json(updatedPost)
      } catch (e) {
         next(e)
      }
   }

   async deletePost(req: AuthRequest, res: Response, next: NextFunction) {
      try {
         const query = req.query as {page: string}
         const { id } = req.params

         const post = await PostService.getById(id)

         if(!!post.cloudinaryId){
            await cloudinary.uploader.destroy(post.cloudinaryId);
   
            await cloudinary.api.delete_folder(`project/${post._id}`);
         }
           
         await PostService.delete(post)

         await CommentService.removeAllCommentsByIdPost(post._id)

         const {total, posts} = await PostService.getAll(query)

         return res.status(200).json({
            message: 'Пост был успешно удален',
            posts,
            total
         })
      } catch (e) {
         next(e)
      }
   }
}

export default new PostController