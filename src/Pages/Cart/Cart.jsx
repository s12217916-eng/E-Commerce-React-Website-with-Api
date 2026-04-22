import useCart from '../../Hooks/useCart';
import {
  Box,
  Button,
  IconButton,
  Table,
  Paper,
  Container,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import useRemoveFromCart from '../../Hooks/useRemoveFromCart';
import useUpdataCartItem from '../../Hooks/useUpdataCartItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useCart();
  const { mutate: RemoveeItem, isPendingItem } = useRemoveFromCart();
  const { mutate: UpdateCartItem, isPending: isPendingUpdate } = useUpdataCartItem();

  const handelUpdateQut = (productId, action) => {
    const item = data.items.find((i) => {
      return i.productId == productId;
    });

    if (action === '+') {
      UpdateCartItem({ productId, count: item.count + 1 });
    } else if (action === '-' && item.count > 0) {
      UpdateCartItem({ productId, count: item.count - 1 });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
            component="h1"
            variant="h3"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.6px',
              fontSize: { xs: '2rem', md: '2.8rem' },
            }}
          >
            My Cart
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 700,
              lineHeight: 1.8,
            }}
          >
            Review your selected items, update quantities, and proceed to checkout securely.
          </Typography>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 5,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
            backgroundColor: 'background.paper',
          }}
        >
          <Box
            sx={{
              px: { xs: 2, md: 3 },
              py: 2.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 3,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBagOutlinedIcon />
              </Box>

              <Box>
                <Typography sx={{ fontWeight: 700 }}>
                  Shopping Cart
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data?.items?.length || 0} item{data?.items?.length !== 1 ? 's' : ''} in your cart
                </Typography>
              </Box>
            </Stack>

            <Chip
              icon={<PaymentsRoundedIcon />}
              label={`Total: ${data?.cartTotal || 0}$`}
              color="primary"
              sx={{
                px: 1,
                fontWeight: 700,
                borderRadius: '999px',
              }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: 'action.hover',
                  }}
                >
                  <TableCell sx={{ fontWeight: 700 }}>Product Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Product Price</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Product Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.items.map((item) => (
                  <TableRow
                    key={item.productId}
                    hover
                    sx={{
                      transition: '0.2s',
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>
                        {item.productName}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="text.secondary">
                        {item.price}$
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: '999px',
                          px: 1,
                          py: 0.4,
                          backgroundColor: 'background.default',
                        }}
                      >
                        <IconButton
                          size="small"
                          disabled={isPendingUpdate}
                          onClick={() => handelUpdateQut(item.productId, '-')}
                          color="primary"
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography
                          component="span"
                          sx={{
                            mx: 1.5,
                            minWidth: 22,
                            textAlign: 'center',
                            fontWeight: 700,
                          }}
                        >
                          {item.count}
                        </Typography>

                        <IconButton
                          size="small"
                          disabled={isPendingUpdate}
                          onClick={() => handelUpdateQut(item.productId, '+')}
                          color="primary"
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {item.price * item.count}$
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Button
                        color="error"
                        variant="outlined"
                        disabled={isPendingItem}
                        startIcon={<DeleteOutlineRoundedIcon />}
                        onClick={() => RemoveeItem(item.productId)}
                        sx={{
                          borderRadius: 3,
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow
                  sx={{
                    backgroundColor: 'action.hover',
                  }}
                >
                  <TableCell colSpan={5}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 1,
                        py: 1,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        TOTAL:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: 'primary.main',
                        }}
                      >
                        {data?.cartTotal}$
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>

        <Box
          sx={{
            display: 'flex',
            mt: 4,
            justifyContent: 'space-between',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{
              flexGrow: 1,
              flexShrink: 1,
              py: 1.4,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 700,
              boxShadow: 'none',
            }}
            onClick={() => navigate('/CheckOut')}
          >
            Check Out
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{
              flexGrow: 1,
              flexShrink: 1,
              py: 1.4,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 700,
            }}
            onClick={() => navigate('/')}
          >
            Clear Cart
          </Button>

          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              flexGrow: 1,
              flexShrink: 1,
              py: 1.4,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 700,
              boxShadow: 'none',
            }}
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    </Box>
  );
}