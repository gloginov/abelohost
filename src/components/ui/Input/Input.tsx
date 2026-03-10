import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className={styles.input}>
      <input
        ref={ref}
        className={`${styles.input__input} ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      <label htmlFor={props.id} className={styles.input__label}>
        {label}
      </label>
      {error && <p className={styles.input__error}>{error}</p>}
    </div>
  )
);

Input.displayName = 'Input';
