import React, { useState } from 'react';
import './AddWidgetForm.css';

const AddWidgetForm = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && content) {
      onAdd({ name, content });
      setName('');
      setContent('');
    }
  };

  return (
    <div className="add-widget-form-overlay">
      <div className="add-widget-form">
        <h3>Add New Widget</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Widget Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Widget Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <div className="form-buttons">
            <button type="submit">Add Widget</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWidgetForm;