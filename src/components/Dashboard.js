// src/components/Dashboard.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../store/dashboardSlice';
import AddWidgetForm from './AddWidgetForm';
import './Dashboard.css';

const Dashboard = () => {
  const categories = useSelector(state => state.dashboard.categories);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [addingWidget, setAddingWidget] = useState(null);

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

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget => 
      widget.name.toLowerCase().includes(search.toLowerCase()) ||
      widget.content.toLowerCase().includes(search.toLowerCase())
    ),
  }));

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
          <h2>{category.name}</h2>
          <button className="add-widget-btn" onClick={() => handleAddWidget(category.name)}>+ Add Widget</button>
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
    </div>
  );
};

export default Dashboard;