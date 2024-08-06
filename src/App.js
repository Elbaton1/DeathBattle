import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HeroVsVillain from './components/HeroVsVillain';
import Home from './components/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2193b0',
    },
    secondary: {
      main: '#6dd5ed',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<HeroVsVillain />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;









