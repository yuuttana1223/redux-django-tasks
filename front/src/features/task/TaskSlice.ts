import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";

const API_URL = "http://localhost:8000/api/tasks";
const token: string | null = localStorage.localJWT;

export type Task = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

type EditedTask = Pick<Task, "id" | "title">;

export const fetchAsyncAllTasks = createAsyncThunk("tasks/get", async () => {
  const res = await axios.get<Task[]>(`${API_URL}`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

export const postAsyncTask = createAsyncThunk(
  "task/post",
  async (task: EditedTask) => {
    const res = await axios.post<Task>(`${API_URL}/`, task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    return res.data;
  }
);

export const patchAsyncTask = createAsyncThunk(
  "task/patch",
  async (task: EditedTask) => {
    const res = await axios.patch<Task>(`${API_URL}/${task.id}/`, task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    return res.data;
  }
);

export const deleteAsyncTask = createAsyncThunk(
  "task/delete",
  async (task: Task) => {
    await axios.delete(`${API_URL}/${task.id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });
    return task;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [
      {
        id: 0,
        title: "",
        created_at: "",
        updated_at: "",
      },
    ],
    editedTask: {
      id: 0,
      title: "",
    },
    selectedTask: {
      id: 0,
      title: "",
      created_at: "",
      updated_at: "",
    },
  },
  reducers: {
    editTask(state, action: PayloadAction<EditedTask>) {
      state.editedTask = action.payload;
    },
    selectTask(state, action: PayloadAction<Task>) {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncAllTasks.fulfilled, (state, action) => ({
      ...state,
      tasks: action.payload,
    }));
    builder.addCase(postAsyncTask.fulfilled, (state, action) => ({
      ...state,
      tasks: [...state.tasks, action.payload],
    }));
    builder.addCase(patchAsyncTask.fulfilled, (state, action) => ({
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      ),
      selectedTask: action.payload,
    }));
    builder.addCase(deleteAsyncTask.fulfilled, (state, action) => ({
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      selectedTask: { id: 0, title: "", created_at: "", updated_at: "" },
    }));
  },
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectSelectedTask = (state: RootState) => state.task.selectedTask;
export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectTasks = (state: RootState) => state.task.tasks;

export const taskReducer = taskSlice.reducer;
