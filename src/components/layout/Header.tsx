import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  logo?: string;
  navLinks?: { label: string; href: string }[];
  showSearch?: boolean;
  showCart?: boolean;
  showUser?: boolean;
  cartCount?: number;
}

export const Header = ({ 
  logo = 'Brand', 
  navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  showSearch = true,
  showCart = true,
  showUser = true,
  cartCount = 0,
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">{logo}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {showSearch && (
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Search className="h-5 w-5" />
              </button>
            )}
            
            {showCart && (
              <Link to="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-primary text-primary-foreground rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            
            {showUser && (
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <User className="h-5 w-5" />
              </button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};