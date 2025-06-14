import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    return form.name && form.email && form.phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("Per favore completa tutti i campi.");
      return;
    }

    setLoading(true);
    setError("");

    const stripe = await stripePromise;

    try {
      const response = await fetch(
        "https://tjysjdbdwxhjwxuhthzh.supabase.co/functions/v1/create-checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems.map((item) => ({
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity,
            })),
            origin: window.location.origin,
            customer: { email: form.email },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Errore durante il checkout.");
      }

      // Redirect to Stripe Checkout
      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId: data.id });
        if (result.error) {
          setError(result.error.message || "Errore di redirezione a Stripe.");
        }
      }
    } catch (err: any) {
      console.error("Checkout Error:", err);
      setError(err.message || "Errore sconosciuto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nome completo"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-black border border-gray-600"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-black border border-gray-600"
        />
        <input
          name="phone"
          placeholder="Telefono"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 rounded bg-black border border-gray-600"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#b89c73] text-black font-semibold py-3 rounded hover:opacity-90"
        >
          {loading ? "Elaborazione..." : "Procedi al pagamento"}
        </button>
      </form>

      <div className="mt-8 border-t border-gray-700 pt-4">
        <h2 className="text-xl font-semibold mb-2">Riepilogo</h2>
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex justify-between mb-1">
            <span>{item.product.name} × {item.quantity}</span>
            <span>€{(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-2">
          <span>Totale:</span>
          <span>€{cartTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;