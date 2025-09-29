import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Bike, CreditCard } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: "Shop",
      links: [
        { label: "New Arrivals", href: "/new" },
        { label: "Bestsellers", href: "/bestsellers" },
        { label: "Build a Gift Box", href: "/gift-builder" }
      ]
    },
    {
      title: "Customer Care",
      links: [
        { label: "Delivery & Pickup", href: "/delivery" },
        { label: "Returns Policy", href: "/returns" },
        { label: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" }
      ]
    }
  ];

  const badges = [
    { icon: MessageCircle, label: "WhatsApp Orders" },
    { icon: Bike, label: "Uber Flash" },
    { icon: CreditCard, label: "COD (Pre-Order)" }
  ];

  return (
    <footer className="bg-card text-card-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-spice to-gold bg-clip-text text-transparent">
                Roshan Grams
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Fresh • Crunchy • Made Daily
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hand-roasted gram mixtures & heritage sweets. 
              Small batches. Big flavour.
            </p>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <badge.icon className="h-3 w-3" />
                  <span>{badge.label}</span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-card-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-card-foreground animated-underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Roshan Grams. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Made with ❤️ in Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;