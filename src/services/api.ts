import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // your NestJS backend
});

export const getTasks = () => API.get('/task');
export const addTask = (task: { title: string }) => API.post('/task', task);
export const updateTask = (id: number, data: any) =>
  API.patch(`/task/${id}`, data);
export const deleteTask = (id: number) => API.delete(`/task/${id}`);
