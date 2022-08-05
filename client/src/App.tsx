
import React, { useEffect, useMemo } from 'react';

import { Theme } from '@emotion/react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import { BrowserRouter} from 'react-router-dom';
import { AppRouter } from '@components/Common/AppRouter/AppRouter';
import { Toast } from '@components/Common/Toast/Toast';
import { Header } from '@components/Common/Header/Header';
import {  useCustomTheme } from '@context/Theme/ThemedProvider';
import { AppDispatch } from '@redux/configureStore';
import { useAuth } from '@hooks/useAuth';
import { userThunk } from '@redux/index';
import { useDispatch } from 'react-redux';

import './App.css';


const defaultConfigPalette: Theme = {
  primary: {
    main: '#3f51b5',
  },
  secondary: {
    main: '#d81b60'
  },
}

const App: React.FC = () => {
  const { toggleTheme } = useCustomTheme()
  const { token } = useAuth()
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
     !!token && dispatch(userThunk(token))
  }, [token])


  const theme = useMemo(() => createTheme({
    palette: {
      mode: toggleTheme,
      ...defaultConfigPalette,
    }
  }), [toggleTheme])
  

  // console.log('theme', theme)
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <BrowserRouter>
            <Toast />
            <Header/>
            <Container maxWidth="lg" sx={{
              height: 'calc(100vh - 64px)',
              paddingTop: '100px'
            }}>
                <AppRouter />
            </Container>
         </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
