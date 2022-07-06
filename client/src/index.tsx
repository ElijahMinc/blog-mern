import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';

const root = document.getElementById('root');

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>

 ,
  root
);