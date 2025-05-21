import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <nav
          className="flex justify-between items-center rounded-[40px] px-8 py-4 relative overflow-hidden"
          style={{
            backgroundImage: "url('assets/lisabackground.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Foreground content */}
          <div className="relative z-10 flex justify-between items-center w-full">
            <NavLink to="/" className="text-2xl font-heading text-white">
              <img src="/assets/logo.png" alt="Il Salone di Lisa Logo" className="h-12" />
            </NavLink>

            {/* Desktop navigation links */}
            <div className="hidden md:flex items-center space-x-10">
              {["/", "/servizi", "/galleria", "/contatti"].map((path, index) => {
                const labels = ["HOME", "SERVIZI", "GALLERIA", "CONTATTI"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''} text-sm tracking-wider text-[#5e3a1e] hover:text-[#3d2714] transition-colors`
                    }
                  >
                    {labels[index]}
                  </NavLink>
                );
              })}
            </div>

            {/* Call-to-action buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/shop" className="btn btn-outline text-sm text-[#5e3a1e] border-[#5e3a1e] hover:bg-[#5e3a1e] hover:text-white transition-colors">
                SHOP
              </NavLink>
              <a href="#" className="btn btn-primary text-sm bg-[#5e3a1e] text-white hover:bg-[#4a2f17] transition-colors">
                PRENOTA
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu panel */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-95 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } pt-20`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-8">
          {["/", "/servizi", "/galleria", "/contatti"].map((path, index) => {
            const labels = ["HOME", "SERVIZI", "GALLERIA", "CONTATTI"];
            return (
              <NavLink
                key={path}
                to={path}
                className="text-xl font-heading text-white hover:text-[#5e3a1e] transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {labels[index]}
              </NavLink>
            );
          })}

          <div className="flex flex-col space-y-4 pt-6">
            <NavLink to="/shop" className="btn btn-outline text-center text-[#5e3a1e] border-[#5e3a1e] hover:bg-[#5e3a1e] hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
              SHOP
            </NavLink>
            <a href="#" className="btn btn-primary text-center bg-[#5e3a1e] text-white hover:bg-[#4a2f17] transition-colors" onClick={() => setIsOpen(false)}>
              PRENOTA
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;