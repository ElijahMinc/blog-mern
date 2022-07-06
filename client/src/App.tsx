
import { Container } from '@mui/system';
import React from 'react';
import { BrowserRouter} from 'react-router-dom';

import './App.css';
import { AppRouter } from './components/AppRouter/AppRouter';
import { Header } from './components/Header/Header';



const App: React.FC = () => {


  return (
    <BrowserRouter>
      <Header/>
      <Container maxWidth="lg" sx={{
        height: '100%',
        padding: '50px 0'
      }}>
          <AppRouter />
      </Container>
    </BrowserRouter>
  );
}

export default App;
