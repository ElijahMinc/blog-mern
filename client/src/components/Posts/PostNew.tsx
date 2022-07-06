import React from 'react'
import { Post } from '../../redux'

interface PostPostNewProps {
   post: Post
   isEdit?: boolean
}

export const PostNew: React.FC<PostPostNewProps> = ({ post, isEdit }) => {
   // const { firstname, lastname } = post.userInfo
   // const { text, title, createdAt } = post
   // const imageName = post.imageName


   return (
      <div>
         <h1>PostEdit</h1>
      </div>
      )
}