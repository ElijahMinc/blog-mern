import { ParamsDictionary } from 'express-serve-static-core';
import { Response } from "express";
import { AuthRequest } from "../../types/global.interface";
import PostService from "../../services/PostService";
import { HydratedPostInterface, PostInterface, RequestPostBody } from "../../modules/Post/post.interface";
import Post from "../../modules/Post/Post";
import fs from 'fs'
import path from 'path'
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from 'uuid'
import UserService from "../../services/UserService";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { UserInterface } from "../../modules/User/user.interface";
import CommentService from '../../services/CommentService';

export class PostController {

   getOnePostUrl: string = '/post/:id'

   updateLikeUrlPost: string = '/post/like/:id'
   getPopularPostsUrl: string = '/post-popular'
   getTagsByPopularPostsUrl: string = '/post-popular-tags'

   getAllPostUrl: string = '/post'
   createPostUrl: string = '/post'
   updatePostUrl: string = '/post'
   deletePostUrl: string = '/post'

   async getAll(_: AuthRequest, res: Response) {
      try {
         const posts = await PostService.getAll()

         return res.status(200).json(posts)
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }
   
   async getOne(req: AuthRequest, res: Response) {
      try {
         const { id: _id } = req.params 

         const post = await PostService.getById(_id)
         if(Array.isArray(post)) return res.status(200).json(post)

         return res.status(200).json([post])
      } catch (e) {
         console.log('e', e)
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }

   async getPopular(_: AuthRequest, res: Response) {
      try {
         const posts = await PostService.getPopular()

         return res.status(200).json(posts)
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }

   async getTagsByPopularPost(_: AuthRequest, res: Response) {
      try {
         const tags = await PostService.getTagsByPopular()

         return res.status(200).json(tags)
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }


   async likePost(req: AuthRequest, res: Response){
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

         return res.status(400).json({
            message: 'Failed like Post'
         })
      }
   }

   async createPost(req: AuthRequest, res: Response) {

      try {
         const { text, title, ...rest } = req.body as RequestPostBody
         const tagNames = rest.tags as string[]
         const image = req?.files?.image as UploadedFile | undefined
         const defaultPath = path.resolve(__dirname, '../../static/')
         let generatedNameImg: string | undefined = undefined
         const user = await UserService.getById(req.userId) as HydratedDocument<UserInterface>
 
         const post: PostInterface = {
            text,
            title,
            userInfo: {
               firstname: user.firstname,
               lastname: user.lastname,
               avatar: user?.avatar || null
            },
            likes: {
               userIds: [],
               likes: 0
            },
            userId: req.userId!,
            imageName: null,
            tags: []
         }

         if(tagNames) post.tags = tagNames


         if(image){
            generatedNameImg = `${uuidv4()}.jpg`

            if (!fs.existsSync(defaultPath)){
               fs.mkdirSync(defaultPath)
            }//! QUESTION!

            await image.mv(path.join(defaultPath, generatedNameImg))
            post.imageName = generatedNameImg
         }

        const newPost = await PostService.createSync(post)

         await PostService.savePost(newPost)

         return res.status(200).json(newPost)
         
      } catch (e) {
         console.log(e)
         return res.status(400).json({
            message: 'Faild with get'
         })
      }
   }

   async updatePost(req: AuthRequest, res: Response) {
      try {
         const {  tags, text, title, _id } = req.body as HydratedPostInterface
         const image = req?.files?.image as UploadedFile | undefined
         const defaultPath = path.resolve(__dirname, '../../static/')
         const post = await PostService.getById(_id)
         
         const updatePost: HydratedPostInterface = {
            _id,
            title,
            text,
            tags: []
         }

         updatePost.tags = !!tags ? tags : []
        

         if(image) {
            
            if(post.imageName){
               const prevPathImage = path.join(defaultPath, post.imageName);
               fs.unlinkSync(prevPathImage)
            }

            const generatedNameImg = `${uuidv4()}.jpg`;

            updatePost.imageName = generatedNameImg
            
            if (!fs.existsSync(defaultPath)){
               fs.mkdirSync(defaultPath)
            } //! QUESTION!

            await image.mv(path.join(defaultPath, generatedNameImg))
         }

        const updatedPost = await PostService.update(updatePost)

         return res.status(200).json(updatedPost)
      } catch (e) {
         console.log(e)
         return res.status(400).json({
            message: 'Faild with update user'
         })
      }
   }

   async deletePost(req: AuthRequest, res: Response) {
      try {
         const { _id } = req.body

         const post = await PostService.getById(_id)

         if(post.imageName){
            const imagePath = path.join(path.resolve(__dirname, '../../static/'), post.imageName)

            fs.unlinkSync(imagePath)
         }

         await PostService.delete(post)

         await CommentService.removeAllCommentsByIdPost(post._id)

         const posts = await PostService.getAll()

         return res.status(200).json({
            message: 'Пост был успешно удален',
            posts
         })
      } catch (e) {
         return res.status(400).json({
            message: 'Faild with delete post'
         })
      }
   }
}

export default new PostController