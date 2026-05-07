import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ShoppingBag, Search, Menu, X, ChevronDown, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { COLLECTIONS } from '../../data/products';
import { LanguageSwitcher } from '../shared/LanguageSwitcher';

const navLinks = [
  { label: 'Shop', href: '/products' },
  { label: 'Collections', href: '/products', hasDropdown: true },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Track Order', href: '/order-tracking' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  const navBg = isHome && !isScrolled ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md border-b border-[#E8E8E8]';
  const textColor = isHome && !isScrolled ? 'text-white' : 'text-[#1A1A1A]';
  const logoColor = isHome && !isScrolled ? 'text-white' : 'text-[#1A1A1A]';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className={`flex-shrink-0 tracking-[0.3em] uppercase text-sm ${logoColor} transition-colors duration-300`}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '1.25rem', letterSpacing: '0.25em' }}
            >
              LUNELLE
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                link.hasDropdown ? (
                  <div key={link.label} className="relative group">
                    <button
                      className={`flex items-center gap-1 tracking-widest uppercase text-xs ${textColor} transition-colors duration-300 hover:opacity-70`}
                      style={{ letterSpacing: '0.12em' }}
                      onMouseEnter={() => setCollectionsOpen(true)}
                      onMouseLeave={() => setCollectionsOpen(false)}
                    >
                      {link.label}
                      <ChevronDown className="size-3" />
                    </button>
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${collectionsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}
                      onMouseEnter={() => setCollectionsOpen(true)}
                      onMouseLeave={() => setCollectionsOpen(false)}
                    >
                      <div className="bg-white border border-[#E5E5E5] shadow-lg rounded-sm py-2 min-w-[200px]">
                        {COLLECTIONS.map(col => (
                          <Link
                            key={col.id}
                            to={col.id === 'all' ? '/products' : `/products?collection=${col.id}`}
                            className="block px-5 py-2.5 text-[#1A1A1A] text-xs tracking-widest uppercase hover:bg-[#F8F8F8] transition-colors"
                            style={{ letterSpacing: '0.1em' }}
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
                    to={link.href}
                    className={`tracking-widest uppercase text-xs ${textColor} transition-colors duration-300 hover:opacity-70`}
                    style={{ letterSpacing: '0.12em' }}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className={`hidden md:block ${textColor === 'text-white' ? '[&_button]:text-white [&_button:hover]:text-white/70' : ''}`}>
                <LanguageSwitcher />
              </div>
              <button
                className={`${textColor} transition-all hover:opacity-70 p-1`}
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="size-[18px]" />
              </button>
              <Link
                to="/account"
                className={`hidden md:flex ${textColor} transition-all hover:opacity-70 p-1`}
              >
                <User className="size-[18px]" />
              </Link>
              <Link to="/cart" className={`relative ${textColor} transition-all hover:opacity-70 p-1`}>
                <ShoppingBag className="size-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-white text-[9px] rounded-full size-4 flex items-center justify-center font-medium">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
              <button
                className={`md:hidden ${textColor} transition-all hover:opacity-70 p-1`}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="border-t border-[#E8E8E8] py-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="flex items-center gap-3"
              >
                <Search className={`size-4 ${isHome && !isScrolled ? 'text-white' : 'text-[#9A9A9A]'}`} />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className={`flex-1 bg-transparent outline-none text-sm tracking-wide ${isHome && !isScrolled ? 'text-white placeholder:text-white/60' : 'text-[#1A1A1A] placeholder:text-[#9A9A9A]'}`}
                />
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <X className={`size-4 ${isHome && !isScrolled ? 'text-white' : 'text-[#9A9A9A]'}`} />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E8E8]">
              <span className="tracking-[0.2em] uppercase text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '1.1rem' }}>
                LUNELLE
              </span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="size-5 text-[#1A1A1A]" />
              </button>
            </div>
            <nav className="flex-1 px-6 py-8 space-y-6 overflow-y-auto">
              <Link to="/products" className="block text-[#1A1A1A] uppercase tracking-widest text-xs" style={{ letterSpacing: '0.15em' }}>
                Shop All
              </Link>
              <div className="space-y-3">
                <p className="text-[#9A9A9A] uppercase text-xs tracking-widest" style={{ letterSpacing: '0.15em' }}>Collections</p>
                {COLLECTIONS.slice(1).map(col => (
                  <Link
                    key={col.id}
                    to={`/products?collection=${col.id}`}
                    className="block text-[#1A1A1A] text-sm pl-3"
                  >
                    {col.label}
                  </Link>
                ))}
              </div>
              <Link to="/wholesale" className="block text-[#1A1A1A] uppercase tracking-widest text-xs" style={{ letterSpacing: '0.15em' }}>
                Wholesale
              </Link>
              <Link to="/order-tracking" className="block text-[#1A1A1A] uppercase tracking-widest text-xs" style={{ letterSpacing: '0.15em' }}>
                Track Order
              </Link>
              <Link to="/cart" className="block text-[#1A1A1A] uppercase tracking-widest text-xs" style={{ letterSpacing: '0.15em' }}>
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
              <div className="pt-4 border-t border-[#E8E8E8]">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
