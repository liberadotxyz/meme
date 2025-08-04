import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BalanceState {
   
    ETH: number;
    USDC: number;

}

const initialState: BalanceState = {
    ETH: 0,
    USDC: 0,
}

export const balanceSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<Partial<BalanceState>>) => {
        Object.assign(state, action.payload);
    }
  },
});



export const { setBalance } = balanceSlice.actions
export default balanceSlice.reducer
