import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "dark" };

const colorModeSlice = createSlice({
  name: "colorMode",
  initialState,
  reducers: {
    changeMode: (state) => {
      if (state.value === "dark") {
        state.value = "light";
      } else {
        state.value = "dark";
      }
    },
  },
});

export const { changeMode } = colorModeSlice.actions;
export default colorModeSlice.reducer;
