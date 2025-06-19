import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Service {
  id: number;
  name: string;
  description?: string;
  price?: number;
  duration_min?: number;
}

const SelectService = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { 
    const fetchServices = async () => {
      const { data, error } = await supabase.from('services').select('*');
      if (!error) {
        setServices(data as Service[] ?? []);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  const handleSelect = (service: Service) => {
    // Store only the ID, not the full object
    localStorage.setItem('selectedServiceId', service.id.toString());
    navigate('/prenota/barbiere');
  };

  // Group services by category based on their names
  const groupServicesByCategory = (services: Service[]) => {
    const categories: { [key: string]: Service[] } = {
      'Taglio & Styling': [],
      'Colore & Trattamenti': [],
      'Servizi Premium': [],
      'Altri Servizi': []
    };

    services.forEach(service => {
      const name = service.name?.toLowerCase() || '';
      
      if (name.includes('taglio') || name.includes('piega') || name.includes('styling')) {
        categories['Taglio & Styling'].push(service);
      } else if (name.includes('colore') || name.includes('colorazione') || name.includes('trattamento') || name.includes('maschera')) {
        categories['Colore & Trattamenti'].push(service);
      } else if (name.includes('premium') || name.includes('luxury') || name.includes('deluxe')) {
        categories['Servizi Premium'].push(service);
      } else {
        categories['Altri Servizi'].push(service);
      }
    });

    // Remove empty categories
    Object.keys(categories).forEach(key => {
      if (categories[key].length === 0) {
        delete categories[key];
      }
    });

    return categories;
  };

  const categorizedServices = groupServicesByCategory(services);

  return (
    <main className="pt-24 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h5 className="text-gray-600 tracking-widest uppercase mb-2 font-primary">Prenota il tuo servizio</h5>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6 text-black">SCEGLI IL SERVIZIO</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-primary">
              Seleziona il servizio che desideri prenotare. I nostri esperti ti offriranno un'esperienza personalizzata e di alta qualità.
            </p>
          </div>
        </div>
      </section>

      {/* Services Selection */}
      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              <p className="mt-4 text-gray-600 font-primary">Caricamento servizi...</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-12">
              {Object.entries(categorizedServices).map(([category, categoryServices]) => (
                <div key={category} className="space-y-6">
                  {/* Category Header */}
                  <div className="text-center">
                    <h2 className="text-2xl font-heading font-bold text-black mb-2">{category}</h2>
                    <div className="w-20 h-[2px] bg-gold mx-auto"></div>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categoryServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleSelect(service)}
                        className="group bg-white border-2 border-black rounded-lg p-6 text-left transition-all duration-300 hover:border-gold hover:shadow-lg"
                      >
                        <div className="space-y-4">
                          <h3 className="text-xl font-heading font-bold text-black group-hover:text-gold transition-colors">
                            {service.name}
                          </h3>
                          
                          {service.description && (
                            <p className="text-gray-600 font-primary leading-relaxed">
                              {service.description}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                            <div className="flex items-center space-x-4 text-sm font-primary">
                              {service.price !== undefined && (
                                <span className="bg-black text-white px-3 py-1 rounded-full font-bold">
                                  €{service.price}
                                </span>
                              )}
                              {service.duration_min !== undefined && (
                                <span className="text-gray-600 flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {service.duration_min} min
                                </span>
                              )}
                            </div>
                            
                            <div className="text-gold group-hover:translate-x-1 transition-transform">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
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
              Non sei sicuro di quale servizio scegliere? I nostri esperti sono a tua disposizione per consigliarti il trattamento più adatto alle tue esigenze.
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

export default SelectService;