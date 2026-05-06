import './global.css';

export const metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Nail Atelier',
    template: '%s | Nail Atelier',
  },
  description:
    'Luxury handmade press-on nail sets with custom sizing, premium finishes, and international checkout.',
  openGraph: {
    title: 'Nail Atelier',
    description:
      'Luxury handmade press-on nail sets with custom sizing and international checkout.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
