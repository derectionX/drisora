import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

const Header = ({ cartCount, onCartOpen }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-background/70 backdrop-blur-md border-b border-border/60 text-foreground'
          : 'bg-transparent border-b border-transparent text-primary-foreground'
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="w-10" />
        <a href="/" className="font-serif text-2xl tracking-[0.3em] font-semibold">
          DRISORA
        </a>
        <div className="w-10 flex items-center justify-end">
          <button
            onClick={onCartOpen}
            className="hover:text-gold transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
