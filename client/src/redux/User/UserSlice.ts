import { Action, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { AuthFormDefaultValues } from "../../components/Common/Form/AuthForm/types"
import { LocalStorageKeys, LocalStorageService } from "../../service/LocalStorageService"
import { BaseInitState } from "../../types/global.types"
import { RootState } from "../configureStore"

interface InitialStateUser {
  isAuth: boolean
  user: AuthFormDefaultValues & {_id: string, avatar?: string}
  token: string | null
}


const initialState: BaseInitState<InitialStateUser> & { isFetchingAuth: boolean } = {
  data: {
    isAuth: false,
    user: {
      _id: '',
      firstname: '',
      lastname: '',
      password: '',
      email: ''
    },
    token: null
  },
  isFetching: true,
  isFetchingAuth: false,
  error: ''
}

export const loginThunk = createAsyncThunk<Omit<InitialStateUser, 'isAuth'>, AuthFormDefaultValues, {rejectValue: string }>('user/login', async (user, { dispatch, rejectWithValue }) => {
    try {
      const request = await axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/login`, user)
      const response = await request.data

      return response
    } catch (err) {
      let error: string = 'Error'

      if(typeof err === 'string') error = err

      return rejectWithValue(error)
    }
})

export const registerThunk = createAsyncThunk<Omit<InitialStateUser, 'isAuth'>, AuthFormDefaultValues, {rejectValue: string }>('user/register', async (user, { dispatch, rejectWithValue }) => {
  try {

    const request = await axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/register`, user)
    const response = await request.data

    return response
  } catch (err) {
    console.log(err)
    let error: string = 'Error'

    if(typeof err === 'string') error = err

    return rejectWithValue(error)
  }
})

export const userThunk = createAsyncThunk<Omit<InitialStateUser, 'isAuth'>['user'], string, {rejectValue: string }>('login/user', async (token, { dispatch, rejectWithValue }) => {
  try {

    const request = await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/user`, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })

    const response = await request.data

    return response
  } catch (err) {
    console.log(err)
    let error: string = 'Error'

    if(typeof err === 'string') error = err
    dispatch(refreshAuth())
    return rejectWithValue(error)
  }
})

export const setAvatarThunk = createAsyncThunk<{user:Omit<InitialStateUser, 'isAuth'>['user'], message: string }, File, {rejectValue: string }>('login/user/avatar', async (avatar, { dispatch, rejectWithValue }) => {
  try {
    const form = new FormData()
    form.append('image', avatar)

    const request = await axios.put(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/user/avatar`,form, {
      headers: {
        'Authorization': `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}` 
      }
    })

    const response = await request.data

    dispatch(removeUserFromStorage())

    return response
  } catch (err) {
    console.log(err)
    let error: string = 'Error'

    if(typeof err === 'string') error = err
    return rejectWithValue(error)
  }
})

export const deleteAvatarThunk = createAsyncThunk<{user:Omit<InitialStateUser, 'isAuth'>['user'], message: string }, undefined, {rejectValue: string }>('login/user/avatar/delete', async (_ = undefined, { dispatch, rejectWithValue }) => {
  try {

    const request = await axios.delete(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/user/avatar`,{
      headers: {
        'Authorization': `Bearer ${LocalStorageService.get(LocalStorageKeys.TOKEN)}` 
      }
    })

    const response = await request.data

    dispatch(removeUserFromStorage())

    return response
  } catch (err) {
    console.log(err)
    let error: string = 'Error'

    if(typeof err === 'string') error = err
    return rejectWithValue(error)
  }
})
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    refreshAuth(state){
      state.data = initialState.data
      LocalStorageService.clear()
    },
    setToken(state, action: PayloadAction<string>){
      state.data.token = action.payload
    },
    removeUserFromStorage(_){
        LocalStorageService.delete(LocalStorageKeys.USER)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.data.isAuth = true
      state.isFetchingAuth = false
      state.data.user = action.payload.user
      state.data.token = action.payload.token

      // SET TOKEN INTO LOCAL STORAGE
      action.payload.token && LocalStorageService.set(LocalStorageKeys.TOKEN, action.payload.token)
    })
    builder.addCase(loginThunk.pending, (state, _) => {
      state.isFetchingAuth = true
    })
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.data.isAuth = false
      state.isFetchingAuth = false
      state.error = action.payload || ''
    })

    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.data.isAuth = true
      state.isFetchingAuth = false
      state.data.user = action.payload.user
      state.data.token = action.payload.token

      // SET TOKEN INTO LOCAL STORAGE
      action.payload.token &&  LocalStorageService.set(LocalStorageKeys.TOKEN, action.payload.token)
    })
    builder.addCase(registerThunk.pending, (state, _) => {
      state.isFetchingAuth = true
    })
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.data.isAuth = false
      state.isFetchingAuth = false
      state.error = action.payload || ''
    })

    builder.addCase(userThunk.fulfilled, (state, action) => {
      state.data.isAuth = true
      state.isFetching = false
      state.data.user = action.payload

      // SET TOKEN INTO LOCAL STORAGE
      LocalStorageService.set(LocalStorageKeys.USER, action.payload)
      // LocalStorageService.set(LocalStorageKeys.TOKEN, action.payload)

    })
    builder.addCase(userThunk.pending, (state, _) => {
      state.isFetching = true
    })
    builder.addCase(userThunk.rejected, (state, action) => {
      state.data.isAuth = false
      state.isFetching = false
      state.error = action.payload || ''
    })
    

    builder.addCase(setAvatarThunk.fulfilled, (state, action) => {
      state.isFetching = false
      state.data.user = action.payload.user

      // SET TOKEN INTO LOCAL STORAGE
      LocalStorageService.set(LocalStorageKeys.USER, action.payload)
    })
    builder.addCase(setAvatarThunk.pending, (state, _) => {
      state.isFetching = true
    })

    builder.addCase(setAvatarThunk.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.payload || ''
    })
 

    builder.addCase(deleteAvatarThunk.fulfilled, (state, action) => {
      state.isFetching = false
      state.data.user = action.payload.user

      // SET TOKEN INTO LOCAL STORAGE
      LocalStorageService.set(LocalStorageKeys.USER, action.payload)
    })
    builder.addCase(deleteAvatarThunk.pending, (state, _) => {
      state.isFetching = true
    })

    builder.addCase(deleteAvatarThunk.rejected, (state, action) => {
      state.isFetching = false
      state.error = action.payload || ''
    })
 
  },
})

export const { refreshAuth, setToken, removeUserFromStorage} = userSlice.actions
export const userReducer = userSlice.reducer
export const selectUser = (state: RootState) => state.users
