import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageCircle, ShoppingCart, Clock, MapPin } from 'lucide-react';
import { products } from '@/data/products';

const QuickOrderSection = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState('');

  const popularProducts = products.slice(0, 6);

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const generateQuickOrder = () => {
    const selectedItems = selectedProducts.map(id => {
      const product = products.find(p => p.id === id);
      return `${product?.name} (${product?.weights[0]?.label})`;
    }).join('\n- ');

    const message = `Hi Roshan Grams! Quick Order from ${customerName}:\n\n- ${selectedItems}\n\nPlease confirm availability and total price. Thank you!`;
    const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_E164?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Express Ordering
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Quick Order in 30 Seconds</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select your favorites, add your name, and we'll get back to you instantly on WhatsApp
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Customer Info */}
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <Input
                    placeholder="Enter your name for the order"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="text-lg py-3"
                  />
                </div>

                {/* Product Selection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Select Products (tap to add)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {popularProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => toggleProduct(product.id)}
                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedProducts.includes(product.id)
                            ? 'border-primary bg-primary/10 scale-105'
                            : 'border-border hover:border-primary/50 hover:bg-primary/5'
                        }`}
                      >
                        <div className="text-center space-y-2">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg mx-auto"
                          />
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            LKR {product.weights[0]?.price}
                          </p>
                          {selectedProducts.includes(product.id) && (
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              Selected
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    onClick={generateQuickOrder}
                    disabled={!customerName || selectedProducts.length === 0}
                    size="lg"
                    className="btn-spice text-primary-foreground flex-1"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Send Quick Order ({selectedProducts.length} items)
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="flex-1"
                  >
                    <a href="/shop">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Browse Full Menu
                    </a>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Instant Response</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Island-wide Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span>WhatsApp Support</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickOrderSection;