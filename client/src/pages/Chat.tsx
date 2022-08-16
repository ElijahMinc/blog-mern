import React, { useEffect, useRef } from 'react';
import { socket } from '@/http/socket.io.http';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms, selectChat, setJoined, setMessages, setUsers } from '@/redux/Chat/ChatSlice';
import { MessageInterface } from '@/types/socket.io';
import { Join } from '@/components/Logic/Chat/Join';
import { Messager } from '@/components/Logic/Chat/Messager';
import { setToast } from '@/redux';
import { AppDispatch } from '@/redux/configureStore';




export const Chat = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { messages, isJoined } = useSelector(selectChat)
  const messagesRef = useRef<MessageInterface[]>([]);


  messagesRef.current = messages

  useEffect(() => {
    socket.on('ROOM:JOINED', (messages) => {
      dispatch(setMessages(messages))
      dispatch(setJoined(true))
    })
    socket.on('USERS:SET', (users) => {
      dispatch(setUsers(users))
    })
    socket.on('NEW:MESSAGE', (messages) => {
      dispatch(setMessages(messages))
    })
   
  }, [])

  useEffect(() => {
    socket.on('ROOM:LEAVE', (userLeave) => {
      console.log('disconnect')
      dispatch(setJoined(false))
      dispatch(setToast({title: `User ${userLeave.userName} leave`, status: 'info'}))
    })
  }, [])


  useEffect(() => {
    !isJoined && dispatch(getRooms())
  }, [isJoined])

  return (
    isJoined ? <Messager /> : <Join/>
  )
}
