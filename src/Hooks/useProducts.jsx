import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../Api/AuthAxiosInstance';
export default function useProducts(id) {
    const getProduct = async () => {
        const url = id ? `/products/${id}` : `/products`; // 👈 لو ما في id يجيب كل المنتجات
        const response = await axiosInstance.get(url)
        return response.data
    }

    const queryKey = id ? ['products', id] : ['products', 'all']

    return useQuery({
        queryKey,
        queryFn: getProduct,
        staleTime: 1000 * 60 * 50
    })
}