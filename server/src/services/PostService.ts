import { UploadedFile } from "express-fileupload";
import { Document, FilterQuery, HydratedDocument, Schema, Types, UpdateQuery } from "mongoose";
import Post from "../modules/Post/Post";
import { HydratedPostInterface, PostInterface } from "../modules/Post/post.interface";
import User from "../modules/User/User";
import { UserInterface } from "../modules/User/user.interface";

class PostService {

   async uploadFile(){
 
   }

   async getAll(){
      const posts = await Post.find()
      return posts
   }

   async getById(_id: Types.ObjectId | string | undefined){
      const post = await Post.findById(_id)
      if(!post) throw new Error("Такого поста нет")
      return post
   }

   async getByUserId(userId: Types.ObjectId | string | undefined){
      const postsByUserId = await Post.find({ userId: {$all: userId }})
      if(!postsByUserId) throw new Error("Таких постов нет")
      return postsByUserId
   }
// userInfo: PostInterface['userInfo']
   async updateManyAvatarByUserId(userId: Types.ObjectId | string | undefined, avatar: string | null | undefined ){

      // const postsByUserId = await Post.updateMany({ userId: {$all: userId } }, {$set: { userInfo }} )
      const postsByUserId = await Post.updateMany({ userId: {$all: userId } }, {$set: { 'userInfo.avatar': avatar }} )

      if(!postsByUserId) throw new Error("Таких постов нет")
      return postsByUserId
   }

   async filterByTags(_id: Types.ObjectId | string | undefined, tags: HydratedPostInterface['tags']){
      const post = await Post.find({tags: { $all: tags }})
      if(!post) return []
      return post
   }

   async createSync(post: PostInterface): Promise<HydratedDocument<PostInterface>>{
      return new Post(post)
   }
   async savePost(post: HydratedDocument<PostInterface>){
      return await post.save()
   }

   async update(post: HydratedPostInterface){
      return await Post.findByIdAndUpdate(post._id, post, {returnOriginal: false})
   }

   async delete(post: HydratedPostInterface){
      return await Post.findByIdAndDelete(post)
   }
}
// .find({tags: { $all:["home"] }})

export default new PostService