import React from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className={`fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-black">Il tuo carrello</h2>
        <button onClick={onClose} className="text-black hover:text-gold">
          <X size={24} />
        </button>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-180px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Il carrello è vuoto.</p>
        ) : (
          cartItems.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4">
              <img src={product.image_url} alt={product.name} className="w-20 h-20 object-contain rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-black text-sm">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.category}</p>
                <p className="text-sm text-black font-bold">€{(product.price * quantity).toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-black"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-black">{quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-black"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="ml-auto text-xs text-red-600 hover:text-red-500"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-black font-semibold">Totale:</span>
          <span className="text-black font-bold text-lg">€{cartTotal.toFixed(2)}</span>
        </div>
        <button className="w-full bg-black text-white font-semibold py-3 rounded hover:bg-gray-800 transition">
          Procedi al Checkout
        </button>
      </div>
    </div>
  );
}