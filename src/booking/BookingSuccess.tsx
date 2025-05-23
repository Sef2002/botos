import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User } from 'lucide-react';

const BookingSuccess: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state;

  return (
    <main className="pt-24">
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-gold mx-auto mb-6" />
              <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Prenotazione Confermata!</h1>
              <p className="text-lg text-gray-300">
                Grazie per aver scelto Le Jolie. Ti aspettiamo per il tuo appuntamento.
              </p>
            </div>

            <div className="bg-black p-8 border border-gray-800 rounded-lg mb-8">
              <h2 className="text-2xl font-heading mb-6">Dettagli Prenotazione</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-center">
                  <Calendar className="text-gold" />
                  <span>{bookingData?.date}</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <Clock className="text-gold" />
                  <span>{bookingData?.time}</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <User className="text-gold" />
                  <span>{bookingData?.customer?.name}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300">
                Abbiamo inviato una email di conferma a {bookingData?.customer?.email} con tutti i dettagli della prenotazione.
              </p>
              <p className="text-gray-300">
                Per qualsiasi domanda o modifica, non esitare a contattarci.
              </p>
            </div>

            <div className="mt-10 space-x-4">
              <Link to="/" className="btn btn-primary">
                Torna alla Home
              </Link>
              <Link to="/servizi" className="btn btn-outline">
                Esplora Altri Servizi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookingSuccess;