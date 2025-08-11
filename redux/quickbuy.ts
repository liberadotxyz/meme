import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BuyState {
   
    value: string;

}

const initialState: BuyState = {
    value : "0"
}

export const buySlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    setBuy: (state, action: PayloadAction<Partial<BuyState>>) => {
        Object.assign(state, action.payload);
    }
  },
});



export const { setBuy } = buySlice.actions
export default buySlice.reducer
