import { createSlice } from "@reduxjs/toolkit";

const initialState = { authenticated: false, email: null, password: null };

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialState },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialState;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

/* export your actions and your reducer */
