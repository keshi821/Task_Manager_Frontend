import React, { useState } from 'react';
import { Task } from '../types/Task';

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onDelete, onToggle, onEdit }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  const handleSave = (id: number) => {
    if (editTitle.trim()) {
      onEdit(id, editTitle);
    }
    setEditingTaskId(null);
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          {editingTaskId === task.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                autoFocus
                style={{ flex: 1, padding: '4px' }}
                onKeyDown={(e) => e.key === 'Enter' && handleSave(task.id)}
              />
              <button onClick={() => handleSave(task.id)}>💾 Save</button>
              <button onClick={() => setEditingTaskId(null)}>❌ Cancel</button>
            </>
          ) : (
            <>
              <span
                onClick={() => onToggle(task.id, !task.isCompleted)}
                style={{
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  cursor: 'pointer',
                  flex: 1,
                  padding: '4px'
                }}
              >
                {task.title}
              </span>
              <button onClick={() => handleEditClick(task)}>✏️ Edit</button>
              <button onClick={() => onDelete(task.id)}>🗑️ Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
