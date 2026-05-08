'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
} from 'lucide-react';

import { useCart } from '../../context/CartContext';
import { COLLECTIONS } from '@/MOCK_DATAS/products';
import { LanguageSwitcher } from '../shared/LanguageSwitcher';

const NAV_LINKS = [
  { label: 'Shop', href: '/products' },
  { label: 'Collections', href: '/products', dropdown: true },
  { label: 'Wholesale', href: '/wholesales' },
  { label: 'Track Order', href: '/order/tracking' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    router.push(
      `/products?search=${encodeURIComponent(searchQuery)}`
    );
  };

  const textClass = isTransparent
    ? 'text-white'
    : 'text-[#1A1A1A]';

  const headerClass = isTransparent
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-md border-b border-[#E8E8E8]';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClass}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link
            href="/"
            className={`text-sm uppercase tracking-[0.25em] transition-colors duration-300 ${textClass}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: '1.25rem',
            }}
          >
            SILVER14 NAIL
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="group relative"
                >
                  <button
                    className={`flex items-center gap-1 text-xs uppercase tracking-[0.12em] transition-opacity hover:opacity-70 ${textClass}`}
                  >
                    {link.label}
                    <ChevronDown className="size-3" />
                  </button>

                  <div className="pointer-events-none absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="rounded-sm border border-[#E5E5E5] bg-white py-2 shadow-lg">
                      {COLLECTIONS.map((col) => (
                        <Link
                          key={col.id}
                          href={
                            col.id === 'all'
                              ? '/products'
                              : `/products?collection=${col.id}`
                          }
                          className="block px-5 py-2.5 text-xs uppercase tracking-[0.1em] text-[#1A1A1A] transition-colors hover:bg-[#F8F8F8]"
                        >
                          {col.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.12em] transition-opacity hover:opacity-70 ${textClass}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <div
              className={`hidden md:block ${isTransparent
                ? '[&_button]:text-white'
                : ''
                }`}
            >
              <LanguageSwitcher />
            </div>

            <button
              onClick={() =>
                setSearchOpen((prev) => !prev)
              }
              className={`p-1 transition-opacity hover:opacity-70 ${textClass}`}
            >
              <Search className="size-[18px]" />
            </button>

            <Link
              href="/account"
              className={`hidden p-1 transition-opacity hover:opacity-70 md:flex ${textClass}`}
            >
              <User className="size-[18px]" />
            </Link>

            <Link
              href="/cart"
              className={`relative p-1 transition-opacity hover:opacity-70 ${textClass}`}
            >
              <ShoppingBag className="size-[18px]" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-black text-[9px] text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() =>
                setMobileOpen((prev) => !prev)
              }
              className={`p-1 transition-opacity hover:opacity-70 md:hidden ${textClass}`}
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search */}
        {searchOpen && (
          <div className="border-t border-[#E8E8E8] py-4">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-3"
              >
                <Search
                  className={`size-4 ${isTransparent
                    ? 'text-white'
                    : 'text-[#9A9A9A]'
                    }`}
                />

                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search products..."
                  className={`flex-1 bg-transparent text-sm outline-none ${isTransparent
                    ? 'text-white placeholder:text-white/60'
                    : 'text-[#1A1A1A] placeholder:text-[#9A9A9A]'
                    }`}
                />

                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                >
                  <X
                    className={`size-4 ${isTransparent
                      ? 'text-white'
                      : 'text-[#9A9A9A]'
                      }`}
                  />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="absolute right-0 top-0 flex h-full w-72 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E8E8E8] px-6 py-5">
              <span
                className="text-[1.1rem] uppercase tracking-[0.2em]"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                  fontWeight: 600,
                }}
              >
                LUNELLE
              </span>

              <button
                onClick={() => setMobileOpen(false)}
              >
                <X className="size-5 text-[#1A1A1A]" />
              </button>
            </div>

            <nav className="flex-1 space-y-6 overflow-y-auto px-6 py-8">
              <LinkItem href="/products">
                Shop All
              </LinkItem>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.15em] text-[#9A9A9A]">
                  Collections
                </p>

                {COLLECTIONS.slice(1).map((col) => (
                  <Link
                    key={col.id}
                    href={`/products?collection=${col.id}`}
                    className="block pl-3 text-sm text-[#1A1A1A]"
                  >
                    {col.label}
                  </Link>
                ))}
              </div>

              <LinkItem href="/wholesale">
                Wholesale
              </LinkItem>

              <LinkItem href="/order-tracking">
                Track Order
              </LinkItem>

              <LinkItem href="/cart">
                Cart {cartCount > 0 && `(${cartCount})`}
              </LinkItem>

              <div className="border-t border-[#E8E8E8] pt-4">
                <LanguageSwitcher />
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

function LinkItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block text-xs uppercase tracking-[0.15em] text-[#1A1A1A]"
    >
      {children}
    </Link>
  );
}