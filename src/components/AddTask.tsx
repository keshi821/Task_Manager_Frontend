import React, { useState } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

const AddTask: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '30px' }}>
      <input
        value={title}
        className="input-field"
        style={{ marginBottom: 0 }}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task..."
      />
      <button type="submit" className="primary-btn" style={{ width: 'auto', padding: '12px 24px' }}>Add Task</button>
    </form>
  );
};

export default AddTask;
