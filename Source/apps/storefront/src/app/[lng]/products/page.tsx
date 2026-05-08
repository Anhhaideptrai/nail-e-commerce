'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/shared/ProductCard';
import { products, COLLECTIONS } from '@/MOCK_DATAS/products';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'bestseller';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'bestseller', label: 'Best Sellers' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const getSortFromParams = (searchParams: URLSearchParams): SortOption => {
  const sort = searchParams.get('sort');
  const legacyFilter = searchParams.get('filter');

  if (sort === 'price-asc' || sort === 'price-desc' || sort === 'newest' || sort === 'bestseller') {
    return sort;
  }

  if (legacyFilter === 'new') {
    return 'newest';
  }

  if (legacyFilter === 'bestseller') {
    return 'bestseller';
  }

  return 'featured';
};

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const routeParams = useParams<{ lng?: string }>();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCollection, setActiveCollection] = useState(searchParams.get('collection') || 'all');
  const [sortBy, setSortBy] = useState<SortOption>(() => getSortFromParams(searchParams));
  const [sortOpen, setSortOpen] = useState(false);
  const lng = routeParams.lng ?? 'en';

  const pushProductQuery = (nextParams: URLSearchParams) => {
    const query = nextParams.toString();
    router.push(query ? `/${lng}/products?${query}` : `/${lng}/products`);
  };

  useEffect(() => {
    const col = searchParams.get('collection');
    setActiveCollection(col || 'all');
    const search = searchParams.get('search');
    setSearchQuery(search || '');
    setSortBy(getSortFromParams(searchParams));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Collection filter
    if (activeCollection !== 'all') {
      result = result.filter(p => p.category === activeCollection);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q)) ||
          p.collection.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
        break;
      case 'bestseller':
        result = result.filter(p => p.isBestSeller).concat(result.filter(p => !p.isBestSeller));
        break;
    }

    return result;
  }, [activeCollection, searchQuery, sortBy]);

  const activeSortLabel = sortOptions.find(s => s.value === sortBy)?.label || 'Featured';

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Page Header */}
      <div className="text-center py-14 px-4 border-b border-[#E8E8E8]">
        <p className="text-[#9A9A9A] uppercase tracking-[0.2em] text-xs mb-3" style={{ letterSpacing: '0.2em' }}>
          {activeCollection !== 'all' ? COLLECTIONS.find(c => c.id === activeCollection)?.label : 'All Products'}
        </p>
        <h1 className="text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
          {activeCollection !== 'all' ? COLLECTIONS.find(c => c.id === activeCollection)?.label : 'The Collection'}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Collection Pills */}
          <div className="flex flex-wrap gap-2">
            {COLLECTIONS.map(col => (
              <button
                key={col.id}
                onClick={() => {
                  setActiveCollection(col.id);
                  const params = new URLSearchParams(searchParams.toString());

                  if (col.id === 'all') {
                    params.delete('collection');
                  } else {
                    params.set('collection', col.id);
                  }

                  pushProductQuery(params);
                }}
                className={`px-4 py-1.5 text-xs uppercase tracking-widest border transition-colors ${
                  activeCollection === col.id
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#6A6A6A] border-[#E0E0E0] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
                style={{ letterSpacing: '0.1em' }}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Right: Search + Sort */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#9A9A9A]" />
              <input
                value={searchQuery}
                onChange={e => {
                  const nextSearch = e.target.value;
                  const params = new URLSearchParams(searchParams.toString());

                  setSearchQuery(nextSearch);

                  if (nextSearch.trim()) {
                    params.set('search', nextSearch);
                  } else {
                    params.delete('search');
                  }

                  pushProductQuery(params);
                }}
                placeholder="Search..."
                className="pl-8 pr-3 py-2 text-xs border border-[#E0E0E0] bg-white text-[#1A1A1A] placeholder:text-[#9A9A9A] outline-none focus:border-[#C0C0C0] transition-colors w-40 md:w-52"
              />
              {searchQuery && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('search');
                    setSearchQuery('');
                    pushProductQuery(params);
                  }}
                >
                  <X className="size-3 text-[#9A9A9A]" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest border border-[#E0E0E0] text-[#6A6A6A] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors bg-white"
                style={{ letterSpacing: '0.1em' }}
              >
                <SlidersHorizontal className="size-3.5" />
                <span className="hidden sm:inline">{activeSortLabel}</span>
                <ChevronDown className="size-3" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-[#E0E0E0] shadow-lg z-20 min-w-[180px]">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());

                        setSortBy(opt.value);
                        setSortOpen(false);

                        params.delete('filter');

                        if (opt.value === 'featured') {
                          params.delete('sort');
                        } else {
                          params.set('sort', opt.value);
                        }

                        pushProductQuery(params);
                      }}
                      className={`block w-full text-left px-4 py-2.5 text-xs uppercase tracking-widest hover:bg-[#F5F5F5] transition-colors ${sortBy === opt.value ? 'text-[#1A1A1A]' : 'text-[#6A6A6A]'}`}
                      style={{ letterSpacing: '0.1em' }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-[#9A9A9A] text-xs mb-8">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#9A9A9A] text-sm mb-2">No products found</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCollection('all');
                router.push(pathname);
              }}
              className="text-[#1A1A1A] text-xs uppercase tracking-widest underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <AnimatePresence>
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
