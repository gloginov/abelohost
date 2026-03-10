import { LoginCredentials, ValidationError } from '@/types/auth';

export const VALIDATION_RULES = {
  username: {
    minLength: 3,
    required: true,
  },
  password: {
    minLength: 3,
    required: true,
  },
} as const;

export const validateField = (
  field: keyof LoginCredentials,
  value: string
): string | null => {
  const rules = VALIDATION_RULES[field];

  if (rules.required && !value.trim()) {
    return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
  }

  if (value.length < rules.minLength) {
    return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${
      rules.minLength
    } characters`;
  }

  return null;
};

export const validateLoginForm = (
  credentials: LoginCredentials
): ValidationError[] => {
  const errors: ValidationError[] = [];

  (Object.keys(credentials) as Array<keyof LoginCredentials>).forEach((field) => {
    const error = validateField(field, credentials[field]);
    if (error) {
      errors.push({ field, message: error });
    }
  });

  return errors;
};