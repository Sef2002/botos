import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!customer.name || !customer.email || !customer.phone) {
      alert('Per favore compila tutti i campi obbligatori.');
      return;
    }

    if (cartItems.length === 0) {
      alert('Il carrello è vuoto.');
      return;
    }

    setLoading(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe non è stato caricato correttamente');
      }

      // Prepare items for the Edge Function
      const items = cartItems.map(({ product, quantity }) => ({
        name: product.name,
        price: product.price,
        quantity,
      }));

      // Call the deployed Supabase Edge Function
      const response = await fetch('https://tjysjdbdwxhjwxuhthzh.supabase.co/functions/v1/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          items,
          origin: window.location.origin,
          customer: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Edge Function error:', errorData);
        throw new Error(`Errore del server: ${response.status} - ${errorData.error || 'Errore sconosciuto'}`);
      }

      const data = await response.json();
      
      if (!data.id) {
        throw new Error('Sessione di checkout non valida');
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Clear cart only after successful redirect
      clearCart();
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Errore durante il checkout: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-20 px-4 grid md:grid-cols-2 gap-12">
      {/* Customer Info */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">I tuoi dati</h2>
        <input
          type="text"
          name="name"
          placeholder="Nome e Cognome *"
          value={customer.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 bg-black text-white rounded focus:border-gold focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={customer.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 bg-black text-white rounded focus:border-gold focus:outline-none"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefono *"
          value={customer.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-700 bg-black text-white rounded focus:border-gold focus:outline-none"
          required
        />
        <p className="text-sm text-gray-400">* Campi obbligatori</p>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Riepilogo Ordine</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-400">Il carrello è vuoto</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-700">
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className="py-4 flex justify-between">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-400">Quantità: {quantity}</p>
                    {product.category && (
                      <p className="text-sm text-gray-500">{product.category}</p>
                    )}
                  </div>
                  <p className="font-bold">€{(product.price * quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <div className="text-right text-xl font-bold border-t border-gray-700 pt-4">
              Totale: €{cartTotal.toFixed(2)}
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading || cartItems.length === 0}
              className="w-full bg-gold text-black py-3 rounded font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {loading ? 'Elaborazione...' : 'Procedi al Pagamento'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;