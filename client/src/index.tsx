import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';
import { ThemeCustomProvider } from './context/Theme/ThemedProvider';

const root = document.getElementById('root');



ReactDOM.render(
  <React.StrictMode>

      <Provider store={store}>
        <ThemeCustomProvider>
          <App />
         </ThemeCustomProvider>
      </Provider>
   
  </React.StrictMode>
 ,
  root
);