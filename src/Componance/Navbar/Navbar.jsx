import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>

           <Typography variant="h6">
    modimal
  </Typography>

          <Box  sx={{
      display: "flex", gap: 3, margin: "0 auto"}}>
            <Link component={RouterLink} to="/" underline="none" color="inherit">Collection</Link>
            <Link component={RouterLink} to="/" underline="none" color="inherit">New In</Link>
            <Link component={RouterLink} to="/" underline="none" color="inherit">Modiweek</Link>
            <Link component={RouterLink} to="/" underline="none" color="inherit">Plus Size</Link>
            <Link component={RouterLink} to="/" underline="none" color="inherit">Sustainability</Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}