import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { getProducts } from '@/lib/api';

import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  Product,
  CartItem
} from '@/lib/store';import { toast } from 'sonner';

const Index = () => {
const [products, setProducts] = useState<Product[]>([]);  const [cart, setCart] = useState<CartItem[]>(getCart);
const [cartOpen, setCartOpen] = useState(false);
useEffect(() => {
  getProducts().then((data) => {
    console.log("DATA FROM API:", data);
    setProducts(data);
  });
}, []);

console.log("PRODUCTS STATE:", products);

  const handleAddToCart = useCallback((product: Product) => {
    const updated = addToCart(product);
    setCart([...updated]);
    toast.success(`${product.name} added to cart`);
  }, []);

  const handleUpdateQuantity = useCallback((productId: string, quantity: number) => {
    const updated = updateCartQuantity(productId, quantity);
    setCart([...updated]);
  }, []);

  const handleRemove = useCallback((productId: string) => {
    const updated = removeFromCart(productId);
    setCart([...updated]);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  console.log("PRODUCTS STATE:", products);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <HeroSection />
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default Index;
