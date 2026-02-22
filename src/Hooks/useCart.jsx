import React from 'react'
import { useQuery } from '@tanstack/react-query';
import AuthAxiosInstance from '../Api/AuthAxiosInstance';
export default function useCart() {
  const getitem = async  ()=>{
const response = await  AuthAxiosInstance.get('Carts');
return response.data;
  }

  const query = useQuery({
    queryKey:['carts','en'],
    queryFn :getitem,
    staleTime : 1000 * 60 *5
  });
  return query;
}
