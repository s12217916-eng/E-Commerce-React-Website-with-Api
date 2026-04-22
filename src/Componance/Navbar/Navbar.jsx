import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link, Badge, Button, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useCart from '../../Hooks/useCart';
import useThemeStore from '../../useThemeStore';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18next';

export default function Navbar() {
  const { t } = useTranslation();

  const changeLanguage = () => {
    const newLng = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLng);
  };

  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);
  const { data } = useCart();

  const cardcount = data?.items?.length || 0;

  const handelLogOut = () => {
    logout();
    navigate('/login');
  };

  const navLinkStyle = {
    position: 'relative',
    fontSize: '15px',
    fontWeight: 500,
    color: 'text.primary',
    textDecoration: 'none',
    transition: '0.3s ease',
    '&:hover': {
      color: 'primary.main',
    },
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="default"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 80,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'inherit',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '14px',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '18px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              }}
            >
              M
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '0.5px',
                }}
              >
                modimal
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: '11px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                E-Commerce
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 3,
              px: 3,
              py: 1.2,
              borderRadius: '999px',
              bgcolor: mode === 'light' ? 'grey.100' : 'rgba(255,255,255,0.06)',
            }}
          >
            <Link component={RouterLink} to="/" underline="none" sx={navLinkStyle}>
              {t('Home')}
            </Link>

            <Link component={RouterLink} to="/categories" underline="none" sx={navLinkStyle}>
              {t('Categories')}
            </Link>

            {token ? (
              <>
                <Badge badgeContent={cardcount} color="secondary">
                  <Link
                    component={RouterLink}
                    to="/cart"
                    underline="none"
                    sx={{
                      ...navLinkStyle,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.7,
                    }}
                  >
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 19 }} />
                    {t('Cart')}
                  </Link>
                </Badge>

                <Link
                  component={RouterLink}
                  to="/profile"
                  underline="none"
                  sx={{
                    ...navLinkStyle,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.7,
                  }}
                >
                  <PersonOutlineOutlinedIcon sx={{ fontSize: 19 }} />
                  {t('Profile')}
                </Link>

                <Box
                  onClick={handelLogOut}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.7,
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'text.primary',
                    transition: '0.3s',
                    '&:hover': {
                      color: 'error.main',
                    },
                  }}
                >
                  <LogoutRoundedIcon sx={{ fontSize: 18 }} />
                  {t('Logout')}
                </Box>
              </>
            ) : (
              <>
                <Link component={RouterLink} to="/login" underline="none" sx={navLinkStyle}>
                  {t('Login')}
                </Link>
                <Link component={RouterLink} to="/register" underline="none" sx={navLinkStyle}>
                  {t('Register')}
                </Link>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Button
              onClick={toggleTheme}
              color="inherit"
              variant="outlined"
              sx={{
                borderRadius: '999px',
                px: 2,
                minWidth: 'unset',
                textTransform: 'none',
                borderColor: 'divider',
                display: { xs: 'none', sm: 'flex' },
                gap: 1,
              }}
            >
              {mode === 'light' ? (
                <DarkModeRoundedIcon sx={{ fontSize: 18 }} />
              ) : (
                <LightModeRoundedIcon sx={{ fontSize: 18 }} />
              )}
              {mode === 'light' ? 'Dark' : 'Light'} {t('Mode')}
            </Button>

            <Button
              onClick={changeLanguage}
              color="inherit"
              variant="contained"
              sx={{
                borderRadius: '999px',
                px: 2,
                textTransform: 'none',
                boxShadow: 'none',
                display: { xs: 'none', sm: 'flex' },
                gap: 1,
              }}
            >
              <TranslateRoundedIcon sx={{ fontSize: 18 }} />
              {t('Change Language')}
            </Button>

            <IconButton
              color="inherit"
              sx={{
                display: { xs: 'flex', md: 'none' },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}