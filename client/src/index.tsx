import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '@redux/configureStore';
import { ThemeCustomProvider } from '@context/Theme/ThemedProvider';

import App from './App';

import './index.css';

const root = document.getElementById('root');



ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <ThemeCustomProvider>
          <App />
         </ThemeCustomProvider>
      </Provider>
  </React.StrictMode>,
  root
);