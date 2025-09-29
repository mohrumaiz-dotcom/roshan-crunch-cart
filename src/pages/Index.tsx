import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Star, Heart } from 'lucide-react';
import { products, featuredProducts, categories } from '@/data/products';

const Index = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Explore Our Categories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From traditional gram mixtures to heritage sweets, discover flavors that have been perfected over generations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Customer Favorites</h2>
            <p className="text-muted-foreground">Our most loved mixtures and sweets</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/shop" className="flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Strips */}
      <section className="space-y-8">
        {/* Festival Gift Box Promo */}  
        <div className="relative overflow-hidden rounded-2xl mx-4">
          <div className="absolute inset-0 bg-gradient-to-r from-rose/90 to-gold/90" />
          <div className="relative container mx-auto px-8 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-white">
                <Badge className="bg-white/20 text-white border-white/30">
                  Limited Time
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Festival Gift Boxes
                </h2>
                <p className="text-lg text-white/90">
                  Curate sweets & mixes in a premium box. Perfect for celebrations and special occasions.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/category/gifts">
                    Build Your Box
                    <Gift className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Masala Gram Spotlight */}
        <div className="relative overflow-hidden rounded-2xl mx-4">
          <div className="absolute inset-0 bg-gradient-to-r from-spice/90 to-primary/90" />
          <div className="relative container mx-auto px-8 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-white">
                <Badge className="bg-white/20 text-white border-white/30 flex items-center space-x-1 w-fit">
                  <Star className="h-3 w-3" />
                  <span>Bestseller</span>
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Masala Gram 500g
                </h2>
                <p className="text-lg text-white/90">
                  Roasted to crackle, dusted to perfection. Our signature blend that customers can't get enough of.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/product/masala-gram-250">
                    Try Now - LKR 1,190
                    <Heart className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-card text-card-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                From our kitchen to your cravings.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A family craft, perfected over decades—bringing the street-side nostalgia to your door. 
                Every batch is hand-roasted with love, using time-honored techniques and the finest local ingredients.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What started as a small kitchen experiment has grown into Sri Lanka's favorite snack destination, 
                yet we've never lost sight of our roots: quality, tradition, and that perfect crunch.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about" className="flex items-center space-x-2">
                  <span>Our Story</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/600/400" 
                alt="Traditional kitchen roasting process" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
