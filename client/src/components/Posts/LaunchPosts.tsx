import { Card, CardContent, CardHeader, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TabValue } from '../../pages/Home'
import { selectUser } from '../../redux'
import { AppDispatch } from '../../redux/configureStore'
import { getPostThunk, Post, selectPost } from '../../redux/Post/PostSlice'
import { Loader } from '../Loader/Loader'



interface LaunchPostsProps {
   tabValue: TabValue
   id?: string
   allPosts: boolean
   children: (posts:  Post[] ) => JSX.Element
}

export const LaunchPosts: React.FC<LaunchPostsProps> = ({ tabValue, allPosts, children, id }) => {

   const {
      data: { 
         posts
      },
      isFetching
   } = useSelector(selectPost)

   
   const dispatch = useDispatch<AppDispatch>()

   useEffect(() => {
      const postThunkParameters: {
         id?: string
         typeTab: TabValue
      } = {
         typeTab: tabValue
      }

      if(tabValue === TabValue.CHOSEN_POST && !allPosts){
         postThunkParameters.id = id
      }

      dispatch(getPostThunk(postThunkParameters))

   }, [])

   return isFetching 
   ? 
   <Loader/>
 : 
 children((posts || [] as Post[]))
}