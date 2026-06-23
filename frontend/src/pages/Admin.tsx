import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Eye, EyeOff, Pencil, Plus, LogOut } from 'lucide-react';
import { Product, Category, CATEGORIES } from '@/lib/store';
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct
} from '@/lib/api';
import { toast } from 'sonner';

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', price: '', category: 'Rings' as Category, image: '' });

  useEffect(() => {
    if (sessionStorage.getItem('drisora_admin') !== 'true') {
      navigate('/', { replace: true });
      return;
    }
    getProducts().then((data) => {
      setProducts(data);
    });
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('drisora_admin');
    navigate('/', { replace: true });
  };

  const resetForm = () => {
    setForm({ name: '', price: '', category: 'Rings', image: '' });
    setEditing(null);
  };

  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.price || !form.image) {
    toast.error('Please fill all fields');
    return;
  }

  try {
    if (editing) {
      await updateProduct(Number(editing.id), {
        name: form.name,
        description: form.name,
        price: Number(form.price),
        category: form.category,
        image_url: form.image,
      });

      toast.success('Product updated');
    } else {
      await addProduct({
        name: form.name,
        description: form.name,
        price: Number(form.price),
        category: form.category,
        image_url: form.image,
      });

      toast.success('Product added');
    }

    const data = await getProducts();
    setProducts(data);

    resetForm();
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong');
  }
};

  const handleDelete = async (id: string) => {

  await deleteProduct(Number(id));

  const data = await getProducts();

  setProducts(data);

  toast.success("Product deleted");
};

  const toggleVisibility = (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, visible: !p.visible } : p);
    
    setProducts(updated);
  };

  const startEdit = (product: Product) => {
    setEditing(product);
    setForm({ name: product.name, price: String(product.price), category: product.category, image: product.image });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(f => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  if (sessionStorage.getItem('drisora_admin') !== 'true') return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-xl tracking-[0.2em]">DRISORA ADMIN</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-sans text-xs tracking-wider uppercase"
        >
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-10">
        {/* Add / Edit Product Form */}
        <div className="border border-border p-6 mb-10">
          <h2 className="font-serif text-2xl mb-6">{editing ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              className="px-4 py-3 bg-secondary border border-border font-sans text-sm focus:outline-none focus:border-gold"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={form.price}
              onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
              className="px-4 py-3 bg-secondary border border-border font-sans text-sm focus:outline-none focus:border-gold"
            />
            <select
              value={form.category}
              onChange={(e) => setForm(f => ({ ...f, category: e.target.value as Category }))}
              className="px-4 py-3 bg-secondary border border-border font-sans text-sm focus:outline-none focus:border-gold"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="font-sans text-sm file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-secondary file:text-foreground file:font-sans file:text-xs file:tracking-wider file:uppercase file:cursor-pointer"
              />
              {form.image && (
                <img src={form.image} alt="Preview" className="mt-2 w-16 h-16 object-cover" />
              )}
            </div>
            <input
              type="text"
              placeholder="Or paste image URL"
              value={form.image.startsWith('data:') ? '' : form.image}
              onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))}
              className="px-4 py-3 bg-secondary border border-border font-sans text-sm focus:outline-none focus:border-gold md:col-span-2"
            />
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-sans text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
              >
                <Plus size={14} /> {editing ? 'Update' : 'Add Product'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-border font-sans text-xs tracking-[0.15em] uppercase hover:border-foreground transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product List */}
        <h2 className="font-serif text-2xl mb-6">Products ({products.length})</h2>
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className={`flex items-center gap-4 p-4 border border-border transition-opacity ${!product.visible ? 'opacity-50' : ''}`}
            >
              <img src={product.image} alt={product.name} className="w-14 h-14 object-cover bg-secondary" />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-sm truncate">{product.name}</h3>
                <p className="font-sans text-xs text-muted-foreground">₹{product.price.toLocaleString()} · {product.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleVisibility(product.id)} className="p-2 text-muted-foreground hover:text-foreground" title="Toggle visibility">
                  {product.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => startEdit(product)} className="p-2 text-muted-foreground hover:text-foreground" title="Edit">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(product.id)} className="p-2 text-muted-foreground hover:text-destructive" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
