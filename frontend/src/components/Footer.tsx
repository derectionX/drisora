import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const OWNER_PASSWORD = '582004';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === OWNER_PASSWORD) {
      setShowModal(false);
      setPassword('');
      setError('');
      sessionStorage.setItem('drisora_admin', 'true');
      navigate('/admin');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setShowModal(open);
    if (!open) {
      setPassword('');
      setError('');
    }
  };

  return (
    <>
      <footer className="border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
            <div>
              <h4 className="font-serif text-sm tracking-[0.15em] text-foreground mb-4">SHOP</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Rings</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Necklaces</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Bracelets</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Bandanas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-sm tracking-[0.15em] text-foreground mb-4">CONTACT</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="tel:9604934590" className="hover:text-foreground transition-colors">9604934590</a></li>
                <li><a href="https://wa.me/919604934590" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-sm tracking-[0.15em] text-foreground mb-4">FOLLOW</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="https://www.instagram.com/drisora_07?igsh=ZTZ6b3N5ZGw3Mjkx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center">
            <p className="font-serif text-lg tracking-[0.2em] text-foreground">DRISORA</p>
            <p className="text-xs text-muted-foreground mt-2">© 2026 Drisora. All rights reserved.</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 text-[10px] text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors cursor-pointer bg-transparent border-none"
            >
              Owner Only
            </button>
          </div>
        </div>
      </footer>

      <Dialog open={showModal} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif tracking-wide text-center">Access</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                autoFocus
              />
              {error && (
                <p className="text-xs text-destructive mt-1.5">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full">Continue</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
