'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import Image from 'next/image';
import User from '@/public/images/user.svg';
import Mail from '@/public/images/mail.svg';
import Logout from '@/public/images/logout.svg';
import { useAuthStore } from '@/lib/store/useAuthStore';

const Header = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__fixed}>
        <div className={[styles.header__container, styles.header__container_sm_padding].join(' ')}>
          <a href="mailto:info@abeloshop.com" className={styles.header__link}>
            <Mail className={styles.header__icon} />
            info@abeloshop.com
          </a>

          {isAuthenticated && user ? (
            <div className={styles.header__user}>
              <span className={[styles.header__link, styles.header__link_hide_mobile].join(' ')}>
                <User className={styles.header__icon} />
                {user.firstName} {user.lastName}
              </span>
              <span className={styles.header__link} onClick={handleLogout}>
                <Logout className={styles.header__icon} />
                Logout
              </span>
            </div>
          ) : (
            <Link href="/login" className={styles.header__link}>
              <User className={styles.header__icon} />
              Login
            </Link>
          )}
        </div>
      </div>

      <div className={styles.header__banner}>
        <div className={[styles.header__container, styles.header__container_mobile].join(' ')}>
          <div className={styles.header__logo}>
            <Link href="/">
              Abelohost Shop<span className={styles.header__logo_dot}>.</span>
            </Link>
          </div>

          <Link href={`${process.env.NEXT_PUBLIC_PLACEHOLDER_URL}/600x70/png?text=600x70`}>
            <Image
              className={styles.header__banner__image}
              src={`${process.env.NEXT_PUBLIC_PLACEHOLDER_URL}/600x70/png?text=600x70`}
              alt="banner"
              width={600}
              height={70}
              sizes="(max-width: 768px) 100vw, 600px" 
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
