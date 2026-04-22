import { useMutation } from "@tanstack/react-query";
import AuthAxiosInstance from "../Api/AuthAxiosInstance";

export default function useAddReview(productId) {
  return useMutation({
    mutationFn: async (reviewData) => {
      const response = await AuthAxiosInstance.post(
        `/Products/${productId}/reviews`,
        reviewData
      );
      return response.data;
    },
  });
}