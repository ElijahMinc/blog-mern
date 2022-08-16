import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Divider, Fab, Grid, List, ListItem, ListItemIcon, Typography, Paper, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import { socket } from '@/http/socket.io.http';
import { useDispatch, useSelector } from 'react-redux';
import { selectChat, selectUser, setJoined } from '@/redux';
import moment from 'moment';
import { useDebounce } from '@/hooks/useDebounce';
import { ListUsers } from './ListUsers/ListUsers';
import { Emoji } from '@/components/Common/Emoji/Emoji';

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

export const Messager: React.FC = () => {
   const classes = useStyles();

   const { data: {
    user: {
        _id,
       cloudinaryAvatarUrl
    }
 }} = useSelector(selectUser)
 
 const dispatch = useDispatch()

 const {userName, roomId, messages, users} = useSelector(selectChat)

 const [messageValue, setMessageValue ] = useState('')

 const messagesRef = useRef<HTMLUListElement | null>(null)



 const sendMessage = () => {
    const messageData = {
        userId: _id,
        text: messageValue,
        userAvatar: cloudinaryAvatarUrl ?? '',
        roomId,
        userName,
    }
    socket.emit('NEW:MESSAGE', messageData)
    setMessageValue('')
 }

 
 useEffect(() => {
    !!messagesRef?.current
            && messagesRef.current
                .scrollTo(0, messagesRef.current.scrollHeight)

   }, [messages.length])


   return (
      <div style={{height: '100%'}}>

        <Grid container gap={3}>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
            <Grid item xs={12} sx={{padding: '10px'}}>
                <Button variant='outlined' onClick={() => {
                    socket.disconnect()
                    dispatch(setJoined(false))
                }} className="header-message">Exit</Button>
                
            </Grid>
          
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem key="RemySharp">
                        <Typography>Room: {roomId}</Typography>
                    </ListItem>
                </List>
                <Divider />
                <Typography padding={2}>Online: {users.length}</Typography>
                <Divider /> 
                <List>
                    {users.map(({userAvatar, userName}, idx) => (
                        <ListUsers 
                        key={`${userAvatar}-${idx}`} 
                        {...
                            {userAvatar, userName, roomId}
                        } />
                    ))}
                </List>
            </Grid>
            <Grid item xs={9} >
                <List className={classes.messageArea} ref={messagesRef}>
                    {messages.map((message, idx) => (
                            <ListItem key={`${message.text}-${idx}`}>
                                <Grid container >
                                    <Grid item xs={12}>
                                        <Grid 
                                            container
                                            alignItems="center" 
                                            flexWrap="nowrap"
                                            gap={3}
                                        >
                                            <Grid item xs={1} alignSelf="flex-end">
                                                <Grid container flexDirection="column">
                                                    <Grid item >
                                                        <Avatar   src={message.userAvatar} />

                                                    </Grid>
                                                    <Grid item>
                                                    <Typography component="span"  sx={{fontSize: '12px'}}  >{message.userName}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                    <Typography component="span"  sx={{fontSize: '12px'}}  >{moment().format('DD:mm:yyyy')}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={11} >
                                                <Typography component="p" >{message.text}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                 

                        </ListItem>
                        
                    ))}
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}} justifyContent="space-between" gap={1}>
                    <Grid item xs={10}>
                        <TextField id="outlined-basic-email" value={messageValue} onChange={(e) => {
                            setMessageValue(e.target.value)
                            socket.emit('MESSAGE:WRITING', {roomId, userName})
                        }} label="Type Something" fullWidth />
                    </Grid>
                    {/* <Grid item xs={3}>
                        <Emoji />
                    </Grid> */}
                    <Grid item xs={1} alignSelf="right">
                        <Fab color="primary" aria-label="add" disabled={!messageValue} onClick={sendMessage}> 
                            <SendIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
   
    </div>
    )
}