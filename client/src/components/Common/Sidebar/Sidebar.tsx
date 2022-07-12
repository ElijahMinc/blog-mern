import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTagsByPopularPostThunk, selectPost } from '../../../redux'
import { AppDispatch } from '../../../redux/configureStore'

interface SidebarProps {

}

export const Sidebar: React.FC<SidebarProps> = () => {
      const {
            data:{
                  tags
            }
      } = useSelector(selectPost)
      const dispatch = useDispatch<AppDispatch>()

      useEffect(() => {
            dispatch(getTagsByPopularPostThunk())
      }, [])



   return (
      <Grid container flexDirection="column" spacing={5}>
          <Grid item> 
            <Paper sx={{
               padding: '15px',
               width: '100%'
            }} elevation={3}>

                  <Typography variant="h5" sx={{ marginBottom: '20px'}}>Popular tags:</Typography>
                  <Grid container flexDirection="column" sx={{ marginLeft: '20px'}}>
                        {!!tags?.length ? tags.map(tag => (
                              <Grid key={`tag-#${tag}`} item>
                                    <Typography paragraph>{`# ${tag}`}</Typography>
                              </Grid>
                        )) : (
                              <Typography paragraph>Популярных постов нет :)</Typography>
                        )}
                  </Grid>
            </Paper>
         </Grid>
         {/* <Grid item>
          <Paper sx={{
               padding: '15px',
               width: '100%'
            }} elevation={3}>

                  <Typography variant="h5" sx={{ marginBottom: '20px'}}>Popular comments: </Typography>
                  <Grid container flexDirection="column" sx={{ marginLeft: '20px'}}>
                     <Grid item>
                           <Typography paragraph># React</Typography>
                     </Grid>
                     <Grid item>
                           <Typography paragraph># Angular</Typography>
                     </Grid>
                     <Grid item>
                           <Typography paragraph># Fronted</Typography>
                     </Grid>
                  </Grid>
            </Paper>
         </Grid> */}
      </Grid>
      )
}