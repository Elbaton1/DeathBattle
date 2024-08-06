import React from 'react';
import { Box, Typography } from '@mui/material';
import '../../styles.css'; // Ensure this path is correct based on your project structure

const Footer = () => {
  return (
    <Box className="footer">
      <Typography variant="body2" color="inherit">
        &copy; {new Date().getFullYear()} DEATH BATTLE AI. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;





