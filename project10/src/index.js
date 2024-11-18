import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Counter from './components/Counter';
import DataList from './components/DataList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <div>
      <Counter/>
      <DataList/>
    </div>
  </Provider>
);
