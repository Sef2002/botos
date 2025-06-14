const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log("✅ Submitting checkout...");

  if (!validateForm()) {
    console.warn("❌ Validation failed");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe non è stato caricato correttamente");
    }

    const items = cartItems.map(({ product, quantity }) => ({
      name: product.name,
      price: product.price,
      quantity,
    }));

    console.log("📦 Items to send:", items);

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

    console.log("📡 Response:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Errore del server: ${response.status} - ${errorData.error}`);
    }

    const data = await response.json();
    if (!data.id) {
      throw new Error("Sessione di checkout non valida");
    }

    console.log("✅ Redirecting to Stripe with session ID:", data.id);

    const result = await stripe.redirectToCheckout({ sessionId: data.id });

    if (result.error) {
      throw new Error(result.error.message);
    }

    clearCart();
  } catch (error) {
    console.error("🔥 Checkout error:", error);
    setError(`Errore durante il checkout: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`);
  } finally {
    setLoading(false);
  }
};