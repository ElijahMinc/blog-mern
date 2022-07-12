import { Button, Container } from '@mui/material'

import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { LaunchPosts } from '../components/Logic/Posts/LaunchPosts'
import { TabValue } from './Home'
import { PostReview } from '../components/Logic/Posts/PostReview'



interface PostPageProps{
   isEdit: boolean
}

export const Post: React.FC<PostPageProps> = () => {
   const { location } = useHistory<{ isEdit?: boolean }>()

   const isEdit = location?.state?.isEdit || false

   const { id } = useParams<{id: string}>()
   const { goBack } = useHistory()

   const isCreatedPost = !!id

   return (
      <React.Fragment>
         <Button color="primary"  variant="contained" onClick={goBack}>
            Back
         </Button>
         <Container maxWidth="md" sx={{ marginTop: '20px' }}>
            {isCreatedPost ? (
               <LaunchPosts 
                  allPosts={false}
                  tabValue={TabValue.CHOSEN_POST}
                  id={id}
                  children={(posts) => <PostReview isEdit={isEdit} post={posts[0]}/> }
               />
               ) : (
                  <PostReview isEdit={false} post={null} />
               )}
         </Container>
      </React.Fragment>
   
   )
}