import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Star, Truck, Shield, Clock } from 'lucide-react';

interface SecondaryHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  features: Array<{
    icon: any;
    title: string;
    description: string;
  }>;
  variant?: 'default' | 'centered' | 'minimal';
}

const SecondaryHero = ({ 
  title, 
  subtitle, 
  ctaText, 
  ctaLink, 
  features, 
  variant = 'default' 
}: SecondaryHeroProps) => {
  return (
    <section className={`py-20 ${variant === 'minimal' ? 'py-16' : 'py-20'}`}>
      <div className="container mx-auto px-4">
        <div className={`${variant === 'centered' ? 'text-center' : 'grid lg:grid-cols-2 gap-12 items-center'}`}>
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Premium Quality
              </Badge>
              
              <h2 className={`font-bold leading-tight ${variant === 'minimal' ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl'}`}>
                {title}
              </h2>
              
              <p className={`text-muted-foreground leading-relaxed ${variant === 'minimal' ? 'text-base' : 'text-xl'} ${variant === 'centered' ? 'max-w-2xl mx-auto' : 'max-w-lg'}`}>
                {subtitle}
              </p>
            </div>

            <Button 
              size="lg" 
              className="btn-spice text-primary-foreground text-lg px-8 py-6"
              asChild
            >
              <Link to={ctaLink}>
                {ctaText}
              </Link>
            </Button>
          </div>

          {variant !== 'minimal' && (
            <div className={`grid ${variant === 'centered' ? 'grid-cols-2 md:grid-cols-4 mt-12' : 'grid-cols-2'} gap-6`}>
              {features.map((feature, index) => (
                <div key={index} className="glass-card p-6 space-y-3 text-center group hover:scale-105 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-primary mx-auto group-hover:text-accent transition-colors" />
                  <h3 className="font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SecondaryHero;