import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Info as InfoIcon, SportsKabaddi as BattleIcon } from '@mui/icons-material';
import '../../styles.css';

const Header = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar className="header-content">
        <Typography variant="h4" className="header-title">
          <Link to="/" className="header-link">
            <IconButton color="inherit" aria-label="home">
              <HomeIcon className="header-icon" />
            </IconButton>
            SuperHero Battle
          </Link>
        </Typography>
        <nav>
          <Link to="/" className="header-link">
            <IconButton color="inherit" aria-label="home">
              <HomeIcon className="header-icon" />
            </IconButton>
            Home
          </Link>
          <Link to="/about" className="header-link">
            <IconButton color="inherit" aria-label="about">
              <InfoIcon className="header-icon" />
            </IconButton>
            About
          </Link>
          <Link to="/battle" className="header-link">
            <IconButton color="inherit" aria-label="battle">
              <BattleIcon className="header-icon" />
            </IconButton>
            Battle
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;






