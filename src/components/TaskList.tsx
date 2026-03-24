import React from 'react';
import { Task } from '../types/Task';

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onDelete, onToggle }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            onClick={() => onToggle(task.id, !task.isCompleted)}
            style={{
              textDecoration: task.isCompleted ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            {task.title}
          </span>

          <button onClick={() => onDelete(task.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
