import { Card, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react'
import { Post } from '@redux/index'
import cryCat from '@static/cry_cat.jpg'
import { PostItem } from '@/components/Logic/Posts/PostItem/PostItem';

interface PostListProps {
   posts: Post[]
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {

   return ( 
         <Grid  container spacing={2} justifyContent="space-evenly" flexDirection="column" sx={{
               marginTop: '20px',
            }}>
            {!!posts.length ? posts.map((post) => (
               <PostItem key={post._id} post={post} />
            ) ) : (
               <Grid container sx={{
                  padding: '50px'
               }} gap={4} justifyContent="center" alignItems="center" flexDirection="column">
                  <Grid item>
                     <Typography variant='h3'>Posts Not Found :C</Typography>
                  </Grid>
                  <Grid item>
                     <CardMedia sx={{borderRadius: '25px'}} component="img" src={cryCat}  height="500px" alt="not found posts"/>

                  </Grid>
               </Grid>
            )}
         </Grid>
     
         

   )
}