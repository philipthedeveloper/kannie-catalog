import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postAdminLogin, postAdminLogout, setAuthorization } from "@/api";
import { LoginUserResponse, LoginData, LogoutUserResponse } from "./interface";

export interface LoginState {
  isLoggedIn: boolean;
  isLoginReqLoading: boolean;
  loginError: string;
  message: string;
  isLoggingOut: boolean;
  isLoggedOut: boolean;
  logoutError: string;
}

const INIT_STATE: LoginState = {
  isLoggedIn: false,
  isLoginReqLoading: false,
  loginError: "",
  message: "",
  isLoggingOut: false,
  isLoggedOut: false,
  logoutError: "",
};

// Login request thunk
export const loginUser = createAsyncThunk(
  "@@auth/loginUser",
  async (data: LoginData, thunkAPI) => {
    try {
      const response = (await postAdminLogin(
        data
      )) as unknown as LoginUserResponse;
      if (response.success === true) {
        setAuthorization(response.token);
        sessionStorage.setItem("authUser", JSON.stringify(response));
        sessionStorage.setItem("accessToken", response.token);
      }
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "@@auth/logoutUser",
  async (data: void, thunkAPI) => {
    try {
      const response =
        (await postAdminLogout()) as unknown as LogoutUserResponse;
      if (response.success) {
        sessionStorage.removeItem("authUser");
        sessionStorage.removeItem("accessToken");
      }
      return "done";
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: "Login",
  initialState: INIT_STATE,
  reducers: {
    resetLoginState: (state: LoginState) => {
      state.isLoginReqLoading = false;
      state.isLoggedIn = false;
      state.loginError = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state: LoginState, action) => {
      state.isLoginReqLoading = true;
      state.isLoggedIn = false;
      state.loginError = "";
      state.message = "";
    });

    builder.addCase(loginUser.fulfilled, (state: LoginState, action) => {
      state.isLoginReqLoading = false;
      state.isLoggedIn = true;
      state.message = action.payload as string;
      state.loginError = "";
    });

    builder.addCase(loginUser.rejected, (state: LoginState, action) => {
      state.isLoginReqLoading = false;
      state.isLoggedIn = false;
      state.message = "";
      state.loginError = action.payload as string;
    });

    builder.addCase(logoutUser.pending, (state: LoginState) => {
      state.isLoggingOut = true;
      state.isLoggedOut = false;
      state.logoutError = "";
    });

    builder.addCase(logoutUser.fulfilled, (state: LoginState) => {
      state.isLoggedIn = false;
      state.isLoginReqLoading = false;
      state.isLoggingOut = false;
      state.isLoggedOut = true;
    });

    builder.addCase(logoutUser.rejected, (state: LoginState, action) => {
      state.isLoggedOut = false;
      state.isLoggingOut = false;
      state.logoutError = action.payload as string;
    });
  },
});

export const { resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
