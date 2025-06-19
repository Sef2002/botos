import Cookies from 'js-cookie';

/**
 * Verifica il consenso dell'utente e carica gli script di tracking se autorizzato
 * Questa funzione deve essere chiamata nel componente principale dell'app
 */
export const loadConsentBasedScripts = (): void => {
  const consent = Cookies.get('cookie_consent');
  
  if (consent === 'accepted') {
    console.log('🍪 Consenso cookie accettato - Caricamento script di tracking...');
    
    // Carica Google Analytics
    loadGoogleAnalytics();
    
    // Qui puoi aggiungere altri script di tracking
    // loadFacebookPixel();
    // loadHotjar();
    
  } else if (consent === 'declined') {
    console.log('🚫 Consenso cookie rifiutato - Script di tracking disabilitati');
    
    // Opzionalmente, rimuovi eventuali script già caricati
    removeTrackingScripts();
    
  } else {
    console.log('⏳ Consenso cookie non ancora espresso');
  }
};

/**
 * Carica Google Analytics se il consenso è stato dato
 */
const loadGoogleAnalytics = (): void => {
  // Verifica se GA è già stato caricato
  if (window.gtag) {
    console.log('📊 Google Analytics già attivo');
    return;
  }

  // In ambiente di sviluppo, simula il caricamento
  if (import.meta.env.DEV) {
    console.log('🔧 [DEV] Google Analytics simulato - Script non caricato in sviluppo');
    return;
  }

  // Carica il vero script di Google Analytics in produzione
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!GA_MEASUREMENT_ID) {
    console.warn('⚠️ GA_MEASUREMENT_ID non configurato nelle variabili d\'ambiente');
    return;
  }

  try {
    // Carica lo script di Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => {
      console.log('✅ Google Analytics caricato con successo');
    };
    script.onerror = () => {
      console.error('❌ Errore nel caricamento di Google Analytics');
    };
    document.head.appendChild(script);

    // Inizializza Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true, // Anonimizza IP per GDPR
      cookie_flags: 'SameSite=Lax;Secure', // Cookie sicuri
    });

    console.log('📊 Google Analytics inizializzato');
    
  } catch (error) {
    console.error('❌ Errore nell\'inizializzazione di Google Analytics:', error);
  }
};

/**
 * Rimuove gli script di tracking se l'utente revoca il consenso
 */
const removeTrackingScripts = (): void => {
  // Rimuovi script Google Analytics
  const gaScripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
  gaScripts.forEach(script => script.remove());
  
  // Pulisci variabili globali
  if (window.gtag) {
    delete window.gtag;
  }
  if (window.dataLayer) {
    window.dataLayer.length = 0;
  }
  
  console.log('🧹 Script di tracking rimossi');
};

/**
 * Ottiene lo stato attuale del consenso
 */
export const getConsentStatus = (): 'accepted' | 'declined' | 'pending' => {
  const consent = Cookies.get('cookie_consent');
  
  if (consent === 'accepted') return 'accepted';
  if (consent === 'declined') return 'declined';
  return 'pending';
};

/**
 * Revoca il consenso e rimuove tutti i cookie e script di tracking
 */
export const revokeConsent = (): void => {
  Cookies.remove('cookie_consent', { path: '/' });
  removeTrackingScripts();
  
  // Rimuovi eventuali cookie di tracking esistenti
  const trackingCookies = ['_ga', '_gid', '_gat', '_fbp', '_fbc'];
  trackingCookies.forEach(cookieName => {
    Cookies.remove(cookieName, { path: '/' });
    Cookies.remove(cookieName, { path: '/', domain: `.${window.location.hostname}` });
  });
  
  console.log('🗑️ Consenso revocato e cookie di tracking rimossi');
};

// Estendi il tipo Window per TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}