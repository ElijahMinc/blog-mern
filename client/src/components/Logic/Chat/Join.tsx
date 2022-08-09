import { Anchor, StateAnchor, ThemedDrawer } from '@/components/Common/Drawer/Drawer'
import { ThemedInput } from '@/components/Common/ThemedInput/ThemedInput'
import { socket } from '@/http/socket.io.http'
import { getRooms, selectChat, selectUser, setJoined, setRoomData } from '@/redux'
import { AppDispatch } from '@/redux/configureStore'
import { LocalStorageKeys, LocalStorageService } from '@/service/LocalStorageService'
import { getFormRules } from '@/utils/formRules'
import { Button, FormControl, Grid, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface JoinProps {

}

interface JoinChatDefaultValues{
   room: string
}

const defaultValues = {
   room: ''
}

export const Join: React.FC<JoinProps> = () => {
   const { data: {
      user: {
         firstname,
         lastname,
         cloudinaryAvatarUrl
      }
   }} = useSelector(selectUser)


   const { rooms } = useSelector(selectChat)

   const [toggleAnchorValue, setToggleAnchorValue] = React.useState<StateAnchor>({
      right: false,
      top: false,
      bottom: false,
      left: false
    });
  

   const form = useForm<JoinChatDefaultValues>({
      defaultValues,
      mode: 'onSubmit',
   })

   const { handleSubmit } = form
   const dispatch = useDispatch<AppDispatch>();

   const onSubmit = async (data: JoinChatDefaultValues) =>  {
      socket.connect()
      
      const { room } = data

      const roomData = {
         userName: `${firstname} ${lastname}`,
         userAvatar: cloudinaryAvatarUrl,
         roomId: room
      }
      try {
         await axios.post(`${process.env.REACT_APP_API_URL}/join-room`, { roomId: roomData.roomId }, {
            headers: {
               'Authorization': `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}`
            }
         })
         socket.emit('ROOM:JOIN', roomData)
         dispatch(setJoined(true))
         dispatch(setRoomData(roomData))

      } catch (error) {
         console.log(error)
      }

   }


   

    const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {

  
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setToggleAnchorValue({ ...toggleAnchorValue, [anchor]: open });
    }

    const handleGetRoom = (name: string) => {
      onSubmit({room: name})
    }

   
   return (
      <Container maxWidth="sm" sx={{
         display: 'flex',
         height: '80vh',
         justifyContent: 'center',
         alignItems: 'center',
      }}>
         <Paper sx={{padding: '20px'}}>
            <Typography variant="h4" component="h2" sx={{ flexGrow: 1, marginBottom: '20px' }} textAlign={'center'} >
              Enter Room
            </Typography>
            <FormControl component="form"  autoComplete='false' fullWidth onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={2} flexDirection="column">
                  <Grid item xs={12}>
                     <ThemedInput<JoinChatDefaultValues> 
                        form={form}
                        name='room'
                        type="text"
                        label="Name of room"
                        rules={getFormRules('Name Field is Required', {
                           isName: true
                        })}
                     />
                     </Grid>
                     <Grid item xs={12}>
                        <Button 
                           fullWidth
                           variant='outlined'
                           onClick={() => dispatch(getRooms())}
                        >
                          get actually Status Rooms
                        </Button>
                     </Grid>
                     {!!rooms.length && (
                     <Grid item xs={12}>
                        <Button 
                           fullWidth
                           variant='outlined'
                           onClick={toggleDrawer('right', true)}
                        >
                           Show Rooms
                        </Button>
                     </Grid>      
                     )}
                  <Grid item xs={12}>
                     <Button type='submit' variant="contained" fullWidth>Join</Button>
                  </Grid>
               </Grid>
            </FormControl>
           
         </Paper>

         <ThemedDrawer anchor='right' state={toggleAnchorValue} toggleDrawer={toggleDrawer} handleGetRoom={handleGetRoom} rooms={rooms} /> 
      </Container>
      )
}