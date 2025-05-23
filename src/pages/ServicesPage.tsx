import React, { useEffect } from 'react';

const ServicesPage: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          setTimeout(() => {
            el.classList.add('active');
          }, index * 100);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      category: 'Taglio di Capelli',
      items: [
        { name: 'Taglio Donna', description: 'Taglio personalizzato secondo la morfologia del viso e la texture dei capelli', price: '€35' },
        { name: 'Taglio con Consulenza Personalizzata', description: 'Consulenza approfondita e taglio studiato per valorizzare i tuoi lineamenti', price: '€45' },
        { name: 'Taglio Restyling', description: 'Cambio look completo con consulenza e studio del nuovo stile', price: '€50' },
        { name: 'Taglio Spuntatura / Mantenimento', description: 'Mantenimento della forma con leggera spuntatura', price: '€25' },
        { name: 'Taglio Bambina / Teen', description: 'Taglio dedicato alle più giovani, con attenzione particolare alla praticità', price: '€25' },
        { name: 'Taglio Frangia', description: 'Taglio o sistemazione della frangia', price: '€15' }
      ]
    },
    {
      category: 'Servizi Styling',
      items: [
        { name: 'Piega Professionale', description: 'Piega con prodotti professionali e finish personalizzato', price: '€25' },
        { name: 'Piega con Piastra / Ferro', description: 'Styling elaborato con strumenti termici professionali', price: '€35' },
        { name: 'Acconciatura per Eventi', description: 'Acconciatura elegante per cerimonie ed eventi speciali', price: '€60' },
        { name: 'Piega con Trattamento Idratante', description: 'Piega con applicazione di trattamento intensivo idratante', price: '€35' },
        { name: 'Piega Veloce (Express)', description: 'Piega rapida per un look naturale', price: '€20' },
        { name: 'Laminazione Capelli', description: 'Trattamento illuminante che dona lucentezza e disciplina', price: '€80' }
      ]
    },
    {
      category: 'Pacchetti Combinati',
      items: [
        { name: 'Taglio + Piega', description: 'Servizio completo di taglio e piega professionale', price: '€55' },
        { name: 'Colore + Piega', description: 'Colorazione personalizzata con piega finale', price: '€75' },
        { name: 'Taglio + Colore + Piega', description: 'Servizio completo di taglio, colore e piega', price: '€95' },
        { name: 'Balayage + Tonalizzante + Piega', description: 'Tecnica di schiaritura naturale con tonalizzazione', price: '€120' },
        { name: 'Piega + Trattamento Ristrutturante', description: 'Trattamento intensivo con piega finale', price: '€50' },
        { name: 'Acconciatura + Trucco Evento', description: 'Look completo per eventi speciali', price: '€90' }
      ]
    },
    {
      category: 'Trattamenti Speciali',
      items: [
        { name: 'Trattamenti Lifting Anti Età', description: 'Trattamento innovativo per capelli danneggiati e stressati', price: '€85' },
        { name: 'Lipo - Draining Bodywrap', description: 'Trattamento drenante e detossinante per il cuoio capelluto', price: '€70' },
        { name: 'Shine On', description: 'Trattamento illuminante per capelli spenti e opachi', price: '€55' },
        { name: 'Nanoplex Arginina', description: 'Trattamento ristrutturante profondo con tecnologia Nanoplex', price: '€90' },
        { name: 'Wondher Repair', description: 'Trattamento riparatore intensivo per capelli molto danneggiati', price: '€75' },
        { name: 'Massaggio Kobido con Coppettazione', description: 'Massaggio tradizionale giapponese per il viso e cuoio capelluto', price: '€65' }
      ]
    }
  ];

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10 fade-in">
            <h5 className="text-gold tracking-widest uppercase mb-2">I Nostri Servizi</h5>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 text-gold">SERVIZI PREMIUM</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Esplora la nostra gamma completa di servizi, accuratamente progettati per offrire un'esperienza ineguagliabile e risultati impeccabili.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {services.map((category, idx) => (
              <div key={idx} className="fade-in">
                <h2 className="text-3xl font-heading text-gold mb-8 pb-2 border-b border-gold">
                  {category.category}
                </h2>
                <div className="space-y-0">
                  {category.items.map((service, index) => (
                    <div key={index} className="service-item">
                      <div>
                        <h3 className="text-xl font-heading mb-1">{service.name}</h3>
                        <p className="text-gray-400 text-sm">{service.description}</p>
                      </div>
                      <div className="text-gold text-xl font-heading ml-4">
                        {service.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fade-in p-8 border border-gray-800 hover:border-gold transition-all">
              <h3 className="text-2xl font-heading mb-4">Su Appuntamento</h3>
              <p className="text-gray-400 mb-6">
                Per garantire un servizio personalizzato e di qualità, lavoriamo esclusivamente su appuntamento. Prenota in anticipo per assicurarti il tuo posto.
              </p>
            </div>
            <div className="fade-in p-8 border border-gray-800 hover:border-gold transition-all">
              <h3 className="text-2xl font-heading mb-4">Prodotti Premium</h3>
              <p className="text-gray-400 mb-6">
                Utilizziamo solo prodotti di alta qualità, selezionati per le loro prestazioni superiori e formulazioni rispettose della pelle.
              </p>
            </div>
            <div className="fade-in p-8 border border-gray-800 hover:border-gold transition-all">
              <h3 className="text-2xl font-heading mb-4">Abbonamenti</h3>
              <p className="text-gray-400 mb-6">
                Offriamo piani di abbonamento mensili e trimestrali per chi desidera mantenere un look impeccabile con un risparmio sostanziale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="max-w-2xl mx-auto fade-in">
            <h2 className="text-4xl font-heading font-bold mb-6">Pronto per un'Esperienza Premium?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Prenota il tuo appuntamento oggi stesso e scopri perché siamo il salone più rinomato della città.
            </p>
            <a href="#" className="btn btn-primary text-lg px-8 py-3">PRENOTA ORA</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;