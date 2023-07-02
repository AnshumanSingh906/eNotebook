import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { NoteContext } from './context/Notestate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <App/>
  </React.StrictMode>
);

