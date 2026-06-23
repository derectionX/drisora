import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Sparkles, Droplets, Feather, Gem } from 'lucide-react';
import { Product, generateWhatsAppLink } from '@/lib/store';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const FEATURES = [
  { icon: Sparkles, label: 'Anti-Tarnish' },
  { icon: Droplets, label: 'Waterproof' },
  { icon: Feather, label: 'Lightweight' },
  { icon: Gem, label: 'Premium Finish' },
];

const ProductQuickView = ({ product, onClose, onAddToCart }: ProductQuickViewProps) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setActiveImage(0);
    }
  }, [product]);

  if (!product) return null;

  // Single image stored; build a gallery placeholder so the UI feels editorial.
  const images = [product.image, product.image, product.image];

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) onAddToCart(product);
    onClose();
  };

  const handleBuyNow = () => {
    const link = generateWhatsAppLink([{ product, quantity }]);
    window.open(link, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 bg-card rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row overflow-y-auto"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Gallery */}
            <div className="md:w-1/2 flex-shrink-0 bg-secondary flex flex-col">
              <div className="aspect-square w-full overflow-hidden">
                <img
                  key={activeImage}
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>
              <div className="flex gap-2 p-3 bg-card">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 overflow-hidden rounded border transition-all ${
                      activeImage === i ? 'border-foreground' : 'border-border opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col gap-6">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans mb-3">
                  {product.category}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground">
                  {product.name}
                </h2>
                <p className="font-serif text-2xl text-accent-foreground mt-3">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>

              <div className="h-px bg-border" />

              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                Crafted for the modern muse — an effortless piece designed to layer beautifully with your everyday and elevate quiet moments into something unforgettable.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {FEATURES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-sans text-foreground/80">
                    <Icon size={14} className="text-gold" />
                    {label}
                  </div>
                ))}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans">Quantity</span>
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 hover:bg-secondary transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-sans text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 hover:bg-secondary transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  className="w-full py-3.5 border border-foreground text-foreground text-xs tracking-[0.25em] uppercase font-sans hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-foreground text-background text-xs tracking-[0.25em] uppercase font-sans hover:bg-foreground/90 transition-all duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;
