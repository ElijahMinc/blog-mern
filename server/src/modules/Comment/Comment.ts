import mongoose, { model, Schema } from "mongoose";
import { CommentInterface } from "./comment.interface";

const Comment = new Schema<CommentInterface>({
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
  },
  text: {
      type: String,
      required: true
  },
  userInfo: {
    type: {
        
    }
  }
    
}, {
   timestamps: true
})

export default model('Comment', Comment);