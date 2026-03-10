import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';
import Spinner from '@/public/images/spinner.svg';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
  favorite?: boolean;
  secondary?: boolean;
  isFavorite?: boolean;
}

export const Button = ({
  isLoading,
  children,
  className = '',
  favorite = false,
  isFavorite = false,
  secondary = false,
  ...props
}: ButtonProps) => (
  <button
    disabled={isLoading || props.disabled}
    className={`${styles.button} ${favorite ? styles['button--favorite'] : ''} ${favorite && isFavorite ? styles['button--favorite_active'] : ''} ${secondary ? styles['button--secondary'] : ''} ${className}`}
    {...props}
  >
    {isLoading && (
      <span className={styles.button__loader}>
        <Spinner className={styles.button__loaderIcon} />
      </span>
    )}
    {children}
  </button>
);
