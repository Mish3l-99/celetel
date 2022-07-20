import { createSlice } from "@reduxjs/toolkit";

const initialState = true;

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { value: initialState },
  reducers: {
    openSideBar: (state, action) => {
      state.value = true;
    },
    closeSideBar: (state, action) => {
      state.value = false;
    },
  },
});

export const { openSideBar, closeSideBar } = sidebarSlice.actions;
export default sidebarSlice.reducer;

/* export your actions and your reducer */
