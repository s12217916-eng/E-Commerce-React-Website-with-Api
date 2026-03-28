import { useMutation, useQueryClient } from '@tanstack/react-query'
import AuthAxiosInstance from '../Api/AuthAxiosInstance';
export default function useUpdataCartItem() {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, count }) => {
      return await AuthAxiosInstance.patch(`/Carts/${productId}`, { count });
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['carts'] });
    },
    onError: (err) => {
      console.log("ERROR:", err);
    }
  }); 

} 