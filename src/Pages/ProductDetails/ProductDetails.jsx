import React from 'react'
import { useParams } from 'react-router-dom'
import useProducts from '../../Hooks/useProducts'
import Loader from '../../ui/Loader/Loader'
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material'
export default function ProductDetails() {
    const { id } = useParams();
    const { data, isError, isLoading, error } = useProducts(id);
    if (isLoading) return <Loader />
    if (isError) return <Box color="red">{error.message}</Box>
    console.log(data);
    return (
        <div></div>
    )
}
