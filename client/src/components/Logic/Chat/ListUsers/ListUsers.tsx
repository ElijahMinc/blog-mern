import { useDebounce } from '@/hooks/useDebounce'
import { socket } from '@/http/socket.io.http'
import { UserInterface } from '@/types/socket.io'
import { Avatar, ListItem, ListItemIcon, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'


export const ListUsers: React.FC<UserInterface & {roomId: string }> = ({ userName, userAvatar, roomId }) => {

   const [statusWriting, setStatusWriting ] = useState(false)
   const debounce =  useDebounce(() => {
      setStatusWriting(false)
   }, 600)

   useEffect(() => {
      socket.on('MESSAGE:WRITING', ({userName: nameOfWritingPerson}) => { 
         if(nameOfWritingPerson === userName){
            setStatusWriting(true)
            debounce()(undefined) 
         }
      })
   }, [])

   return (
      <ListItem key={`${userName}-${userAvatar}`}>
         <ListItemIcon>
            <Avatar alt="Remy Sharp" src={userAvatar ?? ''} />
         </ListItemIcon>
         <Typography >{userName} {statusWriting && <b>writing...</b>}</Typography>
      </ListItem>
      )
}