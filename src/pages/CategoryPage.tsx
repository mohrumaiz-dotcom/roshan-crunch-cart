import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = categories.find(c => c.id === categoryId);
  const categoryProducts = products.filter(p => p.category === categoryId);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <Link to="/shop">
          <Button variant="outline">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/shop" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Shop</span>
        </Link>
      </Button>

      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {category.description}
        </p>
        <div className="mt-6">
          <Badge variant="secondary" className="text-sm">
            {categoryProducts.length} Products Available
          </Badge>
        </div>
      </div>

      {/* Products Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg mb-4">
            No products available in this category yet
          </div>
          <Button variant="outline" asChild>
            <Link to="/shop">Browse All Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;