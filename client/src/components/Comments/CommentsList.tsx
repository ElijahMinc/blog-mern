import { Grid } from '@mui/material'
import React from 'react'
import { Comment } from '../../redux'
import { CommentsItem } from './CommentsItem'

interface CommentsListProps {
   comments: Comment[]
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {

   return (
      <Grid container spacing={3} sx={{
         marginBottom: '20px'
      }} flexDirection="column">
         {!comments.length 
            ? <h2>Комментариев к этому посту нет</h2> 
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