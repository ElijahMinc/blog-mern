import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';

import { Box, Container, Grid, Paper, Tab, Tabs } from '@mui/material'
import {makeStyles} from '@mui/styles'
import { PostList } from '@components/Logic/Posts/PostList'
import { LaunchPosts } from '@components/Logic/Posts/LaunchPosts'
import { Sidebar } from '@components/Common/Sidebar/Sidebar'
import { Pagination } from '@/components/Common/Pagination/Pagination'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { selectFilter, setPage, setSearchValue, setTabValue, TabValue } from '@/redux';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '@/hooks/useDebounce';

const useStyles = makeStyles({
   paper: {
      padding: '15px',

   },
   fullHeight: {
      // height: '100%'
   },
   container: {
      paddingBottom: '50px'
      // height: '100%'
   },
   gridContainer: {
      // height: '100%',
      alignItems: 'flex-start'
   }
})

const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
     backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginLeft: 0,
   width: '100%',
   [theme.breakpoints.up('sm')]: {
     marginLeft: theme.spacing(1),
     width: 'auto',
   },
 }));
 
 const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
 }));
 
 const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
     padding: theme.spacing(1, 1, 1, 0),
     // vertical padding + font size from searchIcon
     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
     transition: theme.transitions.create('width'),
     width: '100%',
     [theme.breakpoints.up('sm')]: {
       width: '20ch',
       '&:focus': {
         width: '30ch',
       },
     },
   },
 }));




export const Home: React.FC = () => {
   
   const { page, tabValue } = useSelector(selectFilter)
   const classes = useStyles()
   const dispatch = useDispatch()
   
   const handleChange = (_: React.SyntheticEvent, newValue: TabValue) => {
      dispatch(setTabValue(newValue))
   }

  const debounce = useDebounce((value) => {
      dispatch(setSearchValue(value!))
   }, 600)

   return  (
      <Container maxWidth="xl" className={classes.container}>
         <Grid container sx={{padding: '20px 0'}} alignItems="center" flexGrow={5}>
            <Grid item>
               <Search >
                  <SearchIconWrapper>
                     <SearchIcon />
                  </SearchIconWrapper>

                  <StyledInputBase
                     placeholder="Search by title..."
                     inputProps={{ 'aria-label': 'search' }}
                     onChange={debounce()}
                  />
               </Search>
            </Grid>
         </Grid>

         <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item xs={8} className={classes.fullHeight}>
               <Paper className={classes.paper} elevation={3}>
                  <Box sx={{ width: '100%' }}>
                     <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs "
                     >
                        <Tab value={TabValue.ALL} color="primary.light" label="All Posts" />
                        <Tab value={TabValue.POPULARY} label="Populary" />
                     </Tabs>
                  </Box>
                  {tabValue === TabValue.ALL &&  (
                     <LaunchPosts 
                           page={page}
                           allPosts
                           tabValue={tabValue}
                           children={(posts) => 
                           (
                              <PostList posts={posts} />
                           )
                        }
                        /> 
                  )}
                  {tabValue === TabValue.POPULARY && (
                     <LaunchPosts 
                        page={page}
                        allPosts
                        tabValue={tabValue}
                        children={(posts) => <PostList posts={posts} />}
                     />
                  )}
               </Paper>
               <Pagination />

            </Grid>
            <Grid item xs={4} >
                <Sidebar />
            </Grid>
         </Grid>
      </Container>
      )
}