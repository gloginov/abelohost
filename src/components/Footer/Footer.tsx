'use client';
import Navigation from '../Navigations/Navigations';
import styles from './Footer.module.scss';
import { useAuthStore } from '@/lib/store/useAuthStore';

const Footer = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__wrap}>
          <Navigation useFooter={true}/>
          <div className={styles.footer__bottom}>
            <p>&copy; {currentYear} AbeloShop. {isAuthenticated && `Logged as ${user?.firstName}` }</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
