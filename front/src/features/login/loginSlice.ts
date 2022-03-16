import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";

const API_URL = "http://localhost:8000";
const token = localStorage.localJWT; // localJWTは任意の名前

type AuthState = {
  username: string;
  password: string;
};

type CurrentUserState = {
  id: number;
  username: string;
};

type LoginState = {
  auth: AuthState;
  isLoggedIn: boolean;
  currentUser: CurrentUserState;
};

const initialState: LoginState = {
  auth: {
    username: "",
    password: "",
  },
  isLoggedIn: true,
  currentUser: {
    id: 0,
    username: "",
  },
};

export const fetchAsyncLogin = createAsyncThunk("login/post", async (auth) => {
  console.log("🚀 ~ file: loginSlice.ts ~ line 39 ~ auth", auth);
  const res = await axios.post(`${API_URL}/authen/jwt/create`, auth, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
});

export const fetchAsyncRegister = createAsyncThunk(
  "register/post",
  async (auth) => {
    console.log("🚀 ~ file: loginSlice.ts ~ line 52 ~ auth", auth);
    const res = await axios.post(`${API_URL}/api/register`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncCurrentUser = createAsyncThunk(
  "auth/get",
  async (auth: AuthState) => {
    console.log("🚀 ~ file: loginSlice.ts ~ line 65 ~ auth", auth);
    const res = await axios.get(`${API_URL}/api/myself`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    return res.data;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.auth.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.auth.password = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.token);
      action.payload.access && (window.location.href = "/");
    });
    builder.addCase(
      fetchAsyncCurrentUser.fulfilled,
      (state, action: PayloadAction<CurrentUserState>) => {
        state.currentUser = action.payload;
      }
    );
  },
});

export const { setUsername, setPassword, setIsLoggedIn } = loginSlice.actions;
export const selectAuth = (state: RootState) => state.login.auth;
export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const selectCurrentUser = (state: RootState) => state.login.currentUser;

export default loginSlice.reducer;
