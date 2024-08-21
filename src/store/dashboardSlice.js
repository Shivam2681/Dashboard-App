import { createSlice } from '@reduxjs/toolkit';
import { initialData } from '../data/initialData';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('dashboardState');
    if (serializedState === null) {
      return initialData;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialData;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dashboardState', serializedState);
  } catch {
    // Ignore write errors
  }
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: loadState(),
  reducers: {
    addWidget: (state, action) => {
      const { categoryName, widget } = action.payload;
      const category = state.categories.find(c => c.name === categoryName);
      if (category) {
        category.widgets.push({ ...widget, id: Date.now() });
      }
      saveState(state);
    },
    removeWidget: (state, action) => {
      const { categoryName, widgetId } = action.payload;
      const category = state.categories.find(c => c.name === categoryName);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
      saveState(state);
    },
  },
});

export const { addWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;