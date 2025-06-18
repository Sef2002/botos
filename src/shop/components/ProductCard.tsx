import { Product } from "../types/product";
import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-black' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const getRating = () => {
    // Mock ratings based on the screenshot
    if (product.id === "1") return { rating: 4.8, reviews: 730 };
    if (product.id === "2") return { rating: 4.6, reviews: 1063 };
    if (product.id === "3") return { rating: 4.7, reviews: 313 };
    return { rating: 4.5, reviews: 100 };
  };

  const { rating, reviews } = getRating();

  const getDiscount = () => {
    if (product.id === "2") return "-15 % di sconto con il codice EXPERT";
    return null;
  };

  const getBadge = () => {
    if (product.category === "NUOVO") return { text: "NUOVO", color: "bg-black text-white" };
    if (product.category === "BEST-SELLER") return { text: "BEST-SELLER", color: "bg-black text-white" };
    return null;
  };

  const badge = getBadge();
  const discount = getDiscount();

  return (
    <div className="bg-white border-0 relative group">
      {/* Badge */}
      {badge && (
        <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold z-10 ${badge.color}`}>
          {badge.text}
        </div>
      )}

      {/* Heart Icon */}
      <button className="absolute top-4 right-4 p-2 z-10 hover:bg-gray-100 rounded-full transition-colors">
        <Heart size={20} className="text-gray-400 hover:text-red-500" />
      </button>

      {/* Product Image */}
      <div className="aspect-square mb-6 flex items-center justify-center bg-white">
        <img
          src={product.image_url}
          alt={product.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-black uppercase leading-tight">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* Discount */}
        {discount && (
          <p className="text-sm text-red-600 font-medium">
            {discount}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex">
            {renderStars(rating)}
          </div>
          <span className="text-sm text-gray-600">
            {rating} ({reviews})
          </span>
        </div>

        {/* Size Selector for product 3 */}
        {product.id === "3" && (
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Seleziona un formato</label>
            <select className="w-full border border-gray-300 px-3 py-2 text-sm bg-white">
              <option>75ml</option>
              <option>100ml</option>
            </select>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className={`w-full py-3 text-white font-bold text-sm uppercase tracking-wide transition-colors ${
            product.id === "2" 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-black hover:bg-gray-800"
          }`}
          disabled={product.id === "2"}
        >
          {product.id === "2" 
            ? `AGGIUNGI AL CARRELLO ${product.price.toFixed(2)} €`
            : `AGGIUNGERE AL CARRELLO ${product.price.toFixed(2)} €`
          }
        </button>
      </div>
    </div>
  );
}