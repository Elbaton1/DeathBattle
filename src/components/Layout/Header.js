import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../HeroVsVillain.css'; // Ensure this path is correct based on your project structure

const Header = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" className="header-title">
          <Link to="/" className="header-link"><center>DEATH BATTLE AI</center></Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;





