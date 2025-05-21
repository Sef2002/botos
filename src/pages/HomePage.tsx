import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
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

  return (
    <main>
      {/* Other sections... */}

      {/* Call to Action */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-black">
          <div 
            className="absolute inset-0 bg-center bg-cover opacity-30"
            style={{ backgroundImage: "url('/assets/proof6.png')" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="max-w-2xl mx-auto fade-in">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6">Prenota Il Tuo Appuntamento</h2>
            <p className="text-lg text-gray-300 mb-8">
              Non lasciare al caso il tuo look. Prenota ora un appuntamento con i nostri esperti hairstylist e goditi un'esperienza di styling premium.
            </p>
            <a href="#" className="btn btn-primary text-lg px-8 py-3">PRENOTA ORA</a>
          </div>
        </div>
      </section>

      {/* Footer will follow here */}
    </main>
  );
};

export default HomePage;