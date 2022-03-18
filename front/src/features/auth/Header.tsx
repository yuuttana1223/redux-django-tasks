import { VFC } from "react";
import classes from "features/auth/Header.module.scss";
import { useAppSelector } from "app/hooks";
import { selectCurrentUser } from "features/auth/authSlice";

export const Header: VFC = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div className={classes.header}>
      <h3>{currentUser.username}</h3>
      <h1>Today's task</h1>
    </div>
  );
};
