'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  LayoutDashboard,
  Leaf,
  QrCode,
  Sparkles,
  Store,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/vendors', label: 'Vendors', icon: Store },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { href: '/check-in', label: 'Check-in', icon: QrCode },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 p-2">
          <div className="p-2 bg-primary rounded-lg">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-headline text-xl font-bold text-primary">
            Evergreen
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2">
           <Avatar className="h-9 w-9">
              <AvatarImage src="https://picsum.photos/seed/user/100/100" alt="User avatar" data-ai-hint="user avatar" />
              <AvatarFallback>EV</AvatarFallback>
            </Avatar>
           <div className="flex flex-col text-sm">
             <span className="font-semibold">Event Manager</span>
             <span className="text-muted-foreground text-xs">admin@evergreen.com</span>
           </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
