import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProjectApi, fetchProjectsApi } from "../../api";

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async() => {
    const response = await fetchProjectsApi();
    return response.data;
  }
);

export const addProject = createAsyncThunk(
  'projects/addProject',
  async(project) => {
    const response = await addProjectApi(project);
    console.log("addProject ", response.data);
    return response.data;
  }
)

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [], 
    loading: false
  },
  
  extraReducers: (builder) =>{
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.list = action.payload
      })

      .addCase(addProject.fulfilled, (state, action) => {
        console.log('action.payload fulfilled', action.payload)
        state.list.push(action.payload)
      });
  }
});

export default projectSlice.reducer;