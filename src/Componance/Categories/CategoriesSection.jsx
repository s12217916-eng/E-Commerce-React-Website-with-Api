import Box from '@mui/material/Box';
import useCategories from '../../Hooks/useCategories';
import Loader from '../../ui/Loader/Loader';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import Products from '../Products/Products';
import { Link } from 'react-router';
import Category from '../../ui/Category/Category';

export default function CategoriesSection() {
    const { data, isLoading, isError, error } = useCategories();
    if (isLoading) return <Loader />;
    if (isError) return <Box color="red">{error.message}</Box>;
    return (
        <>
        <Box className="categories" py={3}>
            <Typography component="h2" variant="h4" mb={3}>
                Categories:
            </Typography>

            <Link to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>Show More</Link>

            <Grid container spacing={4}>

                {data?.map((category) => (
                    <Grid item xs={12} md={6} lg={3} key={category.id}>
                       <Category category={category} />
                    </Grid>
                ))}
            </Grid>
        </Box>
       
        </>
    );
}