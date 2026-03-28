import React from 'react'
import AuthAxiosInstance from '../Api/AuthAxiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query'
export default function useRemoveFromCart() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn : (cardItemId) => AuthAxiosInstance.delete(`/Carts/${cardItemId}`),
    onSuccess:() => {
        queryClient.invalidateQueries({queryKey :['carts']})
    }
  })
}
