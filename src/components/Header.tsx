import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigation = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Mixtures', href: '/category/mixtures' },
    { label: 'Sweets', href: '/category/sweets' },
    { label: 'Gift Packs', href: '/category/gifts' },
    { label: 'About', href: '/about' }
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm">
        <div className="animate-fade-in">
          Freshly roasted every morning • Uber Flash available in Colombo
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-spice to-gold bg-clip-text text-transparent">
                Roshan Grams
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground animated-underline transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* WhatsApp */}
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center space-x-2 btn-spice text-primary-foreground border-none"
                asChild
              >
                <a href="https://wa.me/YOUR_WHATSAPP_E164?text=Hi%20Roshan%20Grams%2C%20I%20want%20to%20order%20now." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 glass-card">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="text-lg font-medium text-card-foreground hover:text-primary transition-colors py-2"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="pt-4 border-t border-border">
                      <Button
                        className="w-full btn-spice text-primary-foreground"
                        asChild
                      >
                        <a href="https://wa.me/YOUR_WHATSAPP_E164?text=Hi%20Roshan%20Grams%2C%20I%20want%20to%20order%20now." target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Order on WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-4 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mixtures, sweets, gifts..."
                  className="pl-10 glass-card border-border"
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;