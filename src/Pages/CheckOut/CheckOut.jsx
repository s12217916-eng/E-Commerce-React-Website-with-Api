import React, { useState } from 'react'
import useCheckOut from '../../Hooks/useCheckOut';
import useCart from '../../Hooks/useCart';
import { Box, Button, FormControl, Input, InputLabel, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
export default function CheckOut() {
    const { mutate: CheckOut, isPending } = useCheckOut();
    const [paymentMethod, setPaymentMethod] = useState('Visa');
        const { data, isLoading, error, Loader } = useCart();
        if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  return (
     <Box className='cart' p={4}>
            <Typography component={'h1'}>Check Out</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Product Price</TableCell>
                            <TableCell>Product Quantity</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.items.map(item => (
                            <TableRow>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.price}$</TableCell>
                                <TableCell>
                                        <Typography component={'span'} sx={{ mx: 2 }}>{item.count}</Typography>
                                </TableCell>
                                <TableCell>{item.price * item.count}$</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5} sx={{ fontWeight: 1000 }}>
                                TOTAL: {data?.cartTotal}$
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <Box sx={{display:"flex" , flexDirection:"column" , gap:3 , alignItems:"center" , mt:3}}>
                <FormControl fullWidth>
                    <InputLabel id="paymentMethod" > payment Method </InputLabel>
                    <Select 
                    labelId="paymentMethod"
                    id="paymentMethod"
                    value={paymentMethod}
                    label="paymentMethod"
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                    >
                        <MenuItem value={'Cash'}>Cash</MenuItem>
                        <MenuItem value={'Visa'}>Visa</MenuItem>
                    </Select>
                </FormControl>
                <Button variant='contained' color='success' flex-Grow={1} onClick={()=>CheckOut(paymentMethod)}>Pay Now</Button>
            </Box>
</Box>
  )
}
