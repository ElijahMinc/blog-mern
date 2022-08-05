import { Grid } from '@mui/material'
import React from 'react'
import { Comment } from '@redux/index'
import { CommentsItem } from '@Logic/Comments/CommentsItem/CommentsItem'

interface CommentsListProps {
   comments: Comment[]
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {

   return (
      <Grid container spacing={3} sx={{
         marginBottom: '20px'
      }} flexDirection="column">
         {!comments.length 
            ? <h2 style={{
               marginLeft: '20px'
            }}>Комментариев к этому посту нет</h2> 
            : (
             comments.map(({_id, ...rest}) => (
               <CommentsItem 
                  key={_id}
                  _id={_id}

                     {
                     ...
                     {
                        ...rest
                     }

                     }
                  />
         )))}
      </Grid>  
   )
}