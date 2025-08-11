// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import buyReducer from './quickbuy';
import { BuyState } from "./quickbuy";
export type State = {
   buy:BuyState
}
const rootReducer = combineReducers({
  buy: buyReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [ "buy"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist requirement
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
