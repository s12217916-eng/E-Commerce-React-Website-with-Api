import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../Api/AuthAxiosInstance';
export default function useCheckOut() {
    const queryclient = useQueryClient();
  return useMutation({
    mutationFn: async (paymentMethod) =>{
         console.log("Mutation function");
         console.log(paymentMethod);
         return await AuthAxiosInstance.post('/Checkouts', {paymentMethod})
    }, onSuccess:(response) =>{
        console.log(response);
        if(response.data.url){
            location.href = response.data.url
        }
        queryclient.invalidateQueries({queryKey:['carts']})
    }
  })
}
