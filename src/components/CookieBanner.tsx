import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Cookie, X } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già espresso una preferenza
    const consent = Cookies.get('cookie_consent');
    
    if (!consent) {
      // Mostra il banner con un piccolo delay per l'animazione
      setTimeout(() => {
        setShowBanner(true);
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    // Imposta il cookie di consenso con attributi GDPR compliant
    Cookies.set('cookie_consent', 'accepted', {
      expires: 365, // 1 anno
      path: '/',
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:'
    });
    
    // Nascondi il banner con animazione
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
    
    // Carica immediatamente gli script di tracking
    loadConsentBasedScripts();
  };

  const handleDecline = () => {
    // Imposta il cookie di rifiuto
    Cookies.set('cookie_consent', 'declined', {
      expires: 365,
      path: '/',
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:'
    });
    
    // Nascondi il banner
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  // Funzione per caricare script basati sul consenso
  const loadConsentBasedScripts = () => {
    const consent = Cookies.get('cookie_consent');
    
    if (consent === 'accepted') {
      // Simula il caricamento di Google Analytics
      console.log('🍪 Google Analytics attivato - Consenso ricevuto');
      
      // In produzione, qui caricheresti il vero script GA:
      /*
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
      */
    } else {
      console.log('🚫 Tracking disabilitato - Consenso non fornito');
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay per accessibilità */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      
      {/* Banner Cookie */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <div className="bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border-t-2 border-gold shadow-2xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
              
              {/* Icona e Contenuto */}
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0 w-12 h-12 bg-gold bg-opacity-20 rounded-full flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-gold" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 
                    id="cookie-banner-title" 
                    className="text-lg font-heading font-semibold text-white mb-2"
                  >
                    Gestione Cookie
                  </h3>
                  <p 
                    id="cookie-banner-description" 
                    className="text-gray-300 text-sm leading-relaxed"
                  >
                    Questo sito utilizza cookie per migliorare l'esperienza. Accetti i cookie per statistiche anonime?
                  </p>
                  
                  {/* Link Privacy Policy */}
                  <div className="mt-2">
                    <a 
                      href="/privacy-policy" 
                      className="text-gold hover:text-white text-xs underline transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Leggi la Privacy Policy
                    </a>
                  </div>
                </div>
              </div>

              {/* Pulsanti di Azione */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Rifiuta i cookie"
                >
                  Rifiuta
                </button>
                
                <button
                  onClick={handleAccept}
                  className="px-6 py-3 bg-gold text-black rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black shadow-lg"
                  aria-label="Accetta i cookie"
                >
                  Accetta Cookie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieBanner;