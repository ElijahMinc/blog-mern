import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CommentBody, createCommentThunk, getCommentsByPostIdThunk, selectComments, selectUser } from '@redux/index'
import { AppDispatch } from '@redux/configureStore'
import { CommentsList } from '../CommentsList/CommentsList'

interface CommentsProps {
   postId: string
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
   const [textFieldValue, setTextField] = useState('')

   const { 
      data: {
         comments
      },
      isFetching
   } = useSelector(selectComments)
   const { 
      data: {
         user: {
            _id: userId
         }
      },
   } = useSelector(selectUser)
   const dispatch = useDispatch<AppDispatch>()

   const addComment = async () => {
      if(!textFieldValue) return
      setTextField('')

      const newComment: CommentBody = {
         postId,
         userId,
         text: textFieldValue
      }

      await dispatch(createCommentThunk(newComment))
   }

   useEffect(() => {
      dispatch(getCommentsByPostIdThunk(postId))
   }, [])

   return (
      <>
      <CommentsList comments={comments ?? []} />
         <Grid container spacing={4} alignItems="center">
            <Grid item flexGrow={1}>
               <TextField size='small' fullWidth value={textFieldValue} onChange={(e) => setTextField(e.target.value)}/>
            </Grid>
            <Grid item>
            <Button variant='contained' disabled={!textFieldValue || isFetching} onClick={addComment}>Add</Button>
            </Grid>
         </Grid>
      </>
   )
}