import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../types/Task';
import { getTasks, addTask, deleteTask, updateTask } from '../services/api';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import { LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [navigate]);

  const handleAdd = async (title: string) => {
    await addTask({ title });
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    const reason = window.prompt("Why are you deleting this task?");
    if (reason === null) return;
    await deleteTask(id, reason);
    fetchTasks();
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await updateTask(id, { isCompleted: completed });
    fetchTasks();
  };

  const handleEdit = async (id: string, newTitle: string) => {
    await updateTask(id, { title: newTitle });
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 className="auth-title" style={{ margin: 0 }}>Task Manager</h1>
        <button onClick={handleLogout} className="primary-btn" style={{ width: 'auto', padding: '8px 16px', background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <div className="auth-card" style={{ maxWidth: '100%', padding: '30px' }}>
        <AddTask onAdd={handleAdd} />
        <TaskList 
          tasks={tasks} 
          onDelete={handleDelete} 
          onToggle={handleToggle} 
          onEdit={handleEdit} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
