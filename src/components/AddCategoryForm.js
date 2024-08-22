import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../store/dashboardSlice';

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      dispatch(addCategory(categoryName.trim()));
      setCategoryName('');
    }
  };

  return (
    <div className="add-category-form">
      <h3>Add New Category</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategoryForm;