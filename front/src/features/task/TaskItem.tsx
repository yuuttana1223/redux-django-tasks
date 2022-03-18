import { VFC } from "react";
import {
  deleteAsyncTask,
  editTask,
  selectTask,
  Task,
} from "features/task/TaskSlice";
import classes from "features/task/TaskItem.module.scss";

import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch } from "app/hooks";

type Props = {
  task: Task;
};

export const TaskItem: VFC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();

  return (
    <li className={classes.listItem}>
      <span
        onClick={() => dispatch(selectTask(task))}
        className={classes.cursor}
      >
        {task.title}
      </span>
      <div>
        <button
          onClick={() => dispatch(deleteAsyncTask(task))}
          className={classes.taskIcon}
        >
          <BsTrash />
        </button>
        <button
          onClick={() => dispatch(editTask({ id: task.id, title: task.title }))}
          className={classes.taskIcon}
        >
          <FaEdit />
        </button>
      </div>
    </li>
  );
};
