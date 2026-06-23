import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, Category, CATEGORIES } from '@/lib/store';
import ProductQuickView from './ProductQuickView';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const visibleProducts = products.filter(p => p.visible);
  const filtered = activeCategory === 'All'
    ? visibleProducts
    : visibleProducts.filter(p => p.category === activeCategory);

  return (
    <section id="shop" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-12 font-light tracking-wide">
          Shop Collection
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as Category | 'All')}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase font-sans border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-foreground border-border hover:border-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group transition-all duration-700 ease-out hover:-translate-y-2"
              >
                <div
                  className="aspect-square overflow-hidden bg-secondary mb-4 cursor-pointer rounded-lg shadow-sm group-hover:shadow-2xl group-hover:shadow-foreground/10 transition-shadow duration-700 ease-out"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div className="cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <h3 className="font-serif text-lg">{product.name}</h3>
                    <p className="font-sans text-sm text-muted-foreground mt-1">₹{product.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-1.5 border border-foreground/40 text-foreground font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-sans mt-10">No products in this category yet.</p>
        )}
      </div>

      <ProductQuickView
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};

export default ProductGrid;
