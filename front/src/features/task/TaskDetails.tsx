import { useAppSelector } from "app/hooks";
import { VFC } from "react";
import { selectSelectedTask } from "features/task/TaskSlice";
import classes from "features/task/TaskDetails.module.scss";

export const TaskDetails: VFC = () => {
  const selectedTask = useAppSelector(selectSelectedTask);

  if (selectedTask.id === 0) {
    return <></>;
  }

  return (
    <div className={classes.details}>
      <h2>{selectedTask.title}</h2>
      <h3>Created at</h3>
      <p>{selectedTask.created_at}</p>
      <h3>Updated at</h3>
      <p>{selectedTask.updated_at}</p>
    </div>
  );
};
