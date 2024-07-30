import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'ProjeX',
  description: 'Project Management App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
