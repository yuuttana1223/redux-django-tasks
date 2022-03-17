import { VFC } from "react";
import {
  fetchAsyncLogin,
  selectIsLoginView,
  setIsLoginView,
  setPassword,
  setUsername,
} from "features/auth/authSlice";
import classes from "features/auth/Auth.module.scss";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { fetchAsyncRegister, selectCredential } from "./authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

export const Auth: VFC = () => {
  const isLoginView = useAppSelector(selectIsLoginView);
  const credential = useAppSelector(selectCredential);
  const dispatch = useAppDispatch();

  const login = useCallback(async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(credential));
    } else {
      const res = await dispatch(fetchAsyncRegister(credential));
      if (fetchAsyncRegister.fulfilled.match(res)) {
        await dispatch(fetchAsyncLogin(credential));
      }
    }
  }, [credential, dispatch, isLoginView]);

  return (
    <div className={classes.containerLogin}>
      <div className={classes.appLogin}>
        <h1>{isLoginView ? "Login" : "Register"}</h1>
        <span>Username</span>
        <input
          type="text"
          name="username"
          placeholder=""
          value={credential.username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
          required
          className={classes.inputLog}
        />
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder=""
          value={credential.password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          required
          className={classes.inputLog}
        />
        <div className={classes.switch}>
          <Button
            onClick={login}
            variant="contained"
            color="primary"
            disabled={!credential.username || !credential.password}
          >
            {isLoginView ? "Login" : "Register"}
          </Button>
        </div>
        <span
          onClick={() => dispatch(setIsLoginView(!isLoginView))}
          className={classes.switchText}
        >
          {isLoginView ? "Create Account" : "Back to Login"}
        </span>
      </div>
    </div>
  );
};
