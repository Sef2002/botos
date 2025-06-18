import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/shopApi";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Mock products data to match the screenshot
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "RITUALE BRILLANTEZZA ANTI CRESPO",
        slug: "rituale-brillantezza-anti-crespo",
        description: "Rituale Brillantezza Anti Crespo Gloss Absolu, composto dallo shampoo Bain Hydra-Glaze, ...",
        price: 169.10,
        category: "NUOVO",
        image_url: "/assets/keratase 1.jpg",
        stock: 10,
        active: true,
        created_at: "2025-01-01",
        updated_at: "2025-01-01"
      },
      {
        id: "2",
        name: "RITUEL DELUXE GENESIS",
        slug: "rituel-deluxe-genesis",
        description: "Trattamenti anticaduta per capelli fini/misti",
        price: 180.30,
        category: "",
        image_url: "/assets/keratase 2.jpg",
        stock: 10,
        active: true,
        created_at: "2025-01-01",
        updated_at: "2025-01-01"
      },
      {
        id: "3",
        name: "L'HUILE ORIGINALE RICARICABILE 75ML",
        slug: "huile-originale-ricaricabile-75ml",
        description: "Il nostro iconico olio per capelli, ora ricaricabile, è stato premiato da Marie Claire con il Prix...",
        price: 67.00,
        category: "BEST-SELLER",
        image_url: "/assets/keratase 3.jpg",
        stock: 10,
        active: true,
        created_at: "2025-01-01",
        updated_at: "2025-01-01"
      }
    ];
    
    setProducts(mockProducts);
  }, []);

  return (
    <main className="pt-24 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10 fade-in">
            <h5 className="text-gray-600 tracking-widest uppercase mb-2">Prodotti Professionali</h5>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 text-black">SHOP</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Scopri la nostra selezione di prodotti professionali Kérastase per la cura dei tuoi capelli.
              Qualità garantita per risultati eccezionali.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="max-w-2xl mx-auto fade-in">
            <h2 className="text-4xl font-heading font-bold mb-6 text-black">Hai Bisogno di Consigli?</h2>
            <p className="text-lg text-gray-600 mb-8">
              I nostri esperti sono a tua disposizione per guidarti nella scelta dei prodotti più adatti alle tue esigenze.
            </p>
            <a href="#" className="btn btn-primary text-lg px-8 py-3">CONTATTACI</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopPage;