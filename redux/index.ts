import { configureStore } from "@reduxjs/toolkit";
import userReducer from './authSlice'

import { AuthState } from "./authSlice";
import { BalanceState } from "./balanceSlice";
import balanceReducer from './balanceSlice'
// import { GameState } from "./gameSlice";
// import gameReducer from './gameSlice';
import dialogReducer from './dailogSlice';
// import { DailogState } from "./dailogSlice";
import { DialogState } from "./dailogSlice";

export type State = {
    user:AuthState,
    balance:BalanceState,
    // game:GameState,
    dialog:DialogState
}

const reducer = {
    user:userReducer,
    balance:balanceReducer,
    // game:gameReducer,
    dialog:dialogReducer
}

export const store = configureStore({
    reducer
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch