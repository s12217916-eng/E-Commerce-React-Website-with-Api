import React, { useState } from 'react';
import useCheckOut from '../../Hooks/useCheckOut';
import useCart from '../../Hooks/useCart';
import {
  Box,
  Button,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  Container,
  Paper,
  Stack,
  InputLabel,
  Chip,
} from '@mui/material';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';

export default function CheckOut() {
  const { mutate: CheckOut, isPending } = useCheckOut();
  const [paymentMethod, setPaymentMethod] = useState('Visa');
  const { data, isLoading, error } = useCart();

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
            Check Out
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 700,
              lineHeight: 1.8,
            }}
          >
            Review your order summary, choose your preferred payment method,
            and complete your purchase securely.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.5fr 0.9fr' },
            gap: 3,
          }}
        >
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
                  <ShoppingCartCheckoutRoundedIcon />
                </Box>

                <Box>
                  <Typography sx={{ fontWeight: 700 }}>
                    Order Summary
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data?.items?.length || 0} item{data?.items?.length !== 1 ? 's' : ''} ready for checkout
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
                  <TableRow sx={{ backgroundColor: 'action.hover' }}>
                    <TableCell sx={{ fontWeight: 700 }}>Product Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Product Price</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Product Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.items.map((item) => (
                    <TableRow key={item.productId} hover>
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
                        <Typography
                          component="span"
                          sx={{
                            fontWeight: 700,
                            px: 1.5,
                            py: 0.7,
                            borderRadius: '999px',
                            backgroundColor: 'background.default',
                            border: '1px solid',
                            borderColor: 'divider',
                            display: 'inline-block',
                          }}
                        >
                          {item.count}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {item.price * item.count}$
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow sx={{ backgroundColor: 'action.hover' }}>
                    <TableCell colSpan={4}>
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

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: 5,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
              backgroundColor: 'background.paper',
              height: 'fit-content',
            }}
          >
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, mb: 1 }}
                >
                  Payment
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', lineHeight: 1.8 }}
                >
                  Choose how you want to complete your order.
                </Typography>
              </Box>

              <FormControl fullWidth>
                <InputLabel id="paymentMethod">Payment Method</InputLabel>
                <Select
                  labelId="paymentMethod"
                  id="paymentMethod"
                  value={paymentMethod}
                  label="Payment Method"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  sx={{
                    borderRadius: 3,
                  }}
                >
                  <MenuItem value={'Cash'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalAtmRoundedIcon fontSize="small" />
                      Cash
                    </Box>
                  </MenuItem>

                  <MenuItem value={'Visa'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CreditCardRoundedIcon fontSize="small" />
                      Visa
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 4,
                  backgroundColor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                  Payment Summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Selected payment method: <strong>{paymentMethod}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Final total: <strong>{data?.cartTotal}$</strong>
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="success"
                fullWidth
                disabled={isPending}
                onClick={() => CheckOut(paymentMethod)}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: 'none',
                }}
              >
                {isPending ? 'Processing...' : 'Pay Now'}
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}