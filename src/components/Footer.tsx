import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal border-t border-taupe/20 mt-16">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-2xl font-heading mb-4 text-cream">IL SALONE DI LISA</h4>
            <p className="text-sand/80 mb-6">
              Il miglior salone nella città di Treviglio, dove professionalità e passione si uniscono per offrire servizi di altissima qualità.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 border border-taupe flex items-center justify-center text-taupe hover:bg-taupe hover:text-charcoal transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-taupe flex items-center justify-center text-taupe hover:bg-taupe hover:text-charcoal transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-taupe flex items-center justify-center text-taupe hover:bg-taupe hover:text-charcoal transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-heading mb-4 text-cream">ORARI</h4>
            <div className="space-y-2 text-sand/80">
              <div className="flex justify-between border-b border-taupe/20 pb-2">
                <span>Lunedì</span>
                <span>10:00 - 19:00</span>
              </div>
              <div className="flex justify-between border-b border-taupe/20 pb-2">
                <span>Martedì</span>
                <span>10:00 - 19:00</span>
              </div>
              <div className="flex justify-between border-b border-taupe/20 pb-2">
                <span>Mercoledì</span>
                <span>10:00 - 19:00</span>
              </div>
              <div className="flex justify-between border-b border-taupe/20 pb-2">
                <span>Giovedì</span>
                <span>10:00 - 19:00</span>
              </div>
              <div className="flex justify-between border-b border-taupe/20 pb-2">
                <span>Venerdì</span>
                <span>10:00 - 19:00</span>
              </div>
              <div className="flex justify-between border-b border-taupe/20 pb-2">
                <span>Sabato</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Domenica</span>
                <span>Chiuso</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-heading mb-4 text-cream">CONTATTI</h4>
            <div className="space-y-4 text-sand/80">
              <p className="flex flex-col">
                <span className="text-taupe mb-1">Indirizzo</span>
                <span>Via Roma, 26</span>
                <span>24047 Treviglio (BG)</span>
              </p>
              <p className="flex flex-col">
                <span className="text-taupe mb-1">Telefono</span>
                <a href="tel:+393332030586" className="hover:text-taupe transition-colors">333 203 0586</a>
              </p>
              <p className="flex flex-col">
                <span className="text-taupe mb-1">Email</span>
                <a href="mailto:ilsalonedilisa16@gmail.com" className="hover:text-taupe transition-colors">ilsalonedilisa16@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-taupe/20 mt-10 pt-6 text-sand/60 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Il salone di Lisa. Tutti i diritti riservati.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="hover:text-taupe transition-colors mr-6">Privacy Policy</a>
            <a href="#" className="hover:text-taupe transition-colors">Termini di Servizio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;