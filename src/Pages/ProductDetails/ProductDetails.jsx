import Button from '@mui/material/Button';
import useAddToCart from '../../Hooks/useAddToCart';
import { Box, Card, CardMedia, Rating, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import Loader from '../../ui/Loader/Loader';

export default function ProductDetails() {

  const { id } = useParams();
  const { data, isError, isLoading, error } = useProducts(id);
  const { mutate, isPending } = useAddToCart();

  if (isLoading) return <Loader />
  if (isError) return <Box color={'red'}>{error.message}</Box>

  const product = data.response;
console.log("PRODUCT =", product);
console.log("PRODUCT ID =", product?.id);
  return (
    <Box component={'div'} className='product_details' py={4}>
      <Card sx={{ display: 'flex', padding: '30px', flexWrap: 'wrap', gap: 7 }}>
        
        <CardMedia
          component={'img'}
          image={product.image}
          sx={{ width: { xs: '100%', md: 300 } }}
        >
        </CardMedia>

        <Box sx={{ flex: 1 }}>
          
          <Typography component={'h1'} variant='h3' gutterBottom>
            {product.name}
          </Typography>

          <Typography
            component={'span'}
            variant='body1'
            sx={{ display: 'block' }}
            gutterBottom
          >
            {product.price}$
          </Typography>

          <Rating readOnly value={product.rate}></Rating>

          <Typography variant='body1' gutterBottom>
            {product.description}
          </Typography>

          <Typography color="text.secondary">
            Available Quantity : {product.quantity}
          </Typography>

          <Button
            disabled={isPending}
            color='primary'
            variant='contained'
            onClick={() =>
              mutate({
                productId: product.id,
                Count: 1,
              })
            }
          >
            Add To Cart
          </Button>

        </Box>
      </Card>
    </Box>

  );
}