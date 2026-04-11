import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useCart from '../../Hooks/useCart';
import { Badge } from '@mui/material';
import { Button } from '@mui/material';
import useThemeStore from '../../useThemeStore';

export default function Navbar() {
  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const navigate = useNavigate();
  const logout = useAuthStore((state)=>state.logout);
  const token = useAuthStore((state)=>state.token);
const {data} = useCart();
const cardcount = data?.items?.length || 0 ;
console.log("cardcount", cardcount)
  const handelLogOut = ()=>{
    logout();
    navigate('/login');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">        
        <Toolbar>
          <Typography variant="h6">
            modimal
          </Typography>
          <Button onClick={toggleTheme} color='inherit'>
            {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
          <Box sx={{
            display: "flex",
            gap: 3,
            margin: "0 auto",
            display:{xs:'none',sm:'flex'}
          }}>
            <Link component={RouterLink} to="/" underline="none" color="inherit">Home</Link>
            <Link component={RouterLink} to="/categories" underline="none" color="inherit">Categories</Link>
            {token ? (
              <>
              <Badge badgeContent={cardcount} color="secondary">
                 <Link component={RouterLink} to="/cart" underline="none" color="inherit">Cart</Link>
                 </Badge>
                  <Badge badgeContent={cardcount} color="secondary">
                 <Link component={RouterLink} to="/profile" underline="none" color="inherit">Profile</Link>
                 </Badge>
                <Typography onClick={handelLogOut} sx={{cursor:"pointer"}}>
                  Logout
                </Typography>
              </>
            ) : (
              <>
                <Link component={RouterLink} to="/login" underline="none" color="inherit">Login</Link>
                <Link component={RouterLink} to="/register" underline="none" color="inherit">Register</Link>
              </>
            )}
          </Box>
          <IconButton color="inherit" sx={{display:{xs:'flex' , sm:'none'}}}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}