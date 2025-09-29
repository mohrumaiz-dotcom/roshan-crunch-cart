import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Users, Award, Clock, Flame, Leaf, MessageCircle } from 'lucide-react';
import heroImage from '@/assets/hero-mixtures.jpg';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every batch is crafted with passion and attention to detail, just like grandma used to make."
    },
    {
      icon: Flame,
      title: "Traditional Methods",
      description: "We use time-honored roasting techniques passed down through generations."
    },
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description: "Only the finest local spices and ingredients make it into our products."
    },
    {
      icon: Clock,
      title: "Fresh Daily",
      description: "Made fresh every morning to ensure maximum crunch and flavor."
    }
  ];

  const milestones = [
    {
      year: "1985",
      title: "Humble Beginnings",
      description: "Started as a small family kitchen experiment in Colombo"
    },
    {
      year: "1995",
      title: "First Shop",
      description: "Opened our first physical store serving the local community"
    },
    {
      year: "2010",
      title: "Island-wide Recognition",
      description: "Became Sri Lanka's favorite snack destination"
    },
    {
      year: "2024",
      title: "Digital Innovation",
      description: "Launched online ordering with WhatsApp and Uber Flash delivery"
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Traditional kitchen process" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm mb-4">
              Since 1985
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              From our kitchen to your{' '}
              <span className="bg-gradient-to-r from-spice to-gold bg-clip-text text-transparent">
                cravings.
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              A family craft, perfected over decades—bringing the street-side nostalgia to your door.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                What started in 1985 as a small kitchen experiment by our founder, Mrs. Roshan Perera, 
                has grown into Sri Lanka's beloved snack destination. Using her grandmother's secret 
                spice blends and traditional roasting techniques, she began creating mixtures that 
                captured the authentic flavors of street-side nostalgia.
              </p>
              <p>
                From those humble beginnings in a small Colombo kitchen, word spread about the 
                exceptional quality and taste of our products. Friends became customers, customers 
                became family, and what was once a personal passion became a mission to preserve 
                and share traditional Sri Lankan flavors.
              </p>
              <p>
                Today, nearly four decades later, we continue to hand-roast every batch with the 
                same love and attention to detail. Our commitment to quality, traditional methods, 
                and pure ingredients remains unchanged, even as we've embraced modern conveniences 
                like WhatsApp ordering and instant delivery.
              </p>
            </div>
            <Button asChild size="lg" className="btn-spice text-primary-foreground">
              <Link to="/shop">
                <Heart className="h-5 w-5 mr-2" />
                Taste Our Story
              </Link>
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src="/api/placeholder/600/400" 
              alt="Traditional kitchen setup"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-card text-card-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our values guide everything we do, from sourcing ingredients to serving customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass-card text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From a kitchen experiment to Sri Lanka's favorite snack brand.
          </p>
        </div>

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-start space-x-6 group">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {milestone.year.slice(-2)}
                </div>
              </div>
              <div className="flex-1 pb-8 border-b border-border last:border-b-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-semibold">{milestone.title}</h3>
                  <Badge variant="outline">{milestone.year}</Badge>
                </div>
                <p className="text-muted-foreground">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Stats */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">39</div>
              <div className="text-muted-foreground">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Product Varieties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">365</div>
              <div className="text-muted-foreground">Days a Year Fresh</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Experience the Tradition?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of customers who've made Roshan Grams part of their daily cravings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-spice text-primary-foreground">
              <Link to="/shop">
                <Award className="h-5 w-5 mr-2" />
                Browse Products
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a 
                href="https://wa.me/YOUR_WHATSAPP_E164?text=Hi%20Roshan%20Grams%2C%20I%27d%20like%20to%20know%20more%20about%20your%20story"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat with Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;