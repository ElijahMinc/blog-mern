import { Document, FilterQuery, HydratedDocument, Schema, Types, UpdateQuery } from "mongoose";
import Post from "../modules/Post/Post";
import { HydratedPostInterface, PostInterface } from "../modules/Post/post.interface";
import User from "../modules/User/User";
import { UserInterface } from "../modules/User/user.interface";
import { PostQueryParams } from "../types/global.interface";
import { shuffle } from "../utils/shuffle";

class PostService {
   popularPosts: number =  1
 
   pageOptions: { page: number, limit: number, sort: 'asc' | 'desc', searchValue: string } = {
      page: 0,
      limit: 3,
      sort: 'desc',
      searchValue: ''
   }

   async getAll(query?: {page: string, searchValue?: string, tags?: string[] | string}){
      const page = query ? +query.page : this.pageOptions.page

      const queryParams: PostQueryParams = {} as PostQueryParams

      if(!!query?.searchValue) {
         queryParams.$text = { $search: query.searchValue, $diacriticSensitive: true }
       }

       if(!!query?.tags) {
         queryParams.tags = { $in: typeof query.tags === 'string' ? [query.tags] : query.tags }
       }

      const posts = await Post.find(queryParams)
            .sort({ updatedAt: this.pageOptions.sort })
            .skip(page * this.pageOptions.limit)
            .limit(this.pageOptions.limit)

      const countPosts = await Post.find(queryParams)
               .count()
      return {total: countPosts, posts}
   }

   async getPopular(query?: {page: string, searchValue?: string }){
      const page = query ? +query.page : this.pageOptions.page

      const queryParams: PostQueryParams = {} as PostQueryParams

      if(!!query?.searchValue) {
         queryParams.$text = { $search: query.searchValue, $diacriticSensitive: true }
       }

      const posts = await Post.find({ ...queryParams, 'likes.likes': {$gte: this.popularPosts } })
            .sort({ updatedAt: this.pageOptions.sort })
            .skip(page * this.pageOptions.limit)
            .limit(this.pageOptions.limit)

      const countPosts = await Post.find({ ...queryParams, 'likes.likes': {$gte: this.popularPosts } })
                  .count()

      return {total: countPosts, posts}
   }

   async getTagsByPopular(){
      const offset = 5
      const posts = await Post.find({ 'likes.likes': {$gte: this.popularPosts } })
      const tags = shuffle(posts.map(post => post.tags).flat()).slice(0, offset)
      
      return tags
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
   async updateManyAvatarByUserId(userId: Types.ObjectId | string | undefined, cloudinaryAvatarUrl: string | null | undefined ){

      // const postsByUserId = await Post.updateMany({ userId: {$all: userId } }, {$set: { userInfo }} )
      const postsByUserId = await Post.updateMany({ userId: {$all: userId } }, {$set: { 'userInfo.cloudinaryAvatarUrl': cloudinaryAvatarUrl }} )

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