import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-cover bg-center border-t border-gray-800 mt-16"
      style={{ backgroundImage: "url('assets/lisabackground.png')" }}
    >
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-2xl font-heading mb-4 text-white">IL SALONE DI LISA</h4>
            <p className="text-gray-400 mb-6">
              Il miglior salone nella città di Treviglio, dove tradizione e modernità si incontrano per offrire servizi di altissima qualità.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-heading mb-4 text-white">ORARI</h4>
            <div className="space-y-2 text-gray-400">
              {[
                ['Lunedì', '10:00 - 19:00'],
                ['Martedì', '10:00 - 19:00'],
                ['Mercoledì', '10:00 - 19:00'],
                ['Giovedì', '10:00 - 19:00'],
                ['Venerdì', '10:00 - 19:00'],
                ['Sabato', '09:00 - 18:00'],
                ['Domenica', 'Chiuso'],
              ].map(([day, hours], idx) => (
                <div
                  key={idx}
                  className={`flex justify-between ${idx < 6 ? 'border-b border-gray-800' : ''} pb-2`}
                >
                  <span>{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-heading mb-4 text-white">CONTATTI</h4>
            <div className="space-y-4 text-gray-400">
              <p className="flex flex-col">
                <span className="text-gold mb-1">Indirizzo</span>
                <span>Via Roma, 26</span>
                <span>24047 Treviglio BG</span>
              </p>
              <p className="flex flex-col">
                <span className="text-gold mb-1">Telefono</span>
                <a href="tel:0363701142" className="hover:text-gold transition-colors">0363 701142</a>
              </p>
              <p className="flex flex-col">
                <span className="text-gold mb-1">Email</span>
                <a href="mailto:ilsalonedilisa16@gmail.com" className="hover:text-gold transition-colors">ilsalonedilisa16@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Il Salone di Lisa. Tutti i diritti riservati.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors mr-6">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Termini di Servizio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;