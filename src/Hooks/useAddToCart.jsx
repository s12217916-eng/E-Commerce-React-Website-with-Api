import React from 'react'
import AuthAxiosInstance from '../Api/AuthAxiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
export default function useAddToCart() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn : async ({productId,Count}) =>{
           return await AuthAxiosInstance.post('/Carts', {
    ProductId: productId,
    Count: Count
})
        },onSuccess: () =>{
            queryClient.invalidateQueries({queryKey :['carts']})
        }
    })
  return mutation;
}
