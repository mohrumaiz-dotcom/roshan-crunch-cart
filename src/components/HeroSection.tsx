import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { MessageCircle, Flame, Leaf, Bike } from 'lucide-react';
import heroImage from '@/assets/hero-green-mixtures.jpg';

const HeroSection = () => {
  const trustBadges = [
    { icon: Flame, text: "Fresh Daily" },
    { icon: Leaf, text: "No Added Preservatives" },
    { icon: Bike, text: "Island-wide Pre-Order COD" }
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Roshan Grams Premium Mixtures" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
                Hand-roasted • Small batches • Big flavour
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Crunch that speaks{' '}
                <span className="bg-gradient-to-r from-spice to-gold bg-clip-text text-transparent">
                  home.
                </span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Hand-roasted gram mixtures & heritage sweets. 
                Small batches. Big flavour.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="btn-spice text-primary-foreground text-lg px-8 py-6"
                asChild
              >
                <Link to="/category/mixtures">
                  Shop Mixtures
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white/30 hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6"
                asChild
              >
                <a href="https://wa.me/YOUR_WHATSAPP_E164?text=I%20want%20to%20order%20mixtures" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Order on WhatsApp
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-2 text-white/80">
                  <badge.icon className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element - Feature Grid */}
          <div className="hidden lg:block animate-scale-in">
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 space-y-3 animate-float" style={{ animationDelay: '0s' }}>
                <Flame className="h-8 w-8 text-spice" />
                <h3 className="font-semibold text-card-foreground">Batch-Roasted</h3>
                <p className="text-sm text-muted-foreground">Consistent crunch & aroma.</p>
              </div>
              
              <div className="glass-card p-6 space-y-3 animate-float mt-8" style={{ animationDelay: '0.5s' }}>
                <Leaf className="h-8 w-8 text-mint" />
                <h3 className="font-semibold text-card-foreground">Clean Ingredients</h3>
                <p className="text-sm text-muted-foreground">Local spices, no shortcuts.</p>
              </div>
              
              <div className="glass-card p-6 space-y-3 animate-float -mt-4" style={{ animationDelay: '1s' }}>
                <Bike className="h-8 w-8 text-gold" />
                <h3 className="font-semibold text-card-foreground">Uber Flash</h3>
                <p className="text-sm text-muted-foreground">Fast delivery within Colombo.</p>
              </div>
              
              <div className="glass-card p-6 space-y-3 animate-float mt-4" style={{ animationDelay: '1.5s' }}>
                <MessageCircle className="h-8 w-8 text-rose" />
                <h3 className="font-semibold text-card-foreground">WhatsApp Orders</h3>
                <p className="text-sm text-muted-foreground">Simple chat-based ordering.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;