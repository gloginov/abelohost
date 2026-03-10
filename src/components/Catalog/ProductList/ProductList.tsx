'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';
import { Product } from '@/types/product';
import { getProducts } from '@/lib/api/products';
import { useAuthStore } from '@/lib/store/useAuthStore';
import Spinner from '@/public/images/spinner.svg';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts(12);
        setProducts(data.products);
      } catch (err: unknown) {
        setError('Failed to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className={styles.catalog}>
      <div className={styles.catalog__header}>
        <h1 className={styles.catalog__title}>Latest Products</h1>
      </div>

      {isLoading ? (
        <div className={styles.catalog__loading}>
          Loading...
          <Spinner className={styles.catalog__loading__image} />
        </div>
      ) : error && !isLoading ? (
        <div className={styles.catalog__error}>{error}</div>
      ) : (
        <div className={styles.catalog__grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} isAuthenticated={isAuthenticated} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
