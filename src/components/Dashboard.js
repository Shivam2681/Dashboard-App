import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget, removeWidgetFromCategory, addCategory, removeCategory } from '../store/dashboardSlice';
import AddWidgetForm from './AddWidgetForm';
import AddCategoryForm from './AddCategoryForm';
import './Dashboard.css';

const Dashboard = () => {
  const categories = useSelector(state => state.dashboard.categories);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [addingWidget, setAddingWidget] = useState(null);

  useEffect(() => {
    const filtered = categories.map(category => ({
      ...category,
      widgets: category.widgets.filter(widget =>
        widget.name.toLowerCase().includes(search.toLowerCase()) ||
        widget.content.toLowerCase().includes(search.toLowerCase())
      ),
    })).filter(category => category.widgets.length > 0 || search === '');
    setFilteredCategories(filtered);
  }, [categories, search]);

  const handleAddWidget = (categoryName) => {
    setAddingWidget(categoryName);
  };

  const handleAddWidgetSubmit = (widget) => {
    dispatch(addWidget({ categoryName: addingWidget, widget }));
    setAddingWidget(null);
  };

  const handleRemoveWidget = (categoryName, widgetId) => {
    dispatch(removeWidget({ categoryName, widgetId }));
  };

  const handleAddCategory = (categoryName) => {
    dispatch(addCategory(categoryName));
  };

  const handleRemoveCategory = (categoryName) => {
    dispatch(removeCategory(categoryName));
  };

  return (
    <div className="dashboard">
    <h1>Dashboard</h1>
    <input
      type="text"
      className="search-bar"
      placeholder="Search widgets"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    {filteredCategories.map(category => (
      <div key={category.name} className="category">
        <div className="category-header">
          <h2 className="category-title">{category.name}</h2>
          <div className="category-buttons">
            <button className="add-widget-btn" onClick={() => handleAddWidget(category.name)}>Add Widget</button>
            <button className="remove-category-btn" onClick={() => handleRemoveCategory(category.name)}>Remove Category</button>
          </div>
        </div>
        <div className="widget-grid">
          {category.widgets.map(widget => (
            <div key={widget.id} className="widget">
              <h3>{widget.name}</h3>
              <p>{widget.content}</p>
              <button className="remove-widget-btn" onClick={() => handleRemoveWidget(category.name, widget.id)}>X</button>
            </div>
          ))}
        </div>
      </div>
      ))}
      {addingWidget && (
        <AddWidgetForm
          onAdd={handleAddWidgetSubmit}
          onCancel={() => setAddingWidget(null)}
        />
      )}
      <AddCategoryForm onAdd={handleAddCategory} />
    </div>
  );
};

export default Dashboard;
