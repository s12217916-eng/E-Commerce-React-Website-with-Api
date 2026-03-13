import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useCategories from '../../Hooks/useCategories';
export default function Categories() {
    const { data, isLoading, isError, error } = useCategories();
    if (isLoading) return <CircularProgress />;
    if (isError) return <Box color="red">{error.message}</Box>;
    const categoriesArray = data?.response; 
    return (
        <Box>
            {Array.isArray(data) &&
                data.map(category => (
                    <Box key={category.id}>
                        {category.name || "WOW API"} 
                    </Box>
                ))
            }
        </Box>
    );
}