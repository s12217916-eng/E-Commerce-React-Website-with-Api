import React from "react";
import useProducts from "../../Hooks/useProducts";
import { Box, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

export default function Products() {

    const { data } = useProducts(); // بدون id = كل المنتجات

    return (
        <Box className="product" py={3} sx={{ textAlign: "center" }}>

            <Typography component="h2" variant="h4" mb={3}>
                Products:
            </Typography>

            <Grid container spacing={4}>
                {data?.response?.data?.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Link to={`/Products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <Card sx={{ textAlign:"center", py:3 }}>
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ height:400, objectFit:"cover" }}
                                />
                                <CardContent>
                                    <Typography component="h3">{product.name}</Typography>
                                    <Typography component="span">{product.price}$</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
}