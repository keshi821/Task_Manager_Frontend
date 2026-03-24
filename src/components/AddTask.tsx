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
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTask;
