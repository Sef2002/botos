import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { SUPABASE_URL } from '../../lib/supabase';

const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
const stripePromise = STRIPE_PK ? loadStripe(STRIPE_PK) : Promise.resolve(null);

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!customer.name.trim()) {
      setError('Il nome è obbligatorio');
      return false;
    }
    if (!customer.email.trim()) {
      setError('L\'email è obbligatoria');
      return false;
    }
    if (!customer.phone.trim()) {
      setError('Il telefono è obbligatorio');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Starting checkout process...');
      
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

      console.log('Sending request to Edge Function with items:', items);

      // Call the deployed Supabase Edge Function manually. Using fetch avoids
      // issues with incorrect HTTP methods when invoking the function in some
      // environments.
      const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          items,
          origin: window.location.origin,
          customer: {
            name: customer.name.trim(),
            email: customer.email.trim(),
            phone: customer.phone.trim(),
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Edge Function error response:', errorData);
        throw new Error(
          `Errore del server: ${response.status} - ${errorData.error || 'Errore sconosciuto'}`,
        );
      }

      const data = (await response.json()) as { id?: string };
      if (!data.id) {
        throw new Error('Sessione di checkout non valida');
      }

      console.log('Redirecting to Stripe Checkout with session ID:', data.id);

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        console.error('Stripe redirect error:', result.error);
        throw new Error(result.error.message);
      }

      // Clear cart only after successful redirect
      clearCart();
    } catch (error) {
      console.error('Checkout error:', error);
      setError(`Errore durante il checkout: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to shop if cart is empty
  React.useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setTimeout(() => {
        navigate('/shop');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length, navigate]);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Carrello Vuoto</h1>
        <p className="text-gray-400 mb-8">Il tuo carrello è vuoto. Verrai reindirizzato allo shop...</p>
        <button
          onClick={() => navigate('/shop')}
          className="btn btn-primary"
        >
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
          {/* Customer Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold mb-6">I tuoi dati</h2>
            
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome e Cognome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Inserisci il tuo nome completo"
                  value={customer.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-700 bg-zinc-900 text-white rounded focus:border-gold focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="la-tua-email@esempio.com"
                  value={customer.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-700 bg-zinc-900 text-white rounded focus:border-gold focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Telefono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+39 123 456 7890"
                  value={customer.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-700 bg-zinc-900 text-white rounded focus:border-gold focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <p className="text-sm text-gray-400">* Campi obbligatori</p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold mb-6">Riepilogo Ordine</h2>
            
            <div className="bg-zinc-900 border border-gray-800 rounded-lg p-6">
              <ul className="divide-y divide-gray-700 space-y-4">
                {cartItems.map(({ product, quantity }) => (
                  <li key={product.id} className="pt-4 first:pt-0">
                    <div className="flex items-start gap-4">
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{product.name}</h3>
                        {product.category && (
                          <p className="text-sm text-gray-400">{product.category}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-400">Quantità: {quantity}</span>
                          <span className="font-bold text-gold">€{(product.price * quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-gray-700 mt-6 pt-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Totale:</span>
                  <span className="text-gold">€{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading || cartItems.length === 0}
              className="w-full bg-gold text-black py-4 rounded font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Elaborazione...
                </span>
              ) : (
                'Procedi al Pagamento'
              )}
            </button>
            
            <p className="text-xs text-gray-400 text-center">
              Sarai reindirizzato a Stripe per completare il pagamento in modo sicuro.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;