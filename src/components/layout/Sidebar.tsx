import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, Package, Users, Settings, BarChart } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items?: SidebarItem[];
  logo?: string;
  collapsed?: boolean;
}

export const Sidebar = ({
  items = [
    { label: 'Dashboard', href: '/', icon: <Home className="h-5 w-5" /> },
    { label: 'Products', href: '/products', icon: <Package className="h-5 w-5" /> },
    { label: 'Customers', href: '/customers', icon: <Users className="h-5 w-5" /> },
    { label: 'Analytics', href: '/analytics', icon: <BarChart className="h-5 w-5" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
  ],
  logo = 'Dashboard',
  collapsed = false,
}: SidebarProps) => {
  const location = useLocation();

  return (
    <aside className={cn(
      'h-screen bg-card border-r flex flex-col transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b">
        <Link to="/" className="font-bold text-xl">
          {collapsed ? logo.charAt(0) : logo}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {item.icon}
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};