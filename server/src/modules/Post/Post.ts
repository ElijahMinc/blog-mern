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
      avatar: {
         type: String,
         default: null
      }
   },
   imageName: {
      type: String,
      default: null
   }
    
}, {
   timestamps: true
})

export default model('Post', Post);