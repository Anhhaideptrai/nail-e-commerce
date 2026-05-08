'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  MapPin,
  CreditCard,
} from 'lucide-react';

const SHOP_LINKS = [
  { label: 'All Products', href: '/products' },
  {
    label: 'French & Classic',
    href: '/products?collection=french-classic',
  },
  {
    label: 'Glitter & Metallic',
    href: '/products?collection=glitter-metallic',
  },
  {
    label: 'Nail Art',
    href: '/products?collection=nail-art',
  },
  {
    label: 'Solid Colors',
    href: '/products?collection=solid-colors',
  },
  { label: 'Wholesale', href: '/wholesale' },
];

const INFO_LINKS = [
  { label: 'About Lunelle', href: '/#about' },
  { label: 'How To Apply', href: '/#how-to' },
  { label: 'Size Guide', href: '/#size-guide' },
  { label: 'Track Your Order', href: '/order-tracking' },
  { label: 'FAQ', href: '/#faq' },
];

const POLICY_LINKS = [
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Returns & Exchanges', href: '/returns' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
];

const SOCIALS = [
  {
    icon: Mail,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  {
    icon: Mail,
    href: 'https://facebook.com',
    label: 'Facebook',
  },
  {
    icon: Mail,
    href: 'mailto:hello@lunellenails.com',
    label: 'Email',
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#151515] text-white">
      {/* Newsletter */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#B0B0B0]">
            Exclusive Access
          </p>

          <h2
            className="mb-4 text-3xl"
            style={{
              fontFamily:
                "'Cormorant Garamond', serif",
            }}
          >
            Join the Lunelle Circle
          </h2>

          <p className="mb-8 text-sm leading-relaxed text-[#8A8A8A]">
            Subscribe for early access to new
            collections, exclusive offers, and beauty
            inspiration.
          </p>

          {subscribed ? (
            <div className="text-sm text-[#D6D6D6]">
              ✦ Thank you for joining us. A welcome
              gift awaits in your inbox.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Your email address"
                className="flex-1 border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#5A5A5A] focus:border-white/40"
              />

              <button
                type="submit"
                className="bg-white px-7 py-3 text-xs uppercase tracking-[0.15em] text-[#1A1A1A] transition-colors hover:bg-[#E8E8E8]"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo />

            <p className="mb-6 text-sm leading-relaxed text-[#707070]">
              Handcrafted luxury press-on nails,
              shipped worldwide. Made with love,
              worn with confidence.
            </p>

            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="text-[#707070] transition-colors hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterLinks
            title="Shop"
            links={SHOP_LINKS}
          />

          <FooterLinks
            title="Information"
            links={[
              ...INFO_LINKS,
              {
                label: 'Contact Us',
                href: 'mailto:hello@lunellenails.com',
              },
            ]}
          />

          <div>
            <FooterLinks
              title="Policies"
              links={POLICY_LINKS}
            />

            <div className="mt-8 flex gap-2 text-xs leading-relaxed text-[#707070]">
              <MapPin className="mt-0.5 size-3 flex-shrink-0" />

              <div>
                Ships worldwide from Vietnam
                <br />
                EU delivery 7–14 business days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="border-t border-white/10 px-4 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[#5A5A5A]">
            © 2026 Lunelle Nails. All rights
            reserved.
          </p>

          <div className="flex items-center gap-3 text-[#5A5A5A]">
            <CreditCard className="size-4" />

            {['Visa', 'Mastercard', 'PayPal'].map(
              (item) => (
                <span
                  key={item}
                  className="text-xs"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </footer>
  );
}

function Logo() {
  return (
    <h2
      className="mb-4 text-[1.35rem] font-semibold tracking-[0.25em]"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      LUNELLE
    </h2>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-xs uppercase tracking-[0.15em] text-white">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => {
          const isExternal =
            link.href.startsWith('mailto:');

          return (
            <li key={link.label}>
              {isExternal ? (
                <a
                  href={link.href}
                  className="text-sm text-[#707070] transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm text-[#707070] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}