'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  sidebarMenuButtonVariants,
} from '@/components/ui/sidebar';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutGrid,
  PlusCircle,
  BrainCircuit,
  Map,
  Settings,
  HelpCircle,
  Award,
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    href: '/dashboard',
    icon: LayoutGrid,
    label: 'Dashboard',
  },
  {
    href: '/add-food',
    icon: PlusCircle,
    label: 'Add Food',
  },
  {
    href: '/waste-prediction',
    icon: BrainCircuit,
    label: 'Waste Prediction',
  },
  {
    href: '/route-optimization',
    icon: Map,
    label: 'Optimize Route',
  },
  {
    href: '/sponsorship',
    icon: Award,
    label: 'Sponsorship',
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="font-headline text-2xl font-semibold text-primary">
            WasteNoFood
          </span>
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link
              href={item.href}
              className={cn(sidebarMenuButtonVariants())}
              data-active={pathname === item.href}
            >
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="#" className={cn(sidebarMenuButtonVariants())}>
              <HelpCircle />
              <span>Help & Support</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="#" className={cn(sidebarMenuButtonVariants())}>
              <Settings />
              <span>Settings</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

    