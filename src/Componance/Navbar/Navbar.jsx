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

export default function Navbar() {

  const navigate = useNavigate();
  const logout = useAuthStore((state)=>state.logout);
  const token = useAuthStore((state)=>state.token);

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
                <Link component={RouterLink} to="/cart" underline="none" color="inherit">Cart</Link>

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