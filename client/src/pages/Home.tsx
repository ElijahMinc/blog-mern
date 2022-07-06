import { Box, Container, Grid, Paper, Tab, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, userThunk } from '../redux'
import {makeStyles} from '@mui/styles'
import { AppDispatch } from '../redux/configureStore'
import { PostList } from '../components/Posts/PostList'
import { LaunchPosts } from '../components/Posts/LaunchPosts'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Loader } from '../components/Loader/Loader'
import { Redirect } from 'react-router-dom'

interface HomeProps {

}

const useStyles = makeStyles({
   paper: {
      padding: '15px',

   },
   fullHeight: {
      height: '100%'
   },
   container: {
      height: '100%'
   },
   gridContainer: {
      height: '100%',
      alignItems: 'flex-start'
   }
})
export enum TabValue {
   ALL = 1,
   POPULARY = 2,

   CHOSEN_POST = 3
}


export const Home: React.FC<HomeProps> = () => {
   const [value, setValue] = React.useState<TabValue>(TabValue.ALL);

   const classes = useStyles()

   const handleChange = (event: React.SyntheticEvent, newValue: TabValue) => {
      setValue(newValue);
    };



   return  (
      <Container maxWidth="xl" className={classes.container}>
         <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item xs={8} className={classes.fullHeight}>
                  <Paper className={classes.paper} elevation={3}>
                     <Box sx={{ width: '100%' }}>
                        <Tabs
                           value={value}
                           onChange={handleChange}
                           textColor="secondary"
                           indicatorColor="secondary"
                           aria-label="secondary tabs "
                        >
                           <Tab value={TabValue.ALL} label="All Posts" />
                           <Tab value={TabValue.POPULARY} label="Populary" />
                        </Tabs>
                     </Box>
                     {value === TabValue.ALL &&  (
                       <LaunchPosts 
                        allPosts
                        tabValue={value}
                        children={(posts) => <PostList posts={posts} />}
                       /> 

                     )}
                     {value === TabValue.POPULARY && (
                          <LaunchPosts 
                              allPosts
                              tabValue={value}
                              children={(posts) => <PostList posts={posts} />}
                         /> 
                     )}
                  </Paper>
            </Grid>
            <Grid item xs={4}>
                <Sidebar/>
            </Grid>
         </Grid>
      </Container>
      )
}