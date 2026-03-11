import styles from './Alert.module.scss';

interface AlertProps {
  message: string;
  variant?: 'error' | 'success';
  inline?: boolean; // Режим: тостер или inline в форме
  onClose?: () => void;
}

export const Alert = ({ 
  message, 
  variant = 'error', 
  inline = false,
  onClose 
}: AlertProps) => {
  const alertClass = [
    styles.alert,
    styles[`alert--${variant}`],
    inline && styles['alert--inline']
  ].filter(Boolean).join(' ');

  return (
    <div className={alertClass} role="alert">
      <span>{message}</span>
      {onClose && (
        <button 
          className={styles.alert__close}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};