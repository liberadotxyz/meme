import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  username: string;
  address: string;
  isConnected: boolean;
  referral_code: string;
}

const initialState: AuthState = {
  username: "",
  address: "",
  isConnected: false,
  referral_code: ""
};

export const authSlice = createSlice({
  name: 'users', // Changed from 'users' to 'auth' for consistency
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<AuthState | null>) => {
      if (!action.payload) {
        // Reset state on disconnect
        return initialState;
      } else {
        return { ...state, ...action.payload };
      }
    },
    setUser: (state, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload };
    }
  },
});

export const { updateUser, setUser } = authSlice.actions;
export default authSlice.reducer;