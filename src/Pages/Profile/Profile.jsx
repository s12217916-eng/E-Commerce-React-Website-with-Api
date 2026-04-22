import { Typography, Box, Stack, Paper, Avatar } from '@mui/material';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import useProfile from '../../Hooks/useProfile';

export default function Profile() {
  const { data } = useProfile();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 5, md: 7 },
        background:
          'linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)',
      }}
    >
      <Box maxWidth="xl" mx="auto" px={2}>
        
        <Typography
          variant="h3"
          textAlign="center"
          mb={5}
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.5px',
          }}
        >
          My Profile
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          
          {/* Sidebar */}
          <Paper
            elevation={0}
            sx={{
              width: { xs: '100%', md: 260 },
              p: 3,
              borderRadius: 5,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              boxShadow: '0 12px 30px rgba(0,0,0,0.05)',
            }}
          >
            <Stack spacing={3} alignItems="center">
              
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'primary.main',
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                {data?.fullName?.charAt(0) || 'U'}
              </Avatar>

              <Typography
                sx={{
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {data?.fullName || 'User Name'}
              </Typography>

              <Stack spacing={1} width="100%">
                
                <Link
                  to="Info"
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: 1.5,
                      borderRadius: 3,
                      fontWeight: 600,
                      color: isActive('Info') ? 'primary.main' : 'text.primary',
                      backgroundColor: isActive('Info')
                        ? 'rgba(25,118,210,0.08)'
                        : 'transparent',
                      transition: '0.2s',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.05)',
                      },
                    }}
                  >
                    <PersonOutlineRoundedIcon fontSize="small" />
                    Info
                  </Box>
                </Link>

                <Link
                  to="orders"
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: 1.5,
                      borderRadius: 3,
                      fontWeight: 600,
                      color: isActive('orders') ? 'primary.main' : 'text.primary',
                      backgroundColor: isActive('orders')
                        ? 'rgba(25,118,210,0.08)'
                        : 'transparent',
                      transition: '0.2s',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.05)',
                      },
                    }}
                  >
                    <ListAltRoundedIcon fontSize="small" />
                    Orders
                  </Box>
                </Link>
              </Stack>
            </Stack>
          </Paper>

          {/* Content Area */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: { xs: 2, md: 4 },
              borderRadius: 5,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              boxShadow: '0 12px 30px rgba(0,0,0,0.05)',
            }}
          >
            <Outlet />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}