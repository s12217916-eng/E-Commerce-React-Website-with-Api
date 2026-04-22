import { useQuery } from '@tanstack/react-query';
import AuthAxiosInstance from '../Api/AuthAxiosInstance';

export default function useProducts(paramsOrId) {
  const getProducts = async () => {
    // single product details
    if (typeof paramsOrId === 'string' || typeof paramsOrId === 'number') {
      const response = await AuthAxiosInstance.get(`/products/${paramsOrId}`);
      return response.data;
    }

    // products list or products by category
    const params = paramsOrId || {};
    let url = '/products';

    if (params.categoryId) {
      url = `/Products/category/${params.categoryId}`;
    }

    const response = await AuthAxiosInstance.get(url);
    return response.data;
  };

  const queryKey =
    typeof paramsOrId === 'string' || typeof paramsOrId === 'number'
      ? ['products', 'single', paramsOrId]
      : ['products', 'list', paramsOrId];

  return useQuery({
    queryKey,
    queryFn: getProducts,
    staleTime: 1000 * 60 * 50,
  });
}