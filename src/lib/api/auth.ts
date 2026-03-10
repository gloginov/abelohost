import axios from 'axios';
import type { AuthResponse, LoginCredentials } from '@/types/auth';

export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Authentication failed';
      throw new AuthError(message, error.response?.status || 500);
    }
    throw new AuthError('An unexpected error occurred', 500);
  }
};
