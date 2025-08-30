'use client';

import Image from 'next/image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CircleUser, Home, Settings, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

function getTitleFromPathname(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname === '/add-food') return 'Add Food Listing';
  if (pathname === '/waste-prediction') return 'Waste Prediction';
  if (pathname === '/route-optimization') return 'Route Optimization';
  if (pathname === '/sponsorship') return 'Sponsorship';
  return 'WasteNoFood';
}

export default function Header() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-8">
      <SidebarTrigger className="md:hidden" />
      <h1 className="font-headline text-xl md:text-2xl font-semibold flex-1">
        {title}
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage asChild>
                <Image src="https://picsum.photos/40/40" alt="@volunteer" data-ai-hint="person smiling" width={40} height={40} />
            </AvatarImage>
            <AvatarFallback>
              <CircleUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Home className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
