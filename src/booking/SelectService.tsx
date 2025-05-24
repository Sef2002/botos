import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors } from 'lucide-react';

const SelectService: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string>('');

  const services = [
    {
      id: 'taglio-donna',
      name: 'Taglio Donna',
      duration: '45 min',
      price: '€35',
      description: 'Taglio personalizzato secondo la morfologia del viso e la texture dei capelli'
    },
    {
      id: 'taglio-consulenza',
      name: 'Taglio con Consulenza',
      duration: '60 min',
      price: '€45',
      description: 'Consulenza approfondita e taglio studiato per valorizzare i tuoi lineamenti'
    },
    {
      id: 'taglio-restyling',
      name: 'Taglio Restyling',
      duration: '75 min',
      price: '€50',
      description: 'Cambio look completo con consulenza e studio del nuovo stile'
    }
  ];

  const handleContinue = () => {
    if (selectedService) {
      navigate('/prenota/barbiere', { state: { serviceId: selectedService } });
    }
  };

  return (
    <main className="pt-24">
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h5 className="text-gold tracking-widest uppercase mb-2">Prenota</h5>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">Scegli il Servizio</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Seleziona il servizio desiderato per iniziare il tuo percorso di bellezza
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-6 border ${
                    selectedService === service.id
                      ? 'border-gold bg-gold bg-opacity-10'
                      : 'border-gray-800 hover:border-gold'
                  } rounded-lg cursor-pointer transition-all`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-heading mb-2">{service.name}</h3>
                      <p className="text-gray-400 mb-2">{service.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gold">
                        <span>{service.duration}</span>
                        <span>{service.price}</span>
                      </div>
                    </div>
                    <Scissors
                      className={`w-6 h-6 ${
                        selectedService === service.id ? 'text-gold' : 'text-gray-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={handleContinue}
                disabled={!selectedService}
                className={`btn ${
                  selectedService ? 'btn-primary' : 'bg-gray-700 cursor-not-allowed'
                } text-lg px-8 py-3`}
              >
                Continua
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SelectService; 