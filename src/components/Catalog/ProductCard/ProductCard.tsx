'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button/Button';
import Heart from '@/public/images/heart.svg';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  isAuthenticated?: boolean;
}

const ProductCard = ({ product, isAuthenticated = false }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('To add items to your cart, you must log in.');
      return;
    }

    setIsAddingToCart(true);
    setTimeout(() => {
      console.log('Add to cart:', product.id);
      setIsAddingToCart(false);
    }, 500);
  };

  return (
    <article className={styles.card}>
      <Link href={`/product/${product.id}`} className={styles.card__image}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          priority={product.id <= 4}
        />
      </Link>

      <div className={styles.card__content}>
        <Link href={`/product/${product.id}`} className={styles.card__name}>
          {product.title}
        </Link>

        <div className={styles.card__category}>{product.category}</div>

        <div className={styles.card__price}>
          <span className={styles.card__priceCurrent}>${product.price.toLocaleString()}</span>
        </div>

        {isAuthenticated ? (
          <div className={styles.card__actions}>
            <Button isLoading={isAddingToCart} disabled={isAddingToCart} onClick={handleAddToCart}>
              Add to cart
            </Button>

            <Button
              favorite
              isFavorite={isFavorite}
              disabled={isAddingToCart} 
              onClick={() => setIsFavorite(!isFavorite)}
              title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <Heart />
            </Button>

          </div>
        ) : null}
      </div>
    </article>
  );
};

export default ProductCard;
