// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './store/dashboardSlice';
import Dashboard from './components/Dashboard';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;