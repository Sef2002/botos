import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { SUPABASE_URL } from '../../lib/supabase';

const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
const stripePromise = STRIPE_PK ? loadStripe(STRIPE_PK) : Promise.resolve(null);

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!customer.name.trim()) return setError('Il nome è obbligatorio'), false;
    if (!customer.email.trim()) return setError('L\'email è obbligatoria'), false;
    if (!customer.phone.trim()) return setError('Il telefono è obbligatorio'), false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe non è stato caricato correttamente');

      const items = cartItems.map(({ product, quantity }) => ({
        name: product.name,
        price: product.price,
        quantity,
      }));

      const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ items, origin: window.location.origin, customer }),
      });

      const text = await response.text();
      let data: { id?: string; error?: string } = {};
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Errore nel parsing della risposta JSON.');
      }

      if (!response.ok || !data.id) {
        console.error('Checkout error:', data);
        throw new Error(data.error || 'Errore del server durante il checkout');
      }

      const result = await stripe.redirectToCheckout({ sessionId: data.id });
      if (result.error) throw new Error(result.error.message);

      clearCart(); // Only after redirect attempt
    } catch (err) {
      console.error('Checkout error:', err);
      setError(
        err instanceof Error ? err.message : 'Errore sconosciuto durante il checkout'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setTimeout(() => navigate('/shop'), 3000);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length, navigate]);

  if (cartItems.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Carrello Vuoto</h1>
        <p className="text-gray-400 mb-8">Il tuo carrello è vuoto. Verrai reindirizzato allo shop...</p>
        <button onClick={() => navigate('/shop')} className="btn btn-primary">
          Vai allo Shop
        </button>
      </div>
    );
  }

  return (
    <main className="pt-24">
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-4xl font-heading font-bold text-center mb-12">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold mb-6">I tuoi dati</h2>
            {error && (
              <div className="bg-red-900 text-red-100 px-4 py-3 rounded">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" value={customer.name} onChange={handleChange} placeholder="Nome e Cognome" required />
              <input name="email" type="email" value={customer.email} onChange={handleChange} placeholder="Email" required />
              <input name="phone" value={customer.phone} onChange={handleChange} placeholder="Telefono" required />
              <button type="submit" disabled={loading} className="w-full bg-gold py-4 rounded text-lg font-bold">
                {loading ? 'Elaborazione...' : 'Procedi al Pagamento'}
              </button>
              <p className="text-xs text-gray-400 text-center">
                Sarai reindirizzato a Stripe per completare il pagamento in modo sicuro.
              </p>
            </form>
          </div>
          <div className="bg-zinc-900 border border-gray-800 rounded-lg p-6 space-y-4">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-white">
                <span>{product.name} × {quantity}</span>
                <span>€{(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="flex justify-between text-xl font-bold">
              <span>Totale:</span>
              <span className="text-gold">€{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;