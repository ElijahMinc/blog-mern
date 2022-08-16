import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@redux/configureStore'
import { getPostThunk, Post, selectIsAllFetching, selectPost } from '@redux/Post/PostSlice'
import { Loader } from '@Common/Loader/Loader'
import { selectFilter, TabValue } from '@/redux'
import { QueryParams } from '@/types/queryParams'
import { postService } from '@/service/PostService/PostService'

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
      const queryParams: QueryParams = {
         id,
         typeTab: tabValue,
         page,
         searchValue,
         tags
      }

      dispatch(getPostThunk(queryParams))
      

      return () => {
         postService.abortRequest()
      }
   }, [page, searchValue, tags])


   return isAllFetching ?  <Loader/> : children((posts as Post[]))   
}