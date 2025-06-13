import { Product } from "../types/product";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addToCart } = useCart();

  return (
    <div 
      className="group relative overflow-hidden bg-zinc-900 border border-gray-800 hover:border-gold transition-all fade-in"
      style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
    >
      {product.image_url && (
        <div className="relative overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
      )}
      <div className="p-6">
        <div className="mb-4">
          {product.category && (
            <span className="text-xs text-gold uppercase tracking-wider">{product.category}</span>
          )}
          <h3 className="text-xl font-heading text-white mt-1 mb-2">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-gray-400 mb-3">{product.description}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gold">€{product.price.toFixed(2)}</span>
          <button
            className="btn btn-primary flex items-center gap-2 text-sm"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={16} />
            Aggiungi
          </button>
        </div>
        
        {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-orange-400 mt-2">Solo {product.stock} rimasti!</p>
        )}
        
        {product.stock === 0 && (
          <p className="text-xs text-red-400 mt-2">Esaurito</p>
        )}
      </div>
    </div>
  );
}