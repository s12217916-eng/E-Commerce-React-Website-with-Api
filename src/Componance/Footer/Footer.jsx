import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Link as MuiLink,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        pt: 6,
        pb: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        background:
          'linear-gradient(180deg, rgba(250,250,252,1) 0%, rgba(255,255,255,1) 100%)',
      }}
    >
      <Container maxWidth="xl">

        {/* Top Section */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: 'center', md: 'flex-start' }}
          mb={4}
        >
          {/* Brand */}
          <Box textAlign={{ xs: 'center', md: 'left' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                letterSpacing: '1px',
              }}
            >
              modimal
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: 1,
                maxWidth: 280,
              }}
            >
              Premium shopping experience with modern design and carefully selected products.
            </Typography>
          </Box>

          {/* Links */}
          <Stack
            direction="row"
            spacing={4}
            flexWrap="wrap"
            justifyContent="center"
          >
            {[
              { label: 'Home', to: '/' },
              { label: 'Categories', to: '/categories' },
              { label: 'Products', to: '/products' },
              { label: 'Cart', to: '/cart' },
            ].map((link) => (
              <MuiLink
                key={link.label}
                component={RouterLink}
                to={link.to}
                underline="none"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  position: 'relative',
                  transition: '0.3s',
                  '&:hover': {
                    color: 'primary.main',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: -4,
                    left: 0,
                    backgroundColor: 'primary.main',
                    transition: '0.3s',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {link.label}
              </MuiLink>
            ))}
          </Stack>

          {/* Social */}
          <Stack direction="row" spacing={1}>
            <IconButton
              sx={{
                borderRadius: 3,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: '#fff',
                },
              }}
            >
              <FacebookRoundedIcon />
            </IconButton>

            <IconButton
              sx={{
                borderRadius: 3,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: '#fff',
                },
              }}
            >
              <InstagramIcon />
            </IconButton>

            <IconButton
              sx={{
                borderRadius: 3,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: '#fff',
                },
              }}
            >
              <TwitterIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Bottom */}
        <Box
          sx={{
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.3px',
            }}
          >
            © {new Date().getFullYear()} modimal — All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}