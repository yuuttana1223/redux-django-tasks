import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";

const API_URL = "http://localhost:8000";
const token: string | null = localStorage.localJWT; // localJWTは任意の名前

type Credential = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
};

type AuthState = {
  isLoginView: boolean;
  currentUser: User;
  credential: Credential;
};

const initialState: AuthState = {
  isLoginView: true,
  currentUser: {
    id: 0,
    username: "",
  },
  credential: {
    username: "",
    password: "",
  },
};

export const fetchAsyncLogin = createAsyncThunk(
  "auth/login",
  async (auth: Credential) => {
    const res = await axios.post<JWT>(`${API_URL}/authen/jwt/create`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth: Credential) => {
    const res = await axios.post<User>(`${API_URL}/api/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  }
);

export const fetchAsyncCurrentUser = createAsyncThunk(
  "auth/currentUser",
  async () => {
    const res = await axios.get<User>(`${API_URL}/api/myself`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    return res.data;
  }
);

type JWT = {
  access: string;
  refresh: string;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoginView: (state, action: PayloadAction<boolean>) => {
      state.isLoginView = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.credential.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.credential.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (_state, action: PayloadAction<JWT>) => {
        localStorage.setItem("localJWT", action.payload.access);
        action.payload.access && (window.location.href = "/");
      }
    );
    builder.addCase(
      fetchAsyncCurrentUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        console.log("🚀 ~ file: authSlice.ts ~ line 103 ~ action", action);
        state.currentUser = action.payload;
      }
    );
  },
});

export const { setIsLoginView, setUsername, setPassword } = authSlice.actions;
export const selectIsLoginView = (state: RootState) => state.login.isLoginView;
export const selectCurrentUser = (state: RootState) => state.login.currentUser;
export const selectCredential = (state: RootState) => state.login.credential;

export default authSlice.reducer;
