import React from 'react';
import Header from '@/components/Header/Header';
import Navigation from '../Navigations/Navigations';
import Footer from '@/components/Footer/Footer';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  
  return (
    <div className={styles.layout}>
      <Header />
      <Navigation />
      <main className={styles.layout__main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;