import { createSlice } from "@reduxjs/toolkit";
import { LayoutState } from "./interface";
import { TABS } from "@/enums";

const INIT_LAYOUT_STATE: LayoutState = {
  activeTab: TABS.ANALYTICS,
};

const layoutSlice = createSlice({
  name: "Layout",
  initialState: INIT_LAYOUT_STATE,
  reducers: {
    changeActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export default layoutSlice.reducer;
export const { changeActiveTab } = layoutSlice.actions;
