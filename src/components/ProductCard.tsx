import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Flame, Leaf, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      productId: product.id,
      name: product.name,
      weightOption: selectedWeight,
      quantity: 1,
      image: product.images[0]
    });
  };

  const getSpiceLevel = () => {
    if (!product.spice_level) return null;
    
    const levels = {
      'Mild': { dots: 1, color: 'spice-mild' },
      'Medium': { dots: 2, color: 'spice-medium' },
      'Hot': { dots: 3, color: 'spice-hot' }
    };
    
    const level = levels[product.spice_level];
    if (!level) return null;

    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 3 }, (_, i) => (
          <div 
            key={i} 
            className={`spice-dot ${i < level.dots ? level.color : 'bg-muted'}`} 
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">{product.spice_level}</span>
      </div>
    );
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card 
        className={`product-card glass-card overflow-hidden group cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {product.badges?.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-background/80 backdrop-blur-sm"
              >
                {badge}
              </Badge>
            ))}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick Add Button */}
          <div className={`absolute bottom-3 left-3 right-3 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
            <Button 
              className="w-full btn-spice text-primary-foreground"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            {/* Spice Level */}
            {getSpiceLevel()}

            {/* Diet Tags */}
            {product.ingredients && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Leaf className="h-3 w-3" />
                <span>Clean Ingredients</span>
              </div>
            )}
          </div>

          {/* Weight & Price Selector */}
          <div className="space-y-2">
            <Select 
              value={selectedWeight.label} 
              onValueChange={(value) => {
                const weight = product.weights.find(w => w.label === value);
                if (weight) setSelectedWeight(weight);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {product.weights.map((weight) => (
                  <SelectItem key={weight.label} value={weight.label}>
                    <div className="flex justify-between items-center w-full">
                      <span>{weight.label}</span>
                      <span className="font-semibold ml-4">LKR {weight.price}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Display */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">
                LKR {selectedWeight.price}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                / {selectedWeight.label}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;