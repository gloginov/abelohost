import axios from 'axios';
import { AuthError } from './auth'; 
import type { Product } from '@/types/product';
export const getProducts = async (limit: number = 12): Promise<{ products: Product[]; total: number }> => {
  try {
    const response = await axios.get<{ products: Product[]; total: number }>(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new AuthError(error.response?.data?.message || 'Failed to fetch products', error.response?.status || 500);
    }
    throw new AuthError('An unexpected error occurred', 500);
  }
};