export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  tokenType: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface ValidationError {
  field: keyof LoginCredentials;
  message: string;
}