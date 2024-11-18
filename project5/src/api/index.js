import axios from "axios";

const api = axios.create({baseURL: 'http://localhost:5000'});

export const fetchUserApi = async(credentials) => {
  const response = await api.get('/users', {
    params: {username: credentials.username, password: credentials.password}
  });

  return response.data[0] || null
}

export const fetchProjectsApi = () => api.get('/projects');
export const addProjectApi = (project) => api.post('/projects', project);
export const updateProjectApi = (project) => api.put(`projects/${project.id}`, project);

export const fetchTasksApi = () => api.get('/tasks');
export const addTaskApi = (task) => api.post('/tasks', task);
export const updateTaskApi = (task) => api.put(`/tasks/${task.id}`, task);