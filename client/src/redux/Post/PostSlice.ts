import { $AuthApi } from "@/http/axios.http"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { AuthFormDefaultValues } from "../../components/Common/Form/AuthForm/types"
import { FormDefaultValuesPost } from "../../components/Logic/Posts/types/Post.interface"
import { LocalStorageKeys, LocalStorageService } from "../../service/LocalStorageService"
import { BaseInitState } from "../../types/global.types"
import { RootState } from "../configureStore"
import { InitialStateFilter, TabValue } from "../Filter"
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
   cloudinaryId?: string | null
   cloudinaryUrl?: string | null
   userInfo: Pick<AuthFormDefaultValues, 'firstname' | 'lastname'> & {cloudinaryAvatarUrl: string | null}
   createdAt: Date
   updatedAt: Date
   likes: Likes
}

interface InitialStatePost {
    total: number
   posts: Post[] | null
   tags: Post['tags']
}


const initialState: BaseInitState<InitialStatePost> = {
  data: {
   posts: null,
   total: 0,
   tags: []
  },
  isFetching: true,
  error: ''
}

export const getPostThunk = createAsyncThunk<{ posts:Post[], total: number}, {typeTab?: TabValue, tags?:string[], id?: string, page?: number, limit?: number, searchValue?: string}, {rejectValue: string }>('post/get', async ({typeTab, id, page = undefined, searchValue = '', tags = []}, { dispatch, rejectWithValue }) => {
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

      if(!!page) url += `?page=${page}`

      if(!!searchValue) url += `${!page ? '?' : '&'}searchValue=${searchValue}`

      if(!!tags.length) url += tags.reduce((prevValue, currentValue, idx) => {
          if(tags.length - 1 !== idx)  return prevValue + `tags=${currentValue}&`

          return prevValue + `tags=${currentValue}`
      },  !page && !searchValue ? '?' : '&')

      const request = await $AuthApi.get(url)

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


    const request = await $AuthApi.get(url)
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



    const request = await $AuthApi.post(url, formData)
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


    const request = await $AuthApi.put(url, formData)
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


    const request = await $AuthApi.put(url, _id)
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

export const deletePostThunk = createAsyncThunk<{ posts: Post[], message: string, total: number }, {_id: string, filters: InitialStateFilter }, {rejectValue: string }>('post/delete', async ({_id, filters}, { dispatch, rejectWithValue }) => {
  try {

    let url = `${process.env.REACT_APP_API_URL}/post/${_id}`

    if(!!filters.page) url += `?page=${filters.page}`

    if(!!filters.searchValue) url += `${!filters.page ? '?' : '&'}searchValue=${filters.searchValue}`


    const request = await $AuthApi.delete(url)
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostThunk.fulfilled, (state, action) => {
      state.data.posts = action.payload.posts
      state.data.total = action.payload.total
      state.isFetching = false

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

    builder.addCase(likePostThunk.rejected, (state, action) => {
      state.error = action.payload || ''
    })

    builder.addCase(deletePostThunk.fulfilled, (state, action) => {
      // state.data.posts = (state.data?.posts ?? []).filter(post => post._id !== action.payload._id)
      state.data.posts = action.payload.posts
      state.data.total = action.payload.total
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

export const selectIsAllFetching = (state: RootState) => {
  const {
    data: {
      posts,
    },
    isFetching
  } = state.posts

  const isAllFetching = !Array.isArray(posts) || isFetching

  return isAllFetching
}