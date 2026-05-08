'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Product } from '@/MOCK_DATAS/products';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({
  product,
  className = '',
}: ProductCardProps) {
  const {
    id,
    name,
    images,
    collection,
    price,
    salePrice,
    rating,
    reviewCount,
    isNew,
    isBestSeller,
    inStock,
  } = product;

  const displayPrice = salePrice ?? price;

  const badges = [
    isNew && {
      label: 'New',
      className: 'bg-black text-white',
    },

    isBestSeller && {
      label: 'Best Seller',
      className:
        'bg-white text-black border border-[#E5E5E5]',
    },

    salePrice && {
      label: 'Sale',
      className: 'bg-[#C0C0C0] text-white',
    },

    !inStock && {
      label: 'Sold Out',
      className:
        'bg-[#8A8A8A]/90 text-white',
    },
  ].filter(Boolean) as {
    label: string;
    className: string;
  }[];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        ease: 'easeOut',
      }}
      className={`group ${className}`}
    >
      <Link
        href={`/products/${id}`}
        className="block"
        aria-label={name}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
          <ImageWithFallback
            src={images?.[0] || ''}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Badges */}
          {!!badges.length && (
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {badges.map((badge) => (
                <Badge
                  key={badge.label}
                  className={badge.className}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}

          {/* Quick View */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 py-3 text-center text-[11px] uppercase tracking-[0.15em] text-[#1A1A1A] transition-transform duration-300 group-hover:translate-y-0">
            Quick View
          </div>
        </div>

        {/* Content */}
        <div className="pb-2 pt-4">
          <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[#9A9A9A]">
            {collection}
          </p>

          <h3
            className="mb-2 text-base text-[#1A1A1A] transition-colors group-hover:text-[#3A3A3A]"
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
              fontWeight: 500,
            }}
          >
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span
              className={`text-sm text-[#1A1A1A] ${salePrice
                  ? 'font-normal'
                  : 'font-medium'
                }`}
            >
              €{displayPrice.toFixed(2)}
            </span>

            {salePrice && (
              <span className="text-sm text-[#9A9A9A] line-through">
                €{price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="mt-1.5 flex items-center gap-1">
            <div
              className="flex"
              aria-label={`Rating ${rating} out of 5`}
            >
              {Array.from({ length: 5 }).map(
                (_, index) => (
                  <span
                    key={index}
                    className={`text-[10px] ${index <
                        Math.round(rating)
                        ? 'text-[#C0C0C0]'
                        : 'text-[#E5E5E5]'
                      }`}
                  >
                    ★
                  </span>
                )
              )}
            </div>

            <span className="text-[10px] text-[#9A9A9A]">
              ({reviewCount})
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] ${className}`}
    >
      {children}
    </span>
  );
}