import { AlertColor } from "@mui/material"
import { Action, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { AuthFormDefaultValues } from "../../components/Common/Form/AuthForm/types"
import { LocalStorageKeys, LocalStorageService } from "../../service/LocalStorageService"
import { BaseInitState } from "../../types/global.types"
import { v4 as uuidv4 } from 'uuid'

import { RootState } from "../configureStore"

export interface ToastInterface {
   id: string | number
   title: string
   status: AlertColor
}

interface InitialStateToast {
   toasts: ToastInterface[]
}
export const generateToast = (title: ToastInterface['title'], status: ToastInterface['status']) => ({
   id: uuidv4(),
   title,
   status
})


const initialState: InitialStateToast = {
   toasts: [],
}


export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
   //  setIsShow(state, { payload }: PayloadAction<boolean>){
   //    state.isShow = payload
   //  },
    setToast(state, { payload }: PayloadAction<Omit<ToastInterface, 'id'>>){
      state.toasts.push(generateToast(payload.title, payload.status))
    },
    removeToast(state, { payload }: PayloadAction<ToastInterface['id']>){
      state.toasts = state.toasts.filter((toast) => toast.id !== payload)
    },
  },
})

export const { setToast, removeToast } = toastSlice.actions
export const toastReducer = toastSlice.reducer
export const selectToast = (state: RootState) => state.toast
