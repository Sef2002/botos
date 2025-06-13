import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

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
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!customer.name.trim()) {
      setError('Il nome è obbligatorio');
      return false;
    }
    if (!customer.email.trim()) {
      setError("L'email è obbligatoria");
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

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          items,
          origin: window.location.origin,
          customer,
        },
      });

      if (error || !data?.id) {
        console.error('Errore Supabase:', error);
        throw new Error('Impossibile creare la sessione di pagamento');
      }

      const result = await stripe.redirectToCheckout({ sessionId: data.id });
      if (result.error) throw new Error(result.error.message);

      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
      setError(`Errore durante il checkout: ${err instanceof Error ? err.message : 'Errore sconosciuto'}`);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setTimeout(() => navigate('/shop'), 3000);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length, navigate]);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Carrello Vuoto</h1>
        <p className="text-gray-400 mb-8">Il tuo carrello è vuoto. Verrai reindirizzato allo shop...</p>
        <button onClick={() => navigate('/shop')} className="btn btn-primary">Vai allo Shop</button>
      </div>
    );
  }

  return (
    <main className="pt-24">
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-4xl font-heading font-bold text-center mb-12">Checkout</h1>
        {/* The rest of the JSX remains unchanged */}
      </div>
    </main>
  );
};

export default Checkout;