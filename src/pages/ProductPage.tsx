import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Share2, ArrowLeft, MessageCircle, Star } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === productId);
  const [selectedWeight, setSelectedWeight] = useState(product?.weights[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/shop">
          <Button variant="outline">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedWeight) return;
    
    addToCart({
      productId: product.id,
      name: product.name,
      weightOption: selectedWeight,
      quantity,
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
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Spice Level:</span>
        <div className="flex items-center space-x-1">
          {Array.from({ length: 3 }, (_, i) => (
            <div 
              key={i} 
              className={`spice-dot ${i < level.dots ? level.color : 'bg-muted'}`} 
            />
          ))}
          <span className="text-sm ml-1">{product.spice_level}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-foreground capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/shop" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Shop</span>
        </Link>
      </Button>

      {/* Product Details */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Badges */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.badges?.map((badge, index) => (
                <Badge key={index} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground text-lg">SKU: {product.sku}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(4.8) • 127 reviews</span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-lg leading-relaxed">{product.description}</p>
          )}

          {/* Spice Level */}
          {getSpiceLevel()}

          {/* Weight & Price Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Weight & Price</label>
              <Select 
                value={selectedWeight?.label} 
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
                        <span className="font-semibold ml-8">LKR {weight.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Display */}
            <div className="text-3xl font-bold text-primary">
              LKR {selectedWeight?.price}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">Quantity</label>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full btn-spice text-primary-foreground"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart - LKR {selectedWeight ? selectedWeight.price * quantity : 0}
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="w-full"
              asChild
            >
              <a 
                href={`https://wa.me/YOUR_WHATSAPP_E164?text=Hi%20Roshan%20Grams%2C%20I%20want%20to%20order%20${product.name}%20(${selectedWeight?.label})`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Order via WhatsApp
              </a>
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-medium">Freshly Packed</div>
                <div className="text-muted-foreground">Made daily</div>
              </div>
              <div>
                <div className="font-medium">Hygienic Handling</div>
                <div className="text-muted-foreground">Clean process</div>
              </div>
              <div>
                <div className="font-medium">Secure Ordering</div>
                <div className="text-muted-foreground">Safe payment</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || "Premium quality snack made with traditional methods and finest ingredients."}
                </p>
                <Separator className="my-4" />
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Product Details</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Category: {product.category}</li>
                      <li>SKU: {product.sku}</li>
                      {product.spice_level && <li>Spice Level: {product.spice_level}</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Available Sizes</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {product.weights.map(weight => (
                        <li key={weight.label}>{weight.label} - LKR {weight.price}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ingredients" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Ingredients</h3>
                {product.ingredients ? (
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    Made with premium quality ingredients sourced locally.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="storage" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Storage Instructions</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Store in a cool, dry place away from direct sunlight</li>
                  <li>• Keep in airtight container after opening</li>
                  <li>• Best consumed within 10 days at room temperature</li>
                  <li>• Can be refrigerated for extended freshness (up to 20 days)</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <p className="text-muted-foreground">
                  Customer reviews will be displayed here once the review system is implemented.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;