export type Category = 'Rings' | 'Necklaces' | 'Bandanas' | 'Bracelets' | 'Anti-Tarnish Jewelry';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  visible: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

const PRODUCTS_KEY = 'drisora_products';
const CART_KEY = 'drisora_cart';

const defaultProducts: Product[] = [
  { id: '1', name: 'Aurora Ring', price: 1299, category: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', visible: true },
  { id: '2', name: 'Celestial Necklace', price: 2499, category: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop', visible: true },
  { id: '3', name: 'Silk Bandana', price: 899, category: 'Bandanas', image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop', visible: true },
  { id: '4', name: 'Luna Bracelet', price: 1799, category: 'Bracelets', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop', visible: true },
  { id: '5', name: 'Eternal Band', price: 1599, category: 'Anti-Tarnish Jewelry', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop', visible: true },
  { id: '6', name: 'Minimalist Signet', price: 1099, category: 'Rings', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', visible: true },
];

export function getProducts(): Product[] {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
  return defaultProducts;
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getCart(): CartItem[] {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existing = cart.find(item => item.product.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: string) {
  const cart = getCart().filter(item => item.product.id !== productId);
  saveCart(cart);
  return cart;
}

export function updateCartQuantity(productId: string, quantity: number) {
  const cart = getCart();
  const item = cart.find(i => i.product.id === productId);
  if (item) {
    item.quantity = Math.max(0, quantity);
    if (item.quantity === 0) return removeFromCart(productId);
  }
  saveCart(cart);
  return cart;
}

export function generateWhatsAppLink(cart: CartItem[]): string {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const lines = cart.map(item => `• ${item.product.name} x${item.quantity} — ₹${item.product.price * item.quantity}`);
  const message = `Hi! I'd like to order:\n\n${lines.join('\n')}\n\n*Total: ₹${total}*`;
  return `https://wa.me/919604934590?text=${encodeURIComponent(message)}`;
}

export const CATEGORIES: Category[] = ['Rings', 'Necklaces', 'Bandanas', 'Bracelets', 'Anti-Tarnish Jewelry'];
export const ADMIN_PASSWORD = 'drisora2024';
