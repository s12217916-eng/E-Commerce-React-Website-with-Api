import Box from '@mui/material/Box';
import useCategories from '../../Hooks/useCategories';
import Loader from '../../ui/Loader/Loader';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import Products from '../Products/Products';

export default function Categories() {

    const { data, isLoading, isError, error } = useCategories();

    console.log(data); // Optional, بس للتاكد

    if (isLoading) return <Loader />;
    if (isError) return <Box color="red">{error.message}</Box>;

    return (
        <>
        <Box className="categories" py={3}>
            <Typography component="h2" variant="h4" mb={3}>
                Categories:
            </Typography>

            <Grid container spacing={4}>
                {data?.map((category) => (
                    <Grid item xs={12} md={6} lg={3} key={category.id}>
                        <Card sx={{ py:3, textAlign:"center" }}>
                            <CardContent>
                                <Typography fontWeight={600} component="h3">
                                    {category.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
        <Products/>
        </>
    );
}