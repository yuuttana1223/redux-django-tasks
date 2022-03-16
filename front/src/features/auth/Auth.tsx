import { useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncLogin,
  selectIsLoginView,
  setIsLoginView,
} from "features/auth/authSlice";
import classes from "features/auth/Auth.module.scss";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { fetchAsyncRegister } from "./authSlice";

export const Auth: VFC = () => {
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });
  console.log("🚀 ~ file: Auth.tsx ~ line 15 ~ credential", credential);
  const isLoginView = useSelector(selectIsLoginView);
  const dispatch = useDispatch();

  const login = useCallback(async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(credential));
    } else {
      const res = await dispatch(fetchAsyncRegister(credential));
      // 型が分からなかったのでanyにしている
      if (fetchAsyncRegister.fulfilled.match(res as any)) {
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
          onChange={(e) =>
            setCredential((prevCredential) => ({
              ...prevCredential,
              username: e.target.value,
            }))
          }
          required
          className={classes.inputLog}
        />
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder=""
          value={credential.password}
          onChange={(e) =>
            setCredential((prevCredential) => ({
              ...prevCredential,
              password: e.target.value,
            }))
          }
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
