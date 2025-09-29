import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <Button
        className="fab animate-pulse-glow"
        asChild
      >
        <a 
          href="https://wa.me/YOUR_WHATSAPP_E164?text=Hi%20Roshan%20Grams%2C%20I%20want%20to%20order%20now." 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </a>
      </Button>
    </div>
  );
};

export default Layout;