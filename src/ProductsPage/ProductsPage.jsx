import React, { useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Container,
  Stack,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Chip,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useSearchParams, Link } from 'react-router-dom';
import useProducts from '../Hooks/useProducts';
import Loader from '../ui/Loader/Loader';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get('categoryId') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  const { data, isLoading, isError, error } = useProducts({
    categoryId,
  });

  const products = data?.response?.data || data?.response || data || [];

  const filteredProducts = useMemo(() => {
    let result = Array.isArray(products) ? [...products] : [];

    if (search.trim()) {
      result = result.filter((product) =>
        product.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'price_asc') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === 'price_desc') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sort === 'rating_desc') {
      result.sort((a, b) => (b.rate || 0) - (a.rate || 0));
    } else if (sort === 'rating_asc') {
      result.sort((a, b) => (a.rate || 0) - (b.rate || 0));
    }

    return result;
  }, [products, search, sort]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }

    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }

    setSearchParams(newParams);
  };

  if (isLoading) return <Loader />;
  if (isError) return <Box color="red">{error.message}</Box>;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 5, md: 7 },
        background:
          'linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={1.5} mb={4}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.7px',
              fontSize: { xs: '2rem', md: '2.8rem' },
            }}
          >
            Products
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 700,
              lineHeight: 1.8,
            }}
          >
            Browse premium products, discover your favorites, and refine your
            results with quick search and sorting options.
          </Typography>
        </Stack>

        <Box
          sx={{
            p: { xs: 2, md: 3 },
            mb: 5,
            borderRadius: 5,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 10px 35px rgba(0,0,0,0.06)',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', md: 'center' }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 3,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TuneRoundedIcon />
              </Box>

              <Box>
                <Typography sx={{ fontWeight: 700 }}>
                  Filter & Sort
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ width: { xs: '100%', md: 'auto' } }}
            >
              <TextField
                label="Search products"
                value={search}
                onChange={handleSearchChange}
                size="small"
                sx={{
                  minWidth: { xs: '100%', sm: 260 },
                  backgroundColor: 'background.default',
                  borderRadius: 3,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                select
                label="Sort by"
                value={sort}
                onChange={handleSortChange}
                size="small"
                sx={{
                  minWidth: { xs: '100%', sm: 220 },
                  backgroundColor: 'background.default',
                  borderRadius: 3,
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="price_asc">Price Low to High</MenuItem>
                <MenuItem value="price_desc">Price High to Low</MenuItem>
                <MenuItem value="rating_desc">Rating High to Low</MenuItem>
                <MenuItem value="rating_asc">Rating Low to High</MenuItem>
              </TextField>
            </Stack>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 5,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease',
                      backgroundColor: 'background.paper',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 18px 40px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        p: 2,
                        pb: 0,
                      }}
                    >
                      <Chip
                        label="Featured"
                        size="small"
                        color="primary"
                        sx={{
                          position: 'absolute',
                          top: 24,
                          left: 24,
                          zIndex: 2,
                          borderRadius: '999px',
                          fontWeight: 600,
                        }}
                      />

                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          height: 240,
                          objectFit: 'cover',
                          borderRadius: 4,
                          backgroundColor: '#f7f7f7',
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        p: 2.5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          lineHeight: 1.4,
                          minHeight: 48,
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Rating
                          value={product.rate || 0}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({product.rate || 0})
                        </Typography>
                      </Stack>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: 'primary.main',
                          mt: 0.5,
                        }}
                      >
                        ${product.price}
                      </Typography>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mt={1}
                        sx={{ color: 'text.secondary' }}
                      >
                        <LocalMallOutlinedIcon sx={{ fontSize: 18 }} />
                        <Typography variant="body2">
                          View product details
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                width: '100%',
                py: 10,
                textAlign: 'center',
                borderRadius: 5,
                backgroundColor: 'background.paper',
                border: '1px dashed',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                No products found
              </Typography>
              <Typography color="text.secondary">
                Try changing your search or sorting options.
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
}