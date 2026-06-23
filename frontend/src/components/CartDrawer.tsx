import { X, Plus, Minus, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem, generateWhatsAppLink } from '@/lib/store';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartDrawer = ({ open, onClose, cart, onUpdateQuantity, onRemove }: CartDrawerProps) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col border-l border-border"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-2xl">Your Cart</h2>
              <button onClick={onClose} className="text-foreground hover:text-gold transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground font-sans mt-10">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover bg-secondary"
                    />
                    <div className="flex-1">
                      <h3 className="font-serif text-sm">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground font-sans mt-1">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="text-foreground hover:text-gold"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-sans">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-foreground hover:text-gold"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="text-muted-foreground hover:text-destructive text-xs font-sans self-start"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between font-sans">
                  <span className="text-sm">Total</span>
                  <span className="text-sm font-medium">₹{total.toLocaleString()}</span>
                </div>
                <a
                  href={generateWhatsAppLink(cart)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[hsl(142,70%,40%)] text-primary-foreground font-sans text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={16} />
                  Order on WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
