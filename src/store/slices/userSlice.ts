import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isConnected: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  isConnected: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
      state.isConnected = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isConnected = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
