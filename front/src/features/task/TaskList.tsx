import { VFC } from "react";
import classes from "features/task/TaskList.module.scss";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectTasks } from "features/task/TaskSlice";
import { useEffect } from "react";
import { fetchAsyncAllTasks } from "./TaskSlice";
import { fetchAsyncCurrentUser } from "features/auth/authSlice";
import { TaskItem } from "./TaskItem";

export const TaskList: VFC = () => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAsyncAllTasks());
      await dispatch(fetchAsyncCurrentUser());
    };
    fetchData();
  }, [dispatch]);

  return (
    <ul className={classes.taskList}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
