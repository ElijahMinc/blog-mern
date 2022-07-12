import { Action, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { AuthFormDefaultValues } from "../../components/Common/Form/AuthForm/types"
import { FormDefaultValuesPost } from "../../components/Logic/Posts/Post.interface"
import { TabValue } from "../../pages/Home"
import { LocalStorageKeys, LocalStorageService } from "../../service/LocalStorageService"
import { BaseInitState } from "../../types/global.types"
import { RootState } from "../configureStore"
import { setToast } from "../Toast"

export interface Likes {
  userIds: string[]
  isLikedStatus: boolean
  likes: number
}

export interface Post {
   _id: string
   title: string
   text: string
   userId: string
   // mongoose.Schema.Types.ObjectId
   tags?: string[]
   imageName?: string | null
   userInfo: Pick<AuthFormDefaultValues, 'firstname' | 'lastname'> & {avatar: string | null}
   createdAt: Date
   updatedAt: Date
   likes: Likes
}

interface InitialStatePost {
   posts: Post[] | null
   tags: Post['tags']
}


const initialState: BaseInitState<InitialStatePost> = {
  data: {
   posts: null,
   tags: []
  },
  isFetching: false,
  error: ''
}

export const getPostThunk = createAsyncThunk<Post[], {typeTab: TabValue, id?: string}, {rejectValue: string }>('post/get', async ({typeTab, id}, { dispatch, rejectWithValue }) => {
    try {

      let url = `${process.env.REACT_APP_API_URL}/post`

      switch (typeTab) {
        case TabValue.ALL:
          break;
        case TabValue.POPULARY:
            url += '-popular'
          break;
        case TabValue.CHOSEN_POST:
            url += `/${id}`
          break;
        default:
          break;
      }

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

export const getTagsByPopularPostThunk = createAsyncThunk<Post['tags'], undefined, {rejectValue: string }>('post/get-popular-tags', async (_: undefined, { dispatch, rejectWithValue }) => {
  try {

    const url = `${process.env.REACT_APP_API_URL}/post-popular-tags`


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



export const createPostThunk = createAsyncThunk<Post, FormDefaultValuesPost, {rejectValue: string }>('post/create', async (post, { dispatch, rejectWithValue }) => {
  try {

    const formData = new FormData()

    Object.entries(post).forEach(([name, value]) => {
      if(Array.isArray(value as string[])){
        for (const nameOfTag of value) {
          formData.append(name, nameOfTag)
        }
        return
      }
      formData.append(name, value)
    })

    let url = `${process.env.REACT_APP_API_URL}/post`



    const request = await axios.post(url, formData, {
       headers: {
          'Authorization': `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}`
        }
    })
    const response = await request.data
    
    dispatch(setToast({title: 'Post was created! ^^', status: 'success'}))

    return response
  } catch (err) {
    let error: string = 'Error'

    if(typeof err === 'string') error = err

    dispatch(setToast({title: error, status: 'error'}))

    return rejectWithValue(error)
  }
})

export const editPostThunk = createAsyncThunk<Post, FormDefaultValuesPost & {_id: string}, {rejectValue: string }>('post/edit', async (post, { dispatch, rejectWithValue }) => {
  try {

    const formData = new FormData()

    Object.entries(post).forEach(([name, value]) => {
      if(Array.isArray(value as string[])){
        for (const nameOfTag of value) {
          formData.append(name, nameOfTag)
        }
        return
      }
      formData.append(name, value)
    })

    let url = `${process.env.REACT_APP_API_URL}/post`


    const request = await axios.put(url, formData, {
       headers: {
          'Authorization': `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}`
        }
    })
    const response = await request.data

    dispatch(setToast({title: 'Post was edited! ^^', status: 'success'}))


    return response
  } catch (err) {
    let error: string = 'Error'

    if(typeof err === 'string') error = err

    dispatch(setToast({title: error, status: 'error'}))

    return rejectWithValue(error)
  }
})


export const likePostThunk = createAsyncThunk<Post, string, {rejectValue: string }>('post/edit/like', async (_id, { dispatch, rejectWithValue }) => {
  try {

    let url = `${process.env.REACT_APP_API_URL}/post/like/${_id}`


    const request = await axios.put(url, _id, {
       headers: {
          'Authorization': `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}`
        }
    })
    const response = await request.data

    dispatch(setToast({title: 'Post was liked', status: 'success'}))

    return response
  } catch (err) {
    let error: string = 'Error'

    if(typeof err === 'string') error = err
    
    dispatch(setToast({title: error, status: 'error'}))

    return rejectWithValue(error)
  }
})

export const deletePostThunk = createAsyncThunk<{ posts: Post[], message: string }, string, {rejectValue: string }>('post/delete', async (_id, { dispatch, rejectWithValue }) => {
  try {
    const formData = new FormData()
    formData.append('_id', _id)

    const request = await axios.delete(`${process.env.REACT_APP_API_URL}/post`, {
       data: formData,
       headers: {
          'Authorization': `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}`
        }
    })
    const response = await request.data
    dispatch(setToast({title: 'Post was deleted', status: 'success'}))

    return response
  } catch (err) {
    let error: string = 'Error'

    dispatch(setToast({title: error, status: 'error'}))

    if(typeof err === 'string') error = err

    return rejectWithValue(error)
  }
})

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts(state){
      state.data.posts = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPostThunk.fulfilled, (state, action) => {
      state.isFetching = false
      state.data.posts = action.payload

    })
    builder.addCase(getPostThunk.pending, (state, _) => {
      state.isFetching = true
    })
    builder.addCase(getPostThunk.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.payload || ''
    })

    builder.addCase(createPostThunk.fulfilled, (state, action) => {
      state.isFetching = false
    })
    builder.addCase(createPostThunk.pending, (state, _) => {
      state.isFetching = true
    })
    builder.addCase(createPostThunk.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.payload || ''
    })

    builder.addCase(editPostThunk.fulfilled, (state, _) => {
      state.isFetching = false
    })
    builder.addCase(editPostThunk.pending, (state, _) => {
      state.isFetching = true
    })
    builder.addCase(editPostThunk.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.payload || ''
    })

    builder.addCase(likePostThunk.fulfilled, (state, action) => {
      // state.data.posts = state.data.posts
      // state.isFetching = false
    })
    builder.addCase(likePostThunk.pending, (state, _) => {
      // state.isFetching = true
    })
    builder.addCase(likePostThunk.rejected, (state, action) => {
      // state.isFetching = false
      state.error = action.payload || ''
    })

    builder.addCase(deletePostThunk.fulfilled, (state, action) => {
      state.data.posts = action.payload.posts
      state.isFetching = false
    })
    builder.addCase(deletePostThunk.pending, (state, _) => {
      state.isFetching = true
    })
    builder.addCase(deletePostThunk.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.payload || ''
    })


    builder.addCase(getTagsByPopularPostThunk.fulfilled, (state, action) => {
      state.data.tags = action.payload
      state.isFetching = false
    })
    builder.addCase(getTagsByPopularPostThunk.pending, (state, _) => {
      state.isFetching = true
    })
    builder.addCase(getTagsByPopularPostThunk.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.payload || ''
    })
  },
})

export const { resetPosts } = postSlice.actions
export const postReducer = postSlice.reducer
export const selectPost = (state: RootState) => state.posts
