'use client';

import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/sidebar';
import AppHeader from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/auth/protected-route';
import { Lato, Fira_Code } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isDashboardPage = pathname.startsWith('/dashboard');

  return (
    <html lang="en" className={`${lato.variable} ${firaCode.variable} h-full`}>
      <head>
        <title>Evergreen Events</title>
        <meta name="description" content="Manage sustainable events with Evergreen Events." />
      </head>
      <body className="font-sans antialiased h-full bg-background">
        {isAuthPage || !isDashboardPage ? (
          children
        ) : (
          <ProtectedRoute>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <AppHeader />
                {children}
              </SidebarInset>
            </SidebarProvider>
          </ProtectedRoute>
        )}
        <Toaster />
      </body>
    </html>
  );
}
