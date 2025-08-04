// dialogSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DialogState {
    status: "win" | "lost" | "idle";
    open: boolean;
    betAmount: number | null;
    winAmount: number | null;
    txHash: string | null;
    userAddress: string | null;
}

const initialState: DialogState = {
    status: "idle",
    open: false,
    betAmount: null,
    winAmount: null,
    txHash: null,
    userAddress: null
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    updateDialogState: (state, action: PayloadAction<Partial<DialogState>>) => {
        return { ...state, ...action.payload };
    },
   
  },
})

export const { updateDialogState } = dialogSlice.actions;
export default dialogSlice.reducer;