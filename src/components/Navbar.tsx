import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <nav className="flex justify-between items-center bg-white/95 backdrop-blur-sm rounded-[40px] px-8 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <NavLink to="/" className="text-2xl font-heading text-black relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent blur-sm"></div>
              <img 
                src="/assets/logo.png" 
                alt="Prestige Salon Logo" 
                className="h-16 relative z-10" 
              />
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `nav-link text-black ${isActive ? 'active' : ''} text-sm tracking-wider`
              }
            >
              HOME
            </NavLink>
            <NavLink 
              to="/servizi" 
              className={({isActive}) => 
                `nav-link text-black ${isActive ? 'active' : ''} text-sm tracking-wider`
              }
            >
              SERVIZI
            </NavLink>
            <NavLink 
              to="/galleria" 
              className={({isActive}) => 
                `nav-link text-black ${isActive ? 'active' : ''} text-sm tracking-wider`
              }
            >
              GALLERIA
            </NavLink>
            <NavLink 
              to="/contatti" 
              className={({isActive}) => 
                `nav-link text-black ${isActive ? 'active' : ''} text-sm tracking-wider`
              }
            >
              CONTATTI
            </NavLink>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/shop" className="btn btn-outline text-sm">SHOP</NavLink>
            <a href="#" className="btn btn-primary text-sm">PRENOTA</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-black"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } pt-20`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-8">
          <NavLink 
            to="/" 
            className="text-xl font-heading text-black hover:text-gold transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            HOME
          </NavLink>
          <NavLink 
            to="/servizi" 
            className="text-xl font-heading text-black hover:text-gold transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            SERVIZI
          </NavLink>
          <NavLink 
            to="/galleria" 
            className="text-xl font-heading text-black hover:text-gold transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            GALLERIA
          </NavLink>
          <NavLink 
            to="/contatti" 
            className="text-xl font-heading text-black hover:text-gold transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            CONTATTI
          </NavLink>
          <div className="flex flex-col space-y-4 pt-6">
            <NavLink to="/shop" className="btn btn-outline text-center" onClick={() => setIsOpen(false)}>SHOP</NavLink>
            <a href="#" className="btn btn-primary text-center" onClick={() => setIsOpen(false)}>PRENOTA</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;