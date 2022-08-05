import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@redux/configureStore'
import { getPostThunk, Post, selectIsAllFetching, selectPost } from '@redux/Post/PostSlice'
import { Loader } from '@Common/Loader/Loader'
import { selectFilter, TabValue } from '@/redux'

interface LaunchPostsProps {
   tabValue: TabValue
   allPosts: boolean
   children: (posts:  Post[]) => JSX.Element

   id?: string
   page?: number
}

export const LaunchPosts: React.FC<LaunchPostsProps> = ({ tabValue, allPosts, children, id, page = undefined}) => {

   const {
      data: { 
         posts
      }
   } = useSelector(selectPost)

   const isAllFetching = useSelector(selectIsAllFetching)
   const { searchValue, tagValues: tags } = useSelector(selectFilter)

   const dispatch = useDispatch<AppDispatch>()

   useEffect(() => {
      const postThunkParameters: {
         id?: string
         typeTab: TabValue,
         page?: number,
         searchValue?: string,
         tags?: string[]
      } = {
         typeTab: tabValue,
         page,
         searchValue,
         tags
      }

      if(tabValue === TabValue.CHOSEN_POST && !allPosts){
         postThunkParameters.id = id
      }

      dispatch(getPostThunk(postThunkParameters))

   }, [page, searchValue, tags])

   return isAllFetching ?  <Loader/> : children((posts as Post[]))   
}