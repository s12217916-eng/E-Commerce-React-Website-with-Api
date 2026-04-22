import React from 'react';
import Box from '@mui/material/Box';
import useCategories from '../../Hooks/useCategories';
import Loader from '../../ui/Loader/Loader';
import { Typography, Grid, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Category from '../../ui/Category/Category';

export default function CategoriesPage() {
  const { data, isLoading, isError, error } = useCategories(100);

  if (isLoading) return <Loader />;
  if (isError) return <Box color="red">{error.message}</Box>;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 5, md: 8 },
        background:
          'linear-gradient(180deg, rgba(245,247,250,1) 0%, rgba(255,255,255,1) 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={1.5} mb={5}>
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.5px',
              fontSize: { xs: '2rem', md: '2.8rem' },
            }}
          >
            Categories
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              lineHeight: 1.8,
            }}
          >
            Explore all product categories and discover the collection that fits
            your style, needs, and daily lifestyle.
          </Typography>
        </Stack>

        <Box
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 5,
            backgroundColor: 'background.paper',
            boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Grid container spacing={3}>
            {data?.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                <Link
                  to={`/products?categoryId=${category.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                  }}
                >
                  <Box
                    sx={{
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      borderRadius: 4,
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 14px 30px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <Category category={category} />
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}