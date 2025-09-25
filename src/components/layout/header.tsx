
"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function getPageTitle(pathname: string): string {
  const segment = pathname.split('/').pop();
  if (!segment) return 'Dashboard';
  if (segment === 'check-in') return 'Check-In';
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function AppHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="flex-1 text-xl font-semibold font-headline">{pageTitle}</h1>
      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </header>
  );
}
