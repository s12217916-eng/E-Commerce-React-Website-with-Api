import useCart from '../../Hooks/useCart';
import { Box, Button, IconButton, Table } from '@mui/material';
import { TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import useRemoveFromCart from '../../Hooks/useRemoveFromCart';
import useUpdataCartItem from '../../Hooks/useUpdataCartItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveItem from '@mui/icons-material/Remove';
export default function Cart() {
    const { data, isLoading, error, Loader } = useCart();
    const { mutate: RemoveeItem, isPendingItem } = useRemoveFromCart();
    const { mutate: UpdateCartItem, isPending: isPendingUpdate } = useUpdataCartItem();
    const handelUpdateQut = (productId, action) => {
        const item = data.items.find((i) => {
        
            return i.productId == productId
           
            
        });
     if (action === '+') {
    UpdateCartItem({ productId, count: item.count + 1 })
} else if (action === '-' && item.count > 0) {
    UpdateCartItem({ productId, count: item.count - 1 })
}
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Box className='cart' p={4}>
            <Typography component={'h1'}>My Cart</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Product Price</TableCell>
                            <TableCell>Product Quantity</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.items.map(item => (
                            <TableRow>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.price}$</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                        <IconButton size='small' disabled={isPendingUpdate} onClick={() => handelUpdateQut(item.productId, '-')} color='primary'>
                                            <RemoveItem />
                                        </IconButton>
                                        <Typography component={'span'} sx={{ mx: 2 }}>{item.count}</Typography>
                                        <IconButton size='small' disabled={isPendingUpdate} onClick={() => handelUpdateQut(item.productId, '+')} color='primary'>
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell>{item.price * item.count}$</TableCell>
                                <TableCell>
                                    <Button color='error' variant='contained' disabled={isPendingItem} onClick={() => RemoveeItem(item.productId)}>Remove</Button> </TableCell>
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
        </Box>
    );
}