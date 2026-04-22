import Button from '@mui/material/Button';
import useAddToCart from '../../Hooks/useAddToCart';
import { Box, Card, CardMedia, Rating, Typography, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import Loader from '../../ui/Loader/Loader';
import { useState } from "react";
import useAddReview from '../../Hooks/useAddReview';

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isError, isLoading, error } = useProducts(id);
  const { mutate, isPending } = useAddToCart();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { mutate: addReview, isPending: reviewLoading } = useAddReview(id);

  if (isLoading) return <Loader />;
  if (isError) return <Box color="red">{error.message}</Box>;

  const product = data.response;

  return (
    <Box component="div" className="product_details" py={4}>
      <Card sx={{ display: 'flex', padding: '30px', flexWrap: 'wrap', gap: 7 }}>
        <CardMedia
          component="img"
          image={product.image}
          sx={{ width: { xs: '100%', md: 300 } }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography component="h1" variant="h3" gutterBottom>
            {product.name}
          </Typography>

          <Typography
            component="span"
            variant="body1"
            sx={{ display: 'block' }}
            gutterBottom
          >
            {product.price}$
          </Typography>

          <Rating readOnly value={product.rate || 0} />

          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>

          <Typography color="text.secondary">
            Available Quantity : {product.quantity}
          </Typography>

          <Button
            disabled={isPending}
            color="primary"
            variant="contained"
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

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Add Review
        </Typography>

        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue || 0)}
        />

        <TextField
          fullWidth
          label="Write review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          disabled={reviewLoading || !rating || !comment.trim()}
          onClick={() =>
            addReview({
              Rating: rating,
              Comment: comment,
            })
          }
        >
          Submit Review
        </Button>
      </Box>
    </Box>
  );
}