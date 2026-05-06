import './global.css';

export const metadata = {
  title: 'Nail Commerce Admin',
  description: 'CMS and operations dashboard for Nail Commerce.',
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
