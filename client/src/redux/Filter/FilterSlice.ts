import { AlertColor } from "@mui/material"
import { Action, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { AuthFormDefaultValues } from "../../components/Common/Form/AuthForm/types"
import { LocalStorageKeys, LocalStorageService } from "../../service/LocalStorageService"
import { BaseInitState } from "../../types/global.types"
import { v4 as uuidv4 } from 'uuid'

import { RootState } from "../configureStore"

export interface InitialStateFilter {
   page: number
   limit: number
   searchValue: string
   tabValue: TabValue
   tagValues: string[]
}

export enum TabValue {
  ALL = 1,
  POPULARY = 2,

  CHOSEN_POST = 3
}

const initialState: InitialStateFilter = {
   page: 0,
   limit: 3,
   tabValue: TabValue.ALL,
   searchValue: '',
   tagValues: []
}


export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPage(state, { payload }: PayloadAction<number>){
      state.page = payload - 1
    },
    setLimit(state, { payload }: PayloadAction<number>){
      state.limit = payload
    },
    setSearchValue(state, { payload }: PayloadAction<string>){
      state.searchValue = payload
    },
    setTabValue(state, { payload }: PayloadAction<TabValue>){
      state.tabValue = payload
    },
    setTagsValue(state, { payload }: PayloadAction<string[]>){
      state.tagValues = payload
    },
  },
})

export const { setPage, setLimit, setSearchValue, setTabValue, setTagsValue } = filterSlice.actions
export const filterReducer = filterSlice.reducer



export const selectFilter = (state: RootState) => state.filter


