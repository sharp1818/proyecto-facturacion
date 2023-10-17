// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  email?: string | undefined;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;