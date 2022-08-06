import { Avatar, Divider, Fab, Grid, List, ListItem, ListItemIcon, Typography, Paper, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
   //  height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '450px',            
    overflowY: 'auto'
  }
});

export const Chat = () => {
  const classes = useStyles();

  return (
      <div style={{height: '100%'}}>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem key="RemySharp">
                        {/* <ListItemIcon>
                           <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon> */}
                        <Typography>Room: 3</Typography>
                    </ListItem>
                </List>
                <Divider />
                <Typography padding={2}>Online: 3</Typography>
                <Divider /> 
                <List>
                    <ListItem key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <Typography >Remy Sharp</Typography>
                        <Typography  align="right"></Typography>
                    </ListItem>
                    <ListItem  key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <Typography >Alice</Typography>
                    </ListItem>
                    <ListItem  key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <Typography >Cindy Baker</Typography>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9} >
                <List className={classes.messageArea}>
                     <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography component="p" align="right" >Hey, Iam Good! What about you ?</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="p" align="right" >Name</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="p" align="right" >09:31</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography component="p" align="left" >Hey, Iam Good! What about you ?</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="p" align="left" >Name</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="p" align="left" >09:31</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography component="p" align="right" >asasddas</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="p" align="right" >10:30</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>

                </List>
                <Divider />
                <Grid container style={{padding: '20px'}} justifyContent="space-between" gap={2}>
                    <Grid item xs={10}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} alignSelf="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}
