import React, { useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
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
    <Box py={4}>
      <Typography variant="h4" mb={3}>
        Products
      </Typography>

      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          size="small"
        />

        <TextField
          select
          label="Sort"
          value={sort}
          onChange={handleSortChange}
          size="small"
          sx={{ minWidth: 220 }}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="price_asc">Price Low to High</MenuItem>
          <MenuItem value="price_desc">Price High to Low</MenuItem>
          <MenuItem value="rating_desc">Rating High to Low</MenuItem>
          <MenuItem value="rating_asc">Rating Low to High</MenuItem>
        </TextField>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Link
                to={`/products/${product.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Box
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    p: 2,
                    height: '100%',
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': {
                      boxShadow: 3,
                    },
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />

                  <Typography variant="h6" mt={2}>
                    {product.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {product.price}$
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Rating: {product.rate || 0}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography>No products found</Typography>
        )}
      </Grid>
    </Box>
  );
}