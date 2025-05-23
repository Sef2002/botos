import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';

const ConfirmBooking: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const availableTimes = [
    '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && formData.name && formData.email && formData.phone) {
      navigate('/prenota/successo', {
        state: {
          ...location.state,
          date: selectedDate,
          time: selectedTime,
          customer: formData
        }
      });
    }
  };

  return (
    <main className="pt-24">
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h5 className="text-gold tracking-widest uppercase mb-2">Prenota</h5>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">Conferma Prenotazione</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Seleziona data e orario e inserisci i tuoi dati per completare la prenotazione
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="space-y-8">
              {/* Date Selection */}
              <div className="bg-black p-6 border border-gray-800 rounded-lg">
                <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                  <Calendar className="text-gold" />
                  <span>Seleziona Data</span>
                </h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-gray-800 text-white p-3 rounded-lg focus:border-gold focus:outline-none"
                  required
                />
              </div>

              {/* Time Selection */}
              <div className="bg-black p-6 border border-gray-800 rounded-lg">
                <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                  <Clock className="text-gold" />
                  <span>Seleziona Orario</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 text-center rounded-lg transition-all ${
                        selectedTime === time
                          ? 'bg-gold text-black'
                          : 'bg-zinc-900 border border-gray-800 hover:border-gold'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-black p-6 border border-gray-800 rounded-lg">
                <h3 className="text-xl font-heading mb-4">I Tuoi Dati</h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <User size={16} className="text-gold" />
                      Nome e Cognome
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-gray-800 text-white p-3 rounded-lg focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <Mail size={16} className="text-gold" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-gray-800 text-white p-3 rounded-lg focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <Phone size={16} className="text-gold" />
                      Telefono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-900 border border-gray-800 text-white p-3 rounded-lg focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <button
                type="submit"
                className="btn btn-primary text-lg px-8 py-3"
              >
                Conferma Prenotazione
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ConfirmBooking;