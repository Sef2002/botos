import React, { useState } from 'react';
import { Settings, Cookie, Shield, Eye } from 'lucide-react';
import { getConsentStatus, revokeConsent, loadConsentBasedScripts } from '../utils/cookieConsent';
import Cookies from 'js-cookie';

/**
 * Componente opzionale per gestire le impostazioni privacy
 * Può essere integrato in una pagina dedicata o in un modal
 */
const PrivacySettings: React.FC = () => {
  const [consentStatus, setConsentStatus] = useState(getConsentStatus());
  const [showDetails, setShowDetails] = useState(false);

  const handleAcceptCookies = () => {
    Cookies.set('cookie_consent', 'accepted', {
      expires: 365,
      path: '/',
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:'
    });
    setConsentStatus('accepted');
    loadConsentBasedScripts();
  };

  const handleDeclineCookies = () => {
    Cookies.set('cookie_consent', 'declined', {
      expires: 365,
      path: '/',
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:'
    });
    setConsentStatus('declined');
  };

  const handleRevokeCookies = () => {
    revokeConsent();
    setConsentStatus('pending');
  };

  const getStatusColor = () => {
    switch (consentStatus) {
      case 'accepted': return 'text-green-400';
      case 'declined': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getStatusText = () => {
    switch (consentStatus) {
      case 'accepted': return 'Cookie accettati';
      case 'declined': return 'Cookie rifiutati';
      default: return 'Consenso in attesa';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-zinc-900 rounded-lg border border-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-gold" />
        <h2 className="text-2xl font-heading font-bold text-white">
          Impostazioni Privacy
        </h2>
      </div>

      {/* Stato Attuale */}
      <div className="bg-black p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gold" />
            <span className="text-white font-medium">Stato attuale:</span>
          </div>
          <span className={`font-semibold ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Dettagli Cookie */}
      <div className="mb-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-gold hover:text-white transition-colors mb-4"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">
            {showDetails ? 'Nascondi dettagli' : 'Mostra dettagli sui cookie'}
          </span>
        </button>

        {showDetails && (
          <div className="bg-black p-4 rounded-lg space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Cookie className="w-4 h-4 text-gold" />
                Cookie Essenziali
              </h4>
              <p className="text-sm text-gray-400">
                Necessari per il funzionamento del sito. Non possono essere disabilitati.
              </p>
              <ul className="text-xs text-gray-500 mt-2 ml-4">
                <li>• cookie_consent - Memorizza le tue preferenze sui cookie</li>
                <li>• Sessione di navigazione - Mantiene lo stato dell'applicazione</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Cookie Analitici</h4>
              <p className="text-sm text-gray-400">
                Ci aiutano a capire come i visitatori interagiscono con il sito raccogliendo informazioni anonime.
              </p>
              <ul className="text-xs text-gray-500 mt-2 ml-4">
                <li>• Google Analytics - Statistiche anonime di utilizzo</li>
                <li>• Durata: 2 anni</li>
                <li>• Dati: Pagine visitate, tempo di permanenza, dispositivo utilizzato</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Azioni */}
      <div className="space-y-3">
        {consentStatus === 'pending' && (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAcceptCookies}
              className="flex-1 bg-gold text-black px-4 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
            >
              Accetta Cookie Analitici
            </button>
            <button
              onClick={handleDeclineCookies}
              className="flex-1 bg-transparent border border-gray-600 text-gray-300 px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
            >
              Rifiuta Cookie Analitici
            </button>
          </div>
        )}

        {consentStatus !== 'pending' && (
          <div className="flex flex-col sm:flex-row gap-3">
            {consentStatus === 'declined' && (
              <button
                onClick={handleAcceptCookies}
                className="flex-1 bg-gold text-black px-4 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
              >
                Accetta Cookie
              </button>
            )}
            {consentStatus === 'accepted' && (
              <button
                onClick={handleDeclineCookies}
                className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-all"
              >
                Rifiuta Cookie
              </button>
            )}
            <button
              onClick={handleRevokeCookies}
              className="flex-1 bg-transparent border border-gray-600 text-gray-300 px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
            >
              Revoca Consenso
            </button>
          </div>
        )}
      </div>

      {/* Informazioni Legali */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 leading-relaxed">
          In conformità al GDPR (Regolamento Generale sulla Protezione dei Dati), 
          hai il diritto di controllare l'uso dei tuoi dati. Puoi modificare le tue 
          preferenze in qualsiasi momento. I cookie essenziali rimangono attivi per 
          garantire il corretto funzionamento del sito.
        </p>
      </div>
    </div>
  );
};

export default PrivacySettings;