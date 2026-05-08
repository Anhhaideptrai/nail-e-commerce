'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, Truck, Check, Clock, AlertCircle } from 'lucide-react';
import { useCart, MockOrder } from '@/context/CartContext';

function StatusTimeline({ status }: { status: MockOrder['status'] }) {
  const steps = [
    { key: 'Processing', icon: Clock, label: 'Order Received', desc: 'Your order has been confirmed and is being prepared.' },
    { key: 'Crafting', icon: Package, label: 'Handcrafting', desc: 'Our artisans are handcrafting your nails.' },
    { key: 'Shipped', icon: Truck, label: 'Shipped', desc: 'Your order is on its way to you.' },
    { key: 'Delivered', icon: Check, label: 'Delivered', desc: 'Your order has been delivered. Enjoy!' },
  ];

  const currentIdx = status === 'Processing' ? 0 : status === 'Shipped' ? 2 : status === 'Delivered' ? 3 : 0;

  return (
    <div className="mt-8">
      <div className="relative">
        {/* Line */}
        <div className="absolute top-5 left-5 right-5 h-px bg-[#E5E5E5] hidden sm:block" />
        <div
          className="absolute top-5 left-5 h-px bg-[#1A1A1A] hidden sm:block transition-all duration-700"
          style={{ width: `${(currentIdx / (steps.length - 1)) * (100 - (10 / steps.length))}%` }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isDone = i <= currentIdx;
            const isCurrent = i === currentIdx;
            return (
              <div key={step.key} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-0 sm:text-center">
                <div className={`relative z-10 size-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${isDone ? 'bg-[#1A1A1A] text-white' : 'bg-white border-2 border-[#E5E5E5] text-[#D0D0D0]'} ${isCurrent ? 'ring-4 ring-[#1A1A1A]/10' : ''}`}>
                  <Icon className="size-4" />
                </div>
                <div className="sm:mt-3">
                  <p className={`text-xs uppercase tracking-widest ${isDone ? 'text-[#1A1A1A]' : 'text-[#C0C0C0]'}`} style={{ letterSpacing: '0.1em' }}>
                    {step.label}
                  </p>
                  <p className={`text-xs mt-1 leading-relaxed ${isCurrent ? 'text-[#6A6A6A]' : 'text-[#B0B0B0]'} hidden sm:block`}>
                    {step.desc}
                  </p>
                  {isCurrent && (
                    <p className="text-xs mt-1 leading-relaxed text-[#6A6A6A] sm:hidden">{step.desc}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  const { getOrder } = useCart();
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<MockOrder | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const order = getOrder(orderId.trim(), phone.trim());
    setResult(order);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Header */}
      <div className="text-center py-16 px-4 border-b border-[#E8E8E8]">
        <p className="text-[#9A9A9A] uppercase tracking-[0.2em] text-xs mb-3" style={{ letterSpacing: '0.2em' }}>Order Status</p>
        <h1 className="text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
          Track Your Order
        </h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        {/* Track Form */}
        <form onSubmit={handleTrack} className="bg-white p-6 sm:p-8 mb-8">
          <p className="text-[#6A6A6A] text-sm mb-6 leading-relaxed">
            Enter your Order ID and the phone number used at checkout to view your order status.
          </p>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-[#6A6A6A] text-xs uppercase tracking-widest mb-1.5" style={{ letterSpacing: '0.1em' }}>
                Order ID <span className="text-[#C0C0C0]">*</span>
              </label>
              <input
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                placeholder="e.g. LNL-ABC123-XY"
                required
                className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#1A1A1A] bg-white placeholder:text-[#C0C0C0] outline-none focus:border-[#9A9A9A] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[#6A6A6A] text-xs uppercase tracking-widest mb-1.5" style={{ letterSpacing: '0.1em' }}>
                Phone Number <span className="text-[#C0C0C0]">*</span>
              </label>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone number used at checkout"
                required
                type="tel"
                className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#1A1A1A] bg-white placeholder:text-[#C0C0C0] outline-none focus:border-[#9A9A9A] transition-colors"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-4 text-xs uppercase tracking-widest hover:bg-[#333] transition-colors disabled:bg-[#6A6A6A]"
            style={{ letterSpacing: '0.15em' }}
          >
            {loading ? (
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><Search className="size-4" /> Track Order</>
            )}
          </button>
        </form>

        {/* Results */}
        <AnimatePresence>
          {result === null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white p-6 text-center"
            >
              <AlertCircle className="size-8 text-[#C0C0C0] mx-auto mb-3" />
              <p className="text-[#1A1A1A] text-sm mb-1">Order not found</p>
              <p className="text-[#9A9A9A] text-xs">Please check your Order ID and phone number. If you need assistance, contact us at hello@lunellenails.com</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white p-6 sm:p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[#9A9A9A] text-xs uppercase tracking-widest mb-1" style={{ letterSpacing: '0.1em' }}>Order</p>
                  <p className="text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '1.1rem' }}>
                    {result.id}
                  </p>
                  <p className="text-[#9A9A9A] text-xs mt-1">
                    Placed on {new Date(result.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1.5 uppercase tracking-widest ${result.status === 'Delivered' ? 'bg-[#F0FFF4] text-[#4A7A5A]' : result.status === 'Shipped' ? 'bg-[#F0F0FF] text-[#4A4A9A]' : 'bg-[#F5F5F5] text-[#6A6A6A]'}`} style={{ letterSpacing: '0.1em' }}>
                  {result.status}
                </span>
              </div>

              <StatusTimeline status={result.status} />

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Shipping Address */}
                <div className="bg-[#F8F8F8] p-4">
                  <p className="text-[#1A1A1A] text-xs uppercase tracking-widest mb-3" style={{ letterSpacing: '0.1em' }}>Shipping Address</p>
                  <p className="text-[#5A5A5A] text-sm">
                    {result.shippingAddress.firstName} {result.shippingAddress.lastName}<br />
                    {result.shippingAddress.address}<br />
                    {result.shippingAddress.postalCode} {result.shippingAddress.city}<br />
                    {result.shippingAddress.country}
                  </p>
                </div>

                {/* Order Summary */}
                <div className="bg-[#F8F8F8] p-4">
                  <p className="text-[#1A1A1A] text-xs uppercase tracking-widest mb-3" style={{ letterSpacing: '0.1em' }}>Summary</p>
                  <div className="space-y-1">
                    {result.items.slice(0, 3).map((item, i) => (
                      <p key={i} className="text-[#5A5A5A] text-xs">
                        {item.quantity}× {item.product.name} <span className="text-[#9A9A9A]">({item.size}, {item.shape})</span>
                      </p>
                    ))}
                    {result.items.length > 3 && (
                      <p className="text-[#9A9A9A] text-xs">+{result.items.length - 3} more items</p>
                    )}
                    <div className="border-t border-[#E0E0E0] pt-2 mt-2 flex justify-between">
                      <span className="text-[#6A6A6A] text-xs">Total</span>
                      <span className="text-[#1A1A1A] text-xs">€{result.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-[#9A9A9A] text-xs">
            Need help with your order?{' '}
            <a href="mailto:hello@lunellenails.com" className="text-[#1A1A1A] underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}
