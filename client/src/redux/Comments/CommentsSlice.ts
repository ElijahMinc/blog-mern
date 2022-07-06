import { Action, AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { AuthFormDefaultValues } from "../../components/Common/Form/AuthForm/types"
import { FormDefaultValuesPost } from "../../components/Posts/Post.interface"
import { TabValue } from "../../pages/Home"
import { LocalStorageKeys, LocalStorageService } from "../../service/LocalStorageService"
import { BaseInitState } from "../../types/global.types"
import { RootState } from "../configureStore"



export interface Comment {
   _id: string
   text: string
   userId: string
   postId: string
   userInfo: Pick<AuthFormDefaultValues, 'firstname' | 'lastname'> & {avatar: string | null}
   createdAt: Date
   updatedAt: Date
}

export type CommentBody = Omit<Comment, 'userInfo' | 'createdAt' | 'updatedAt' | '_id'>

interface InitialStateComments {
   comments: Comment[] | null
}


const initialState: BaseInitState<InitialStateComments> = {
  data: {
   comments: null
  },
  isFetching: true,
  error: ''
}

export const getCommentsThunk = createAsyncThunk<Comment[], undefined, {rejectValue: string }>('comments/get', async (_ = undefined, { dispatch, rejectWithValue }) => {
    try {

      let url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/comment`

      const request = await axios.get(url, {
         headers: {
            'Authorization': `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}`
          }
      })
      const response = await request.data

      return response
    } catch (err) {
      let error: string = 'Error'

      if(typeof err === 'string') error = err

      return rejectWithValue(error)
    }
})

export const getCommentsByPostIdThunk = createAsyncThunk<Comment[], string, {rejectValue: string }>('comments/get', async (postId, { dispatch, rejectWithValue }) => {
  try {

    let url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/comment/${postId}`

    const request = await axios.get(url, {
       headers: {
          'Authorization': `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}`
        }
    })
    const response = await request.data

    return response
  } catch (err) {
    let error: string = 'Error'

    if(typeof err === 'string') error = err

    return rejectWithValue(error)
  }
})

export const createCommentThunk = createAsyncThunk<Comment, CommentBody, {rejectValue: string }>('comment/create', async (comment, { dispatch, rejectWithValue }) => {
  try {

    let url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/comment`

    const formData = new FormData()

    Object.entries(comment).forEach(([name, value]) => {
      formData.append(name, value)
    })

    const request = await axios.post(url, formData, {
       headers: {
          'Authorization': `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}`
        }
    })
    const response = await request.data

    return response
  } catch (err) {
    let error: string = 'Error'

    if(typeof err === 'string') error = err

    return rejectWithValue(error)
  }
})






export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getCommentsThunk.fulfilled, (state, action) => {
      state.isFetching = false
      state.data.comments = action.payload
    })
    builder.addCase(getCommentsThunk.pending, (state, _) => {
      state.isFetching = true
    })
    builder.addCase(getCommentsThunk.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.payload || ''
    })



    builder.addCase(createCommentThunk.fulfilled, (state, action: PayloadAction<Comment>) => {
      state.isFetching = false
      state.data.comments =  [...(state.data.comments ?? []), action.payload]
    })
    builder.addCase(createCommentThunk.pending, (state, _) => {
      state.isFetching = true
    })
    builder.addCase(createCommentThunk.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.payload || ''
    })

  },
})

export const {  } = commentsSlice.actions
export const commentsReducer = commentsSlice.reducer
export const selectComments = (state: RootState) => state.comments
