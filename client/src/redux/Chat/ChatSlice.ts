import { $AuthApi } from "@/http/axios.http"
import { MessageInterface, RoomJoinInterface, UserInterface } from "@/types/socket.io"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"


import { RootState } from "../configureStore"
import { setToast } from "../Toast"

export interface InitialStateChat {
   isJoined: boolean
   roomId: string
   userAvatar: string | null
   userName: string
   messages: MessageInterface[]
   users: UserInterface[]
   rooms: string[]

   isFetching: boolean
   error: string
}



const initialState: InitialStateChat = {
   isJoined: false,
   roomId: '',
   userName: '',
   userAvatar: '',
   messages: [],
   users: [],
   rooms:[],

   isFetching: false,
   error: ''
}


export const getRooms = createAsyncThunk<string[], undefined, { rejectValue: string }>('get/rooms', async (_ = undefined, { dispatch, rejectWithValue }) => {
   try {
     const request = await $AuthApi.get<string[]>(`${process.env.REACT_APP_API_URL}/rooms`)
     const response = await request.data

     dispatch(setToast({title: !response.length ? `There are no rooms, but you can be the first to create :)` : `Count rooms: ${response.length}`, status: 'success'}))


     return response
   } catch (err) {
     let error: string = 'Error'

     if(typeof err === 'string') error = err
     dispatch(setToast({title: error, status: 'error'}))

     return rejectWithValue(error)
   }
})


export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setJoined(state, { payload }: PayloadAction<boolean>){
      state.isJoined = payload
    },
    setUsers(state, { payload }: PayloadAction<UserInterface[]>){
      state.users = payload ?? []
    },
    setMessages(state, { payload }: PayloadAction<MessageInterface[]>){
      state.messages = payload ?? []
    },
    setRoomData(state, { payload }: PayloadAction<RoomJoinInterface>){
      state.userName = payload.userName
      state.roomId = payload.roomId
      state.userAvatar = payload.userAvatar
    },
  },
  extraReducers: (builder) => {
   builder.addCase(getRooms.fulfilled, (state, {payload}: PayloadAction<string[]>) => {
      state.isFetching = false
      state.rooms = payload
    })
    builder.addCase(getRooms.pending, (state, _) => {
      state.isFetching = true
      state.error =  ''
    })
    builder.addCase(getRooms.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.payload || ''
    })

  }
})

export const { setJoined, setUsers, setMessages, setRoomData } = chatSlice.actions
export const chatReducer = chatSlice.reducer



export const selectChat = (state: RootState) => state.chat


