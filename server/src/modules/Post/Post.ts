import mongoose, { model, Schema } from "mongoose";
import { PostInterface } from "./post.interface";

const Post = new Schema<PostInterface>({
   title: {
      type: String,
      required: true,
      default: ''
   },
   text: {
      type: String,
      required: true,
      default: ''
   },
   tags: [{
      type: String,
   }],
   likes: {
      type: {
         userIds: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
         }],
         likes: Number
      },
      default: {
         userIds: [],
         isLikedStatus: false,
         likes: 0
      }
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   userInfo: {
      firstname: {
         type: String,
         required: true
      },
      lastname: {
         type: String,
         required: true
      },
      cloudinaryAvatarUrl: {
         type: String,
         default: null
      }
   },
   cloudinaryUrl: {
      type: String,
      default: null
   },
   cloudinaryId: {
      type: String,
      default: null
   }
    
}, {
   timestamps: true
})

Post.index({ title: 'text'}, {default_language: 'none' })

export default model('Post', Post);
