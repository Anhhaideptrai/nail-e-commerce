import { useState } from 'react';
import {  useRouter } from 'next/navigation';
import Link from 'next/link';
import { Minus, Plus, X, ArrowRight, Tag, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { state, dispatch, cartCount, subtotal, discountAmount, total, applyDiscount } = useCart();
  const router = useRouter();
  const [discountInput, setDiscountInput] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [discountSuccess, setDiscountSuccess] = useState('');

  const handleApplyDiscount = () => {
    const success = applyDiscount(discountInput);
    if (success) {
      setDiscountSuccess(`Code "${discountInput.toUpperCase()}" applied!`);
      setDiscountError('');
    } else {
      setDiscountError('Invalid discount code. Try LUNELLE10, WELCOME15, or EU20');
      setDiscountSuccess('');
    }
  };

  const freeShippingThreshold = 50;
  const needsForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (cartCount === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <ShoppingBag className="size-12 text-[#D0D0D0] mx-auto mb-6" />
          <p className="text-[#9A9A9A] uppercase tracking-[0.2em] text-xs mb-3" style={{ letterSpacing: '0.2em' }}>Your Bag</p>
          <h1 className="text-[#1A1A1A] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.8rem' }}>
            Your bag is empty
          </h1>
          <p className="text-[#8A8A8A] text-sm mb-8">Discover our luxury press-on nail collections.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-[#333] transition-colors"
            style={{ letterSpacing: '0.15em' }}
          >
            Shop Now <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#9A9A9A] uppercase tracking-[0.2em] text-xs mb-2" style={{ letterSpacing: '0.2em' }}>Your Bag</p>
          <h1 className="text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
            Shopping Bag ({cartCount})
          </h1>
        </div>

        {/* Free shipping progress */}
        {needsForFreeShipping > 0 && (
          <div className="bg-[#F8F8F8] border border-[#E8E8E8] px-5 py-4 mb-8">
            <p className="text-[#5A5A5A] text-xs text-center">
              Add <strong>€{needsForFreeShipping.toFixed(2)}</strong> more to your bag for <strong>free shipping</strong>
            </p>
            <div className="mt-3 h-0.5 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A1A1A] transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}
        {needsForFreeShipping === 0 && (
          <div className="bg-[#F5F5F5] border border-[#E8E8E8] px-5 py-3 mb-8 text-center">
            <p className="text-[#4A7A5A] text-xs">✓ You qualify for free shipping!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-0">
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-3 border-b border-[#E0E0E0] text-[#9A9A9A] text-xs uppercase tracking-widest" style={{ letterSpacing: '0.1em' }}>
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
              <span />
            </div>

            <AnimatePresence>
              {state.items.map((item, idx) => {
                const price = item.product.salePrice ?? item.product.price;
                const key = `${item.product.id}-${item.size}-${item.shape}-${item.length}`;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center py-6 border-b border-[#F0F0F0]"
                  >
                    {/* Product info */}
                    <div className="flex gap-4 items-start">
                      <div className="size-20 sm:size-24 flex-shrink-0 bg-[#F5F5F5] overflow-hidden">
                        <ImageWithFallback
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link href={`/products/${item.product.id}`} className="text-[#1A1A1A] hover:opacity-70 transition-opacity" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '1rem' }}>
                          {item.product.name}
                        </Link>
                        <p className="text-[#9A9A9A] text-xs mt-1">{item.size} · {item.shape} · {item.length}</p>
                        <p className="text-[#1A1A1A] text-sm mt-2 sm:hidden">€{(price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center sm:justify-center">
                      <div className="flex items-center border border-[#E0E0E0]">
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.product.id, size: item.size, shape: item.shape, length: item.length, quantity: item.quantity - 1 } })}
                          className="px-2.5 py-2 hover:bg-[#F5F5F5] transition-colors"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="px-3 text-sm text-[#1A1A1A] min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.product.id, size: item.size, shape: item.shape, length: item.length, quantity: item.quantity + 1 } })}
                          className="px-2.5 py-2 hover:bg-[#F5F5F5] transition-colors"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="hidden sm:block text-right text-[#1A1A1A] text-sm">
                      €{(price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { productId: item.product.id, size: item.size, shape: item.shape, length: item.length } })}
                      className="text-[#C0C0C0] hover:text-[#1A1A1A] transition-colors self-start sm:self-center"
                    >
                      <X className="size-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F8F8F8] p-6 sticky top-24">
              <h2 className="text-[#1A1A1A] mb-6 uppercase tracking-widest text-xs" style={{ letterSpacing: '0.15em' }}>
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6A6A6A]">Subtotal</span>
                  <span className="text-[#1A1A1A]">€{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6A6A6A]">Discount ({state.discountCode})</span>
                    <span className="text-[#4A7A5A]">−€{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-[#6A6A6A]">Shipping</span>
                  <span className="text-[#1A1A1A]">{subtotal >= 50 ? 'Free' : 'Calculated at checkout'}</span>
                </div>
                <div className="border-t border-[#E0E0E0] pt-3 flex justify-between">
                  <span className="text-[#1A1A1A] text-sm uppercase tracking-widest" style={{ letterSpacing: '0.1em' }}>Total</span>
                  <span className="text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '1.2rem' }}>
                    €{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Discount code */}
              {!state.discountCode ? (
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#9A9A9A]" />
                      <input
                        value={discountInput}
                        onChange={e => setDiscountInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleApplyDiscount()}
                        placeholder="Discount code"
                        className="w-full pl-9 pr-3 py-2.5 border border-[#E0E0E0] bg-white text-xs text-[#1A1A1A] placeholder:text-[#9A9A9A] outline-none focus:border-[#C0C0C0] transition-colors"
                      />
                    </div>
                    <button
                      onClick={handleApplyDiscount}
                      className="px-4 py-2.5 border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      Apply
                    </button>
                  </div>
                  {discountError && <p className="text-red-500 text-xs mt-1.5">{discountError}</p>}
                </div>
              ) : (
                <div className="mb-6 flex items-center justify-between bg-white border border-[#4A7A5A]/30 px-4 py-3">
                  <span className="text-[#4A7A5A] text-xs">✓ {state.discountCode} applied</span>
                  <button
                    onClick={() => { dispatch({ type: 'REMOVE_DISCOUNT' }); setDiscountSuccess(''); }}
                    className="text-[#9A9A9A] hover:text-[#1A1A1A]"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              )}

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-[#1A1A1A] text-white py-4 text-xs uppercase tracking-widest hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
                style={{ letterSpacing: '0.15em' }}
              >
                Proceed to Checkout <ArrowRight className="size-4" />
              </button>

              <p className="text-[#9A9A9A] text-xs text-center mt-4">
                Secure checkout via PayPal, Visa & Mastercard
              </p>

              {/* Payment icons */}
              <div className="flex items-center justify-center gap-3 mt-3">
                {['Visa', 'Mastercard', 'PayPal'].map(pm => (
                  <span key={pm} className="text-[#9A9A9A] text-[10px] border border-[#E0E0E0] px-2 py-1 bg-white">
                    {pm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
