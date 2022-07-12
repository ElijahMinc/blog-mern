import { Grid } from '@mui/material';
import React from 'react'
import { Post } from '../../../redux'

import { PostItem } from './PostItem';

interface PostListProps {
   posts: Post[]
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {

   return ( 
      <Grid container spacing={2} flexDirection="column" sx={{
         marginTop: '20px',

      }}>
         {posts.map((post) => (
            <PostItem key={post._id} post={post} />
         ))}
      </Grid>
         

   )
}