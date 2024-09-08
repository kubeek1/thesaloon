import React from 'react';
import { createRoot } from 'react-dom/client';

import './views/assets/css/bootstrap.min.css';
import './views/assets/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'rsuite/dist/rsuite.min.css';
import './views/assets/js/jquery.js';

import App from './App.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);