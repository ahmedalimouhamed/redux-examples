import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTaskApi, fetchTasksApi, updateTaskApi } from "../../api";

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async() => {
    const response = await fetchTasksApi();
    return response.data;
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async(task) => {
    const response = await addTaskApi(task);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async(task) => {
    const response = await updateTaskApi(task);
    return response.data;
  }
);

const taskSlice = createSlice({
  name: 'tasks',

  initialState: {
    list: [], 
    loading: false
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.list.findIndex((task) => task.id === action.payload.id);
        if(index !== -1) state.list[index] = action.payload;
      })
  }
});

export default taskSlice.reducer;