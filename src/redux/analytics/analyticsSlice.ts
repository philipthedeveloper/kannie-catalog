import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAnalytics } from "@/api";
import { GetAnalyticsResponse } from "./interface";
import { IAnalytics } from "@/interfaces";

export interface AnalyticsState {
  isAnalyticsFetched: boolean;
  isFetchingAnalytics: boolean;
  analyticsFetchError: string;
  fetchMessage: string;
  analytics: IAnalytics[];
}

const INIT_STATE: AnalyticsState = {
  isAnalyticsFetched: false,
  isFetchingAnalytics: false,
  analyticsFetchError: "",
  fetchMessage: "",
  analytics: [],
};

// Get analytics thunk
export const getAnalyticsThunk = createAsyncThunk(
  "getStaffAnalytics",
  async (data: any, thunkAPI) => {
    try {
      const response =
        (await getAnalytics()) as unknown as GetAnalyticsResponse;
      return {
        analytics: response.analytics,
        message: response.message,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const analyticsSlice = createSlice({
  name: "Analytics",
  initialState: INIT_STATE,
  reducers: {
    resetFetchAnalyticsState: (state: AnalyticsState) => {
      state.isFetchingAnalytics = false;
      state.isAnalyticsFetched = false;
      state.analyticsFetchError = "";
      state.fetchMessage = "";
      state.analytics = [];
    },
  },
  extraReducers: (builder) => {
    // Get analytics
    builder.addCase(
      getAnalyticsThunk.pending,
      (state: AnalyticsState, action) => {
        state.isFetchingAnalytics = true;
        state.isAnalyticsFetched = false;
        state.analyticsFetchError = "";
        state.fetchMessage = "";
        state.analytics = [];
      }
    );

    builder.addCase(
      getAnalyticsThunk.fulfilled,
      (state: AnalyticsState, action) => {
        state.isFetchingAnalytics = false;
        state.isAnalyticsFetched = true;
        state.analytics = action.payload.analytics;
        state.fetchMessage = action.payload.message;
      }
    );

    builder.addCase(
      getAnalyticsThunk.rejected,
      (state: AnalyticsState, action) => {
        state.isFetchingAnalytics = false;
        state.isAnalyticsFetched = false;
        state.analyticsFetchError = action.payload as string;
      }
    );
  },
});

export const { resetFetchAnalyticsState } = analyticsSlice.actions;
export default analyticsSlice.reducer;
