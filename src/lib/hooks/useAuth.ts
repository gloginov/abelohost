import { useRouter } from 'next/navigation';
import { useState, useCallback, FormEvent } from 'react';
import { loginUser, AuthError } from '@/lib/api/auth';
import { LoginCredentials, User } from '@/types/auth';
import { validateLoginForm } from '@/lib/utils/validation';
import { useAuthStore } from '@/lib/store/useAuthStore';

interface UseAuthReturn {
  credentials: LoginCredentials;
  errors: Record<string, string>;
  isLoading: boolean;
  generalError: string | null;
  updateField: (field: keyof LoginCredentials, value: string) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
}

const INITIAL_STATE: LoginCredentials = {
  username: '',
  password: '',
};

export const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<LoginCredentials>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const login = useAuthStore((state: { login: (user: User, token: string) => void }) => state.login);

  const updateField = useCallback((field: keyof LoginCredentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setGeneralError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const validationErrors = validateLoginForm(credentials);
      if (validationErrors.length > 0) {
        const errorMap = validationErrors.reduce(
          (acc, { field, message }) => ({ ...acc, [field]: message }),
          {}
        );
        setErrors(errorMap);
        return;
      }

      setIsLoading(true);
      setGeneralError(null);

      try {
        const userData = await loginUser(credentials);
        const user: User = {
          id: userData.userId,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        };
        login(user, userData.accessToken);
        router.push('/');
        router.refresh();
      } catch (error) {
        const message =
          error instanceof AuthError ? error.message : 'An unexpected error occurred';
        setGeneralError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [credentials, router, login]
  );

  return {
    credentials,
    errors,
    isLoading,
    generalError,
    updateField,
    handleSubmit,
  };
};