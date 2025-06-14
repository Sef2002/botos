import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { SUPABASE_URL } from '../../lib/supabase';

const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_PK ? loadStripe(STRIPE_PK) : Promise.resolve(null);

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!customer.name.trim()) return setError('Nome richiesto'), false;
    if (!customer.email.trim()) return setError('Email richiesta'), false;
    if (!customer.phone.trim()) return setError('Telefono richiesto'), false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe non caricato correttamente');

      const items = cartItems.map(({ product, quantity }) => ({
        name: product.name,
        price: product.price,
        quantity,
      }));

      console.log('[✓] Sending checkout payload:', { items, customer });

      const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          items,
          origin: window.location.origin,
          customer,
        }),
      });

      const data = await response.json();
      console.log('[✓] Checkout function response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Errore durante la creazione del checkout');
      }

      if (!data.id) throw new Error('Sessione non valida (nessun ID)');

      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        console.error('Stripe redirect error:', result.error.message);
        throw new Error(result.error.message);
      }

      clearCart();
    } catch (err) {
      console.error('[✗] Checkout error:', err);
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
      <div className="text-center py-20">
        <h1 className="text-2xl">Carrello vuoto</h1>
        <p>Verrai reindirizzato allo shop...</p>
      </div>
    );
  }

  return (
    <main className="pt-24">
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">I tuoi dati</h2>

              {error && (
                <div className="text-red-500 bg-red-100 p-3 rounded">{error}</div>
              )}

              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={customer.name}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={customer.email}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefono"
                value={customer.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold text-black rounded font-bold hover:opacity-90 disabled:opacity-60"
              >
                {loading ? 'Elaborazione...' : 'Procedi al Pagamento'}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Riepilogo</h2>
            <ul>
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className="mb-3">
                  {product.name} × {quantity} – €{(product.price * quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold text-lg">
              Totale: €{cartTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;