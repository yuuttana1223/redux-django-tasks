import { useAppDispatch, useAppSelector } from "app/hooks";
import { VFC, useCallback, ChangeEvent } from "react";
import {
  editTask,
  patchAsyncTask,
  postAsyncTask,
  selectEditedTask,
} from "features/task/TaskSlice";
import classes from "features/task/TaskInput.module.scss";
import { Button } from "@mui/material";

export const TaskInput: VFC = () => {
  const dispatch = useAppDispatch();
  const editedTask = useAppSelector(selectEditedTask);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      editedTask.id === 0
        ? dispatch(editTask({ id: 0, title: e.target.value }))
        : dispatch(editTask({ id: editedTask.id, title: e.target.value }));
    },
    [dispatch, editedTask]
  );

  const handleClick = useCallback(() => {
    if (editedTask.id === 0) {
      dispatch(postAsyncTask(editedTask));
    } else {
      dispatch(patchAsyncTask(editedTask));
    }
    dispatch(editTask({ id: 0, title: "" }));
  }, [dispatch, editedTask]);

  return (
    <div>
      <input
        type="text"
        value={editedTask.title}
        onChange={handleChange}
        placeholder="Please input task"
        className={classes.taskInput}
      />

      <div className={classes.switch}>
        <Button
          onClick={handleClick}
          variant="contained"
          disabled={!editedTask.title}
          color="primary"
        >
          {editedTask.id ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  );
};
