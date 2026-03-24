import React, { useEffect, useState } from 'react';
import { Task } from './types/Task';
import { getTasks, addTask, deleteTask, updateTask } from './services/api';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks
  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const handleAdd = async (title: string) => {
    await addTask({ title });
    fetchTasks();
  };

  // Delete task
  const handleDelete = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  // Toggle complete
  const handleToggle = async (id: number, completed: boolean) => {
    await updateTask(id, { isCompleted: completed });
    fetchTasks();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>

      <AddTask onAdd={handleAdd} />
      <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}

export default App;
