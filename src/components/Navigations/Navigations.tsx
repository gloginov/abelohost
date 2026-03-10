'use client';

import Link from 'next/link';
import styles from './Navigations.module.scss';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useState } from 'react';

const Navigation = (props: { useFooter?: boolean }) => {
  const { useFooter = false } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/', label: 'Hot deals' },
    { href: '/', label: 'Categories' },
    { href: '/', label: 'Laptops' },
    { href: '/', label: 'Smartphones' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div 
      className={`
        ${styles.navigation} 
        ${useFooter ? styles.navigation_footer : ''}
        ${isMenuOpen && !useFooter ? styles.navigation_open : ''}
      `}
    >
      <div className={styles.navigation__container}>
        {!useFooter && (
          <button 
            className={styles.navigation__burger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        <nav className={`
          ${styles.navigation__nav}
          ${!useFooter ? styles.navigation__nav_mobile : ''}
        `}>

          <button 
            className={styles.navigation__close}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
          </button>

          <ul className={styles.navigation__menu}>
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  onClick={() => !useFooter && setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <Link 
                  href="/profile"
                  onClick={() => !useFooter && setIsMenuOpen(false)}
                >
                  Профиль
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;