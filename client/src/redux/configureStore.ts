
import { AnyAction, combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { userReducer, postReducer, commentsReducer } from "."

const rootReducer = combineReducers({
   users: userReducer,
   posts: postReducer,
   comments: commentsReducer
})

export const store = configureStore({
   reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>