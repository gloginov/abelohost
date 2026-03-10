'use client';

import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { Alert } from '@/components/ui/Alert/Alert';
import { useAuth } from '@/lib/hooks/useAuth';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const { credentials, errors, isLoading, generalError, updateField, handleSubmit } = useAuth();

  return (
    <div className={styles.loginForm}>
      <h1 className="">Login</h1>

      <form onSubmit={handleSubmit}>
        <Input
          id="username"
          label="Username"
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={e => updateField('username', e.target.value)}
          error={errors.username}
          disabled={isLoading}
          autoComplete="username"
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={e => updateField('password', e.target.value)}
          error={errors.password}
          disabled={isLoading}
          autoComplete="current-password"
        />

        <Button type="submit" isLoading={isLoading}>
          Login
        </Button>

      </form>
      {generalError && <Alert message={generalError} inline />}
    </div>
  );
};
