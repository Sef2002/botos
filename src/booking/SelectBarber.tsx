import { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";
import { useNavigate } from 'react-router-dom';

const SelectBarber = () => {
  const [barbers, setBarbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBarbers = async () => {
      const { data, error } = await supabase.from('barbers').select('*');
      if (!error) setBarbers(data || []);
      setLoading(false);
    };
    fetchBarbers();
  }, []);

  const handleSelect = (barber: any | 'any') => {
    localStorage.setItem('selectedBarberId', barber.id);
    navigate('/prenota/orario');
  };

  return (
    <main className="pt-24 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h5 className="text-gray-600 tracking-widest uppercase mb-2 font-primary">Prenota il tuo servizio</h5>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6 text-black">SCEGLI IL PROFESSIONISTA</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-primary">
              Seleziona il professionista che preferisci per il tuo servizio, oppure lascia che sia il nostro team a scegliere il migliore disponibile per te.
            </p>
          </div>
        </div>
      </section>

      {/* Staff Selection */}
      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              <p className="mt-4 text-gray-600 font-primary">Caricamento staff...</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Any Available Staff Option */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading font-bold text-black mb-2">Opzione Consigliata</h2>
                <div className="w-20 h-[2px] bg-gold mx-auto mb-6"></div>
                
                <button
                  onClick={() => handleSelect('any')}
                  className="group w-full bg-gold border-2 border-gold rounded-lg p-8 text-left transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.121M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold text-black mb-2">
                        Qualsiasi Staff Disponibile
                      </h3>
                      <p className="text-black font-primary leading-relaxed">
                        Lascia che sia il nostro team a scegliere il professionista più adatto e disponibile per il tuo servizio. 
                        Tutti i nostri esperti garantiscono la massima qualità.
                      </p>
                      <div className="mt-4 flex items-center text-black">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-primary font-semibold">Scelta Consigliata</span>
                      </div>
                    </div>
                    <div className="text-black group-hover:translate-x-1 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>

              {/* Individual Staff Members */}
              {barbers.length > 0 && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-heading font-bold text-black mb-2">Scegli un Professionista Specifico</h2>
                    <div className="w-20 h-[2px] bg-gold mx-auto mb-4"></div>
                    <p className="text-gray-600 font-primary">
                      Oppure seleziona direttamente il professionista che preferisci
                    </p>
                  </div>

                  <div className="space-y-4">
                    {barbers.map((barber) => (
                      <button
                        key={barber.id}
                        onClick={() => handleSelect(barber)}
                        className="group w-full bg-white border-2 border-black rounded-lg p-6 text-left transition-all duration-300 hover:border-gold hover:shadow-lg"
                      >
                        <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {barber.avatar_url ? (
                              <img 
                                src={barber.avatar_url} 
                                alt={barber.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-heading font-bold text-black group-hover:text-gold transition-colors mb-1">
                              {barber.name}
                            </h3>
                            {barber.role && (
                              <p className="text-gray-600 font-primary text-sm mb-2">
                                {barber.role}
                              </p>
                            )}
                            {barber.specialty && (
                              <p className="text-gray-600 font-primary text-sm">
                                Specializzato in: {barber.specialty}
                              </p>
                            )}
                          </div>
                          <div className="text-gold group-hover:translate-x-1 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-bold mb-4 text-black">Hai bisogno di aiuto?</h3>
            <p className="text-gray-600 font-primary mb-6">
              Non sei sicuro di quale professionista scegliere? Il nostro staff è altamente qualificato e saremo felici di consigliarti.
            </p>
            <a 
              href="tel:0363660248" 
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg font-primary font-semibold hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Chiamaci: 0363 660248
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SelectBarber;