import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Minus, Plus, Trash2, MessageCircle, ArrowLeft, Clock, MapPin } from 'lucide-react';
import { useCart, fulfilmentModes } from '@/contexts/CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal, fulfilmentMode, setFulfilmentMode, generateWhatsAppMessage, clearCart } = useCart();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    location: '',
    notes: ''
  });

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleWhatsAppOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.location) {
      alert('Please fill in all required customer information');
      return;
    }

    const message = generateWhatsAppMessage(customerInfo);
    const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_E164?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Discover our delicious mixtures and traditional sweets
            </p>
          </div>
          <Button asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        <Button variant="ghost" asChild>
          <Link to="/shop" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.weightOption.label}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="font-semibold text-primary">
                        LKR {item.weightOption.price}
                      </span>
                      <span className="text-muted-foreground text-sm ml-2">
                        each
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      LKR {item.weightOption.price * item.quantity}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Clear Cart */}
          <div className="text-right">
            <Button variant="outline" onClick={clearCart} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary & Checkout */}
        <div className="space-y-6">
          {/* Fulfilment Mode Selection */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Delivery Method</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select 
                value={fulfilmentMode.id} 
                onValueChange={(value) => {
                  const mode = fulfilmentModes.find(m => m.id === value);
                  if (mode) setFulfilmentMode(mode);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fulfilmentModes.map((mode) => (
                    <SelectItem key={mode.id} value={mode.id}>
                      <div>
                        <div className="font-medium">{mode.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {mode.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Fulfilment Details */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">{fulfilmentMode.label}</div>
                    <div className="text-muted-foreground">
                      {fulfilmentMode.lead_time && `Lead time: ${fulfilmentMode.lead_time}`}
                      {fulfilmentMode.coverage && ` • ${fulfilmentMode.coverage}`}
                      {fulfilmentMode.availability_note && (
                        <div className="mt-1 text-xs">{fulfilmentMode.availability_note}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+94 XX XXX XXXX"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location/Address *</Label>
                <Input
                  id="location"
                  value={customerInfo.location}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Your delivery address"
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Special Notes</Label>
                <Textarea
                  id="notes"
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Allergies, spice level preferences, etc."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>LKR {getSubtotal()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery</span>
                  <span>
                    {fulfilmentMode.id === 'uber_flash' ? 'Live fare applies' : 'Free'}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>LKR {getSubtotal()}</span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                * Final amount will be confirmed via WhatsApp including delivery charges
              </div>

              {/* WhatsApp Checkout */}
              <Button 
                size="lg" 
                className="w-full btn-spice text-primary-foreground"
                onClick={handleWhatsAppOrder}
                disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.location}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Send Order via WhatsApp
              </Button>
              
              <div className="text-center">
                <Badge variant="secondary" className="flex items-center space-x-1 w-fit mx-auto">
                  <span>Secure ordering via WhatsApp</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;