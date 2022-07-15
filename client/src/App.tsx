
import { Theme } from '@emotion/react';
import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import React, { useMemo, useState } from 'react';
import { BrowserRouter} from 'react-router-dom';

import './App.css';
import { AppRouter } from './components/Common/AppRouter/AppRouter';
import { Toast } from './components/Common/Toast/Toast';
import { Header } from './components/Common/Header/Header';
import { ThemeCustomProvider, useCustomTheme } from './context/Theme/ThemedProvider';



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


  const theme = useMemo(() => createTheme({
    palette: {
      mode: toggleTheme,
      ...defaultConfigPalette,
    }
  }), [toggleTheme])

  console.log('theme', theme)
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <BrowserRouter>
            <Toast />
            <Header/>
            <Container maxWidth="lg" sx={{
              height: 'calc(100vh - 64px)',
              padding: '50px 0'
            }}>
                <AppRouter />
            </Container>
         </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
