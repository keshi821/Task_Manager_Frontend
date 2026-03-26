import React, { useState } from 'react';
import { Task } from '../types/Task';

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onDelete, onToggle, onEdit }) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  const handleSave = (id: string) => {
    if (editTitle.trim()) {
      onEdit(id, editTitle);
    }
    setEditingTaskId(null);
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
      {tasks.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No tasks yet! Add one above.</p>
      )}
      {tasks.map((task) => (
        <li 
          key={task.id} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: '12px',
            background: 'rgba(15, 23, 42, 0.4)',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            transition: 'transform 0.2s',
          }}
        >
          {editingTaskId === task.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                autoFocus
                className="input-field"
                style={{ flex: 1, padding: '8px' }}
                onKeyDown={(e) => e.key === 'Enter' && handleSave(task.id)}
              />
              <button className="primary-btn" style={{ width: 'auto', padding: '8px 16px' }} onClick={() => handleSave(task.id)}>Save</button>
              <button className="primary-btn" style={{ width: 'auto', padding: '8px 16px', background: 'transparent', border: '1px solid var(--border)' }} onClick={() => setEditingTaskId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <input 
                type="checkbox" 
                checked={task.isCompleted} 
                onChange={(e) => onToggle(task.id, e.target.checked)} 
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <span
                onClick={() => onToggle(task.id, !task.isCompleted)}
                style={{
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  color: task.isCompleted ? 'var(--text-muted)' : 'var(--text-main)',
                  cursor: 'pointer',
                  flex: 1,
                  fontSize: '16px',
                  fontWeight: 500,
                  transition: 'color 0.2s'
                }}
              >
                {task.title}
              </span>
              <button 
                className="primary-btn" 
                style={{ width: 'auto', padding: '6px 12px', background: 'rgba(79, 70, 229, 0.2)', color: '#818CF8' }} 
                onClick={() => handleEditClick(task)}
              >
                Edit
              </button>
              <button 
                className="primary-btn" 
                style={{ width: 'auto', padding: '6px 12px', background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444' }} 
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
