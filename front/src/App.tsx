import classes from "App.module.scss";
import { Header } from "features/auth/Header";
import { TaskDetails } from "features/task/TaskDetails";
import { TaskInput } from "features/task/TaskInput";
import { TaskList } from "features/task/TaskList";
import { VFC, useCallback } from "react";

import { FaSignInAlt } from "react-icons/fa";

export const App: VFC = () => {
  const logout = useCallback(() => {
    localStorage.removeItem("localJWT");
    window.location.href = "/login";
  }, []);

  return (
    <div className={classes.containerTasks}>
      <div className={classes.appTasks}>
        <button onClick={logout} className={classes.signBtn}>
          <FaSignInAlt />
        </button>
        <Header />
        <TaskInput />
        <TaskList />
      </div>
      <div className={classes.appDetails}>
        <TaskDetails />
      </div>
    </div>
  );
};
