import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3002', // your NestJS backend
});

// Intercept requests and add the 'Authorization' header when a JWT acts token is present.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth endpoints
export const login = (data: any) => API.post('/auth/login', data);
export const register = (data: any) => API.post('/auth/register', data);

// Task endpoints
export const getTasks = () => API.get('/v1/task');
export const addTask = (task: { title: string }) => API.post('/v1/task', task);
export const updateTask = (id: string, data: any) =>
  API.patch(`/v1/task/${id}`, data);
export const deleteTask = (id: string, reason: string) => API.delete(`/v1/task/${id}`, { data: { deleteReason: reason } });
