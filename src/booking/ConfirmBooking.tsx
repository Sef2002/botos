import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Popover } from '@headlessui/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

const ConfirmBooking: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: ''
  });

  const availableTimes = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && formData.name && formData.email && formData.phone) {
      navigate('/prenota/successo', {
        state: {
          ...location.state,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
          customer: formData
        }
      });
    }
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isToday = isSameDay(cloneDay, new Date());
        const isSelected = selectedDate && isSameDay(cloneDay, selectedDate);

        days.push(
          <div
            key={cloneDay.toString()}
            className={`text-center p-2 rounded-lg cursor-pointer text-sm transition-all
              ${
                !isSameMonth(cloneDay, monthStart)
                  ? 'text-gray-500'
                  : isSelected
                  ? 'bg-gold text-black'
                  : 'text-white hover:bg-gold hover:text-black'
              }`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            {format(cloneDay, 'd')}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="bg-zinc-900 p-4 rounded-lg shadow-lg border border-gray-800 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft className="text-gold w-5 h-5" />
          </button>
          <span className="text-white font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight className="text-gold w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 text-xs text-center text-gold mb-1">
          {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        {rows}
      </div>
    );
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
              {/* Custom Calendar Picker */}
              <div className="bg-black p-6 border border-gray-800 rounded-lg">
                <h3 className="text-xl font-heading mb-4 flex items-center gap-2">
                  <Calendar className="text-gold" />
                  <span>Seleziona Data</span>
                </h3>
                <Popover className="relative">
                  <Popover.Button className="w-full bg-zinc-900 border border-gray-800 text-white p-3 rounded-lg text-left flex justify-between items-center">
                    {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'gg/mm/aaaa'}
                    <Calendar className="w-4 h-4 text-gold" />
                  </Popover.Button>
                  <Popover.Panel className="absolute z-10 mt-2">{renderCalendar()}</Popover.Panel>
                </Popover>
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
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <Calendar size={16} className="text-gold" />
                      Data di Nascita (opzionale)
                    </label>
                    <input
                      type="date"
                      value={formData.birthdate}
                      onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                      className="w-full bg-zinc-900 border border-gray-800 text-white p-3 rounded-lg focus:border-gold focus:outline-none"
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