import React from 'react'
    import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../axiosInstance';

 
export default function useCategories() {
     const getCategories = async () => {
        const response = await axiosInstance.get('/Categories');
        console.log(response.data);
        return response.data;
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['categories','en'],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
       refetchOnWindowFocus: false
         
    });
 return { data, isLoading, isError, error }
}
