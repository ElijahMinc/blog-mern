import { selectFilter, selectPost, setPage } from '@/redux';
import {  Pagination as PaginationUI } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';



export const Pagination: React.FC = () => {
   const {data: {total}} = useSelector(selectPost)
   const { limit, page } = useSelector(selectFilter)
   const dispatch = useDispatch()
   const offset = Math.ceil(total / limit)

   return (
     !!offset ?  <PaginationUI sx={{
      margin: '50px 0'
     }} count={offset} size="large" page={page + 1} onChange={(_, page) => dispatch(setPage(page))} variant="outlined" shape="rounded" /> : null
   )
}