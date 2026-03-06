import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Rocky Tic Tac Toe',
  description: 'The ultimate Tic Tac Toe experience with e-commerce shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-rocky-dark text-white">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
