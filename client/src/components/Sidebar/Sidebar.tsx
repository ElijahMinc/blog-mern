import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'

interface SidebarProps {

}

export const Sidebar: React.FC<SidebarProps> = () => {

   return (
      <Grid container flexDirection="column" spacing={5}>
          <Grid item> 
            <Paper sx={{
               padding: '15px',
               width: '100%'
            }} elevation={3}>

                  <Typography variant="h5" sx={{ marginBottom: '20px'}}>Tags:</Typography>
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
         </Grid>
         <Grid item>
          <Paper sx={{
               padding: '15px',
               width: '100%'
            }} elevation={3}>

                  <Typography variant="h5" sx={{ marginBottom: '20px'}}>Comments</Typography>
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
         </Grid>
      </Grid>
      )
}