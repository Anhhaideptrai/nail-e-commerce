'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CreditCard, Shield, ArrowLeft, Check } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useCart } from '@/context/CartContext';
import {
  ContactDetails,
  PaymentMethod,
  ShippingDetails,
  createMockOrder,
  generateOrderId,
  getShippingCost,
} from '@/features/checkout/checkout.utils';

type Step = 'contact' | 'shipping' | 'payment' | 'confirmation';

const COUNTRIES = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
  'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
  'United Kingdom', 'United States', 'Australia', 'Canada', 'Switzerland',
  'Norway', 'Singapore', 'Japan', 'Other',
];

function StepIndicator({ current }: { current: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: 'contact', label: 'Contact' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
  ];
  const idx = steps.findIndex(s => s.key === current);
  if (current === 'confirmation') return null;
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, i) => (
        <div key={step.key} className="flex items-center">
          <div className={`flex flex-col items-center gap-1.5 ${i <= idx ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`size-7 rounded-full flex items-center justify-center border text-xs transition-all ${i < idx ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' : i === idx ? 'border-[#1A1A1A] bg-white text-[#1A1A1A]' : 'border-[#D0D0D0] text-[#9A9A9A]'}`}>
              {i < idx ? <Check className="size-3" /> : i + 1}
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#6A6A6A]" style={{ letterSpacing: '0.1em' }}>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 sm:w-24 h-px mx-1 mb-5 ${i < idx ? 'bg-[#1A1A1A]' : 'bg-[#E0E0E0]'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CheckoutPage() {
  const { state, subtotal, discountAmount, total, dispatch, addOrder } = useCart();
  const params = useParams<{ lng?: string }>();
  const lng = params.lng ?? 'en';
  const localizedHref = (href: string) => `/${lng}${href}`;
  const [step, setStep] = useState<Step>('contact');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [checkoutType, setCheckoutType] = useState<'guest' | 'registered'>('guest');

  const [contact, setContact] = useState<ContactDetails>({ email: '', phone: '', createAccount: false, password: '' });
  const [shipping, setShipping] = useState<ShippingDetails>({ firstName: '', lastName: '', address: '', apartment: '', city: '', postalCode: '', country: 'Germany', notes: '' });
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });

  const shipping_cost = getShippingCost(subtotal);
  const finalTotal = total + shipping_cost;

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    const id = generateOrderId();
    setOrderId(id);
    const order = createMockOrder({
      id,
      contact,
      shipping,
      payment,
      items: state.items,
      subtotal,
      discount: discountAmount,
      total: finalTotal,
    });
    addOrder(order);
    dispatch({ type: 'CLEAR_CART' });
    setIsProcessing(false);
    setStep('confirmation');
  };

  const InputField = ({ label, value, onChange, type = 'text', placeholder = '', required = false, autoComplete = '' }: {
    label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; autoComplete?: string;
  }) => (
    <div>
      <label className="block text-[#6A6A6A] text-xs uppercase tracking-widest mb-1.5" style={{ letterSpacing: '0.1em' }}>
        {label} {required && <span className="text-[#C0C0C0]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#1A1A1A] bg-white placeholder:text-[#B0B0B0] outline-none focus:border-[#9A9A9A] transition-colors"
      />
    </div>
  );

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={`/${lng}`} className="text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '1.5rem', letterSpacing: '0.25em' }}>
            LUNELLE
          </Link>
        </div>

        {step !== 'confirmation' && <StepIndicator current={step} />}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          {/* Main Form */}
          <div>
            {/* Contact */}
            <AnimatePresence mode="wait">
              {step === 'contact' && (
                <motion.div key="contact" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white p-6 sm:p-8">
                    <h2 className="text-[#1A1A1A] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.4rem' }}>
                      Contact Information
                    </h2>

                    {/* Guest vs Registered */}
                    <div className="flex gap-3 mb-8">
                      {(['guest', 'registered'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => setCheckoutType(type)}
                          className={`flex-1 py-3 border text-xs uppercase tracking-widest transition-all ${checkoutType === type ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white' : 'border-[#E0E0E0] text-[#6A6A6A] hover:border-[#9A9A9A]'}`}
                          style={{ letterSpacing: '0.1em' }}
                        >
                          {type === 'guest' ? 'Guest Checkout' : 'Sign In / Register'}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <InputField label="Email Address" value={contact.email} onChange={v => setContact(p => ({ ...p, email: v }))} type="email" required autoComplete="email" />
                      <InputField label="Phone Number" value={contact.phone} onChange={v => setContact(p => ({ ...p, phone: v }))} type="tel" placeholder="+49 123 456 7890" required autoComplete="tel" />
                      {checkoutType === 'guest' && (
                        <div className="flex items-start gap-3 pt-2">
                          <input
                            type="checkbox"
                            id="createAccount"
                            checked={contact.createAccount}
                            onChange={e => setContact(p => ({ ...p, createAccount: e.target.checked }))}
                            className="mt-0.5 accent-[#1A1A1A]"
                          />
                          <label htmlFor="createAccount" className="text-[#6A6A6A] text-sm cursor-pointer">
                            Create an account to track orders and save your details for faster checkout
                          </label>
                        </div>
                      )}
                      {(checkoutType === 'registered' || contact.createAccount) && (
                        <InputField label="Password" value={contact.password} onChange={v => setContact(p => ({ ...p, password: v }))} type="password" required />
                      )}
                    </div>

                    <p className="text-[#9A9A9A] text-xs mt-5 p-3 bg-[#F8F8F8]">
                      💡 After ordering as a guest, use your phone number and order ID to track your order status.
                    </p>

                    <button
                      onClick={() => contact.email && contact.phone && setStep('shipping')}
                      disabled={!contact.email || !contact.phone}
                      className="mt-8 w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-4 text-xs uppercase tracking-widest hover:bg-[#333] transition-colors disabled:bg-[#D0D0D0] disabled:cursor-not-allowed"
                      style={{ letterSpacing: '0.15em' }}
                    >
                      Continue to Shipping <ChevronRight className="size-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Shipping */}
              {step === 'shipping' && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white p-6 sm:p-8">
                    <button onClick={() => setStep('contact')} className="flex items-center gap-1.5 text-[#9A9A9A] text-xs mb-6 hover:text-[#1A1A1A] transition-colors">
                      <ArrowLeft className="size-3.5" /> Back to Contact
                    </button>
                    <h2 className="text-[#1A1A1A] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.4rem' }}>
                      Shipping Address
                    </h2>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="First Name" value={shipping.firstName} onChange={v => setShipping(p => ({ ...p, firstName: v }))} required autoComplete="given-name" />
                        <InputField label="Last Name" value={shipping.lastName} onChange={v => setShipping(p => ({ ...p, lastName: v }))} required autoComplete="family-name" />
                      </div>
                      <InputField label="Address" value={shipping.address} onChange={v => setShipping(p => ({ ...p, address: v }))} required autoComplete="street-address" />
                      <InputField label="Apartment, suite, etc. (optional)" value={shipping.apartment} onChange={v => setShipping(p => ({ ...p, apartment: v }))} />
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="City" value={shipping.city} onChange={v => setShipping(p => ({ ...p, city: v }))} required autoComplete="address-level2" />
                        <InputField label="Postal Code" value={shipping.postalCode} onChange={v => setShipping(p => ({ ...p, postalCode: v }))} required autoComplete="postal-code" />
                      </div>
                      <div>
                        <label className="block text-[#6A6A6A] text-xs uppercase tracking-widest mb-1.5" style={{ letterSpacing: '0.1em' }}>
                          Country <span className="text-[#C0C0C0]">*</span>
                        </label>
                        <select
                          value={shipping.country}
                          onChange={e => setShipping(p => ({ ...p, country: e.target.value }))}
                          className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#1A1A1A] bg-white outline-none focus:border-[#9A9A9A] transition-colors appearance-none"
                        >
                          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#6A6A6A] text-xs uppercase tracking-widest mb-1.5" style={{ letterSpacing: '0.1em' }}>
                          Order Notes (optional)
                        </label>
                        <textarea
                          value={shipping.notes}
                          onChange={e => setShipping(p => ({ ...p, notes: e.target.value }))}
                          placeholder="Special instructions, custom size measurements..."
                          rows={3}
                          className="w-full border border-[#E0E0E0] px-4 py-3 text-sm text-[#1A1A1A] bg-white placeholder:text-[#B0B0B0] outline-none focus:border-[#9A9A9A] transition-colors resize-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => shipping.firstName && shipping.lastName && shipping.address && shipping.city && setStep('payment')}
                      disabled={!shipping.firstName || !shipping.lastName || !shipping.address || !shipping.city}
                      className="mt-8 w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-4 text-xs uppercase tracking-widest hover:bg-[#333] transition-colors disabled:bg-[#D0D0D0] disabled:cursor-not-allowed"
                      style={{ letterSpacing: '0.15em' }}
                    >
                      Continue to Payment <ChevronRight className="size-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Payment */}
              {step === 'payment' && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="bg-white p-6 sm:p-8">
                    <button onClick={() => setStep('shipping')} className="flex items-center gap-1.5 text-[#9A9A9A] text-xs mb-6 hover:text-[#1A1A1A] transition-colors">
                      <ArrowLeft className="size-3.5" /> Back to Shipping
                    </button>
                    <h2 className="text-[#1A1A1A] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.4rem' }}>
                      Payment Method
                    </h2>

                    <div className="space-y-3 mb-6">
                      {(['card', 'paypal'] as const).map(method => (
                        <button
                          key={method}
                          onClick={() => setPayment(method)}
                          className={`w-full flex items-center gap-4 p-4 border transition-all ${payment === method ? 'border-[#1A1A1A] bg-[#FAFAFA]' : 'border-[#E0E0E0] hover:border-[#C0C0C0]'}`}
                        >
                          <div className={`size-4 rounded-full border-2 flex items-center justify-center ${payment === method ? 'border-[#1A1A1A]' : 'border-[#D0D0D0]'}`}>
                            {payment === method && <div className="size-2 rounded-full bg-[#1A1A1A]" />}
                          </div>
                          <div className="text-left">
                            <p className="text-[#1A1A1A] text-sm">{method === 'card' ? 'Credit / Debit Card' : 'PayPal'}</p>
                            <p className="text-[#9A9A9A] text-xs">{method === 'card' ? 'Visa, Mastercard accepted' : 'Pay securely with your PayPal account'}</p>
                          </div>
                          <div className="ml-auto flex gap-1.5">
                            {method === 'card' && ['VISA', 'MC'].map(b => (
                              <span key={b} className="text-[10px] border border-[#E0E0E0] px-1.5 py-0.5 text-[#6A6A6A]">{b}</span>
                            ))}
                            {method === 'paypal' && <span className="text-[10px] border border-[#E0E0E0] px-1.5 py-0.5 text-[#0070ba]">PayPal</span>}
                          </div>
                        </button>
                      ))}
                    </div>

                    {payment === 'card' && (
                      <div className="space-y-4 p-4 bg-[#F8F8F8] mb-6">
                        <InputField label="Card Number" value={card.number} onChange={v => setCard(p => ({ ...p, number: v }))} placeholder="1234 5678 9012 3456" autoComplete="cc-number" />
                        <InputField label="Cardholder Name" value={card.name} onChange={v => setCard(p => ({ ...p, name: v }))} placeholder="As shown on card" autoComplete="cc-name" />
                        <div className="grid grid-cols-2 gap-4">
                          <InputField label="Expiry Date" value={card.expiry} onChange={v => setCard(p => ({ ...p, expiry: v }))} placeholder="MM / YY" autoComplete="cc-exp" />
                          <InputField label="CVC" value={card.cvc} onChange={v => setCard(p => ({ ...p, cvc: v }))} placeholder="3 digits" autoComplete="cc-csc" />
                        </div>
                      </div>
                    )}

                    {payment === 'paypal' && (
                      <div className="p-4 bg-[#F8F8F8] mb-6 text-center">
                        <p className="text-[#9A9A9A] text-sm">You will be redirected to PayPal to complete your payment securely.</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[#9A9A9A] text-xs mb-6">
                      <Shield className="size-3.5 text-[#4A7A5A]" />
                      <span>Your payment information is encrypted and secure. We never store card details.</span>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-4 text-xs uppercase tracking-widest hover:bg-[#333] transition-colors disabled:bg-[#6A6A6A]"
                      style={{ letterSpacing: '0.15em' }}
                    >
                      {isProcessing ? (
                        <>
                          <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="size-4" />
                          Pay ${finalTotal.toFixed(2)}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Confirmation */}
              {step === 'confirmation' && (
                <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                  <div className="bg-white p-8 sm:p-12 text-center">
                    <div className="size-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="size-7 text-[#4A7A5A]" />
                    </div>
                    <p className="text-[#9A9A9A] uppercase tracking-[0.2em] text-xs mb-3" style={{ letterSpacing: '0.2em' }}>Order Confirmed</p>
                    <h2 className="text-[#1A1A1A] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                      Thank You, {shipping.firstName}!
                    </h2>
                    <p className="text-[#6A6A6A] text-sm mb-8 leading-relaxed max-w-md mx-auto">
                      Your order has been received and our artisans will begin crafting your nails shortly.
                      A confirmation has been sent to <strong>{contact.email}</strong>.
                    </p>

                    <div className="bg-[#F8F8F8] p-6 mb-8 max-w-xs mx-auto">
                      <p className="text-[#9A9A9A] text-xs uppercase tracking-widest mb-2" style={{ letterSpacing: '0.12em' }}>Your Order ID</p>
                      <p className="text-[#1A1A1A] text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                        {orderId}
                      </p>
                      <p className="text-[#9A9A9A] text-xs mt-2">Save this to track your order</p>
                    </div>

                    <p className="text-[#9A9A9A] text-xs mb-8 p-3 bg-[#F8F8F8] max-w-sm mx-auto">
                      📱 You can track your order status using your phone number ({contact.phone}) and order ID above.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        href={localizedHref('/order/tracking')}
                        className="inline-flex items-center justify-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3.5 text-xs uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all"
                        style={{ letterSpacing: '0.12em' }}
                      >
                        Track Order
                      </Link>
                      <Link
                        href={localizedHref('/products')}
                        className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white px-8 py-3.5 text-xs uppercase tracking-widest hover:bg-[#333] transition-colors"
                        style={{ letterSpacing: '0.12em' }}
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          {step !== 'confirmation' && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white p-6">
                <h3 className="text-[#1A1A1A] text-xs uppercase tracking-widest mb-5" style={{ letterSpacing: '0.12em' }}>
                  Order Summary
                </h3>
                <div className="space-y-4 mb-5">
                  {state.items.map(item => (
                    <div key={`${item.product.id}-${item.size}-${item.shape}-${item.length}`} className="flex gap-3 items-center">
                      <div className="relative size-14 flex-shrink-0 bg-[#F5F5F5] overflow-hidden">
                        <ImageWithFallback src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1.5 -right-1.5 size-5 bg-[#6A6A6A] text-white text-[9px] rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#1A1A1A] text-xs truncate">{item.product.name}</p>
                        <p className="text-[#9A9A9A] text-[10px]">{item.size} / {item.shape}</p>
                      </div>
                      <p className="text-[#1A1A1A] text-xs flex-shrink-0">
                        ${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#F0F0F0] pt-4 space-y-2">
                  <div className="flex justify-between text-xs text-[#6A6A6A]">
                    <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-[#6A6A6A]">Discount</span>
                      <span className="text-[#4A7A5A]">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-[#6A6A6A]">
                    <span>Shipping</span><span>{shipping_cost === 0 ? 'Free' : `$${shipping_cost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#F0F0F0]">
                    <span className="text-[#1A1A1A] text-xs uppercase tracking-widest" style={{ letterSpacing: '0.1em' }}>Total</span>
                    <span className="text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: '1.1rem' }}>
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
