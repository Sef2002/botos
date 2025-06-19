import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { supabase } from '../lib/supabase';

const SelectTimeSlot = () => {
  const navigate = useNavigate();

  const selectedBarber = JSON.parse(localStorage.getItem('selectedBarber') || 'null');
  const storedServiceId = localStorage.getItem('selectedServiceId');

  const [date, setDate] = useState(new Date());
  const [perfectSlots, setPerfectSlots] = useState<{ label: string; value: string }[]>([]);
  const [otherSlots, setOtherSlots] = useState<{ label: string; value: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [duration, setDuration] = useState<number>(30);

  useEffect(() => {
    if (!storedServiceId) return;

    const fetchDuration = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('duration_min')
        .eq('id', storedServiceId)
        .single();

      if (!error && data?.duration_min) setDuration(data.duration_min);
    };

    fetchDuration();
  }, [storedServiceId]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!storedServiceId || !selectedBarber || selectedBarber === 'any') {
        setPerfectSlots([]);
        setOtherSlots([]);
        return;
      }

      const body = {
        business_id: selectedBarber.business_id,
        barber_id: selectedBarber.id,
        service_id: storedServiceId,
        date: format(date, 'yyyy-MM-dd'),
      };

      const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeXNqZGJkd3hoand4dWh0aHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDg2NTgsImV4cCI6MjA2Mjg4NDY1OH0.Z7hqDei0FJp-IUyNDX-rroJXlHYg3BrzUuzQXBJ6yxo';
      const finalKey = envKey || fallbackKey;

      console.log('🔑 ENV KEY FOUND?', !!envKey);
      console.log('📦 Payload:', body);

      try {
        const response = await fetch('https://tjysjdbdwxhjwxuhthzh.functions.supabase.co/functions/v1/dynamic-slots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${finalKey}`,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Fetch failed with status:', response.status, errorText);
          return;
        }

        const result = await response.json();
        console.log('✅ SLOT RESPONSE:', result);

        setPerfectSlots(result.perfect || []);
        setOtherSlots(result.other || []);
      } catch (error) {
        console.error('❌ Error fetching slots:', error);
      }
    };

    fetchSlots();
  }, [date, storedServiceId]);

  const handleSubmit = async () => {
    if (!selectedTime || !name || !phone || !storedServiceId) {
      return alert('Compila tutti i campi.');
    }

    const { error } = await supabase.from('appointments').insert({
      appointment_date: format(date, 'yyyy-MM-dd'),
      appointment_time: `${selectedTime}:00`,
      duration_min: duration,
      customer_name: name,
      customer_phone: phone,
      barber_id: selectedBarber?.id || null,
      service_id: storedServiceId,
    });

    if (error) {
      console.error(error);
      alert('Errore durante la prenotazione.');
    } else {
      localStorage.setItem('customerName', name);
      localStorage.setItem('selectedTime', selectedTime);
      localStorage.setItem('selectedDate', format(date, 'yyyy-MM-dd'));
      navigate('/prenota/successo');
    }
  };

  return (
    <main className="pt-24 bg-white min-h-screen">
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Seleziona giorno e orario</h1>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d as Date)}
            dateFormat="dd/MM/yyyy"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {perfectSlots.length === 0 && otherSlots.length === 0 && (
          <p className="text-center text-gray-500">Nessuno slot disponibile per questa data.</p>
        )}

        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Orari Perfetti</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {perfectSlots.map((slot) => (
              <button
                key={slot.value}
                onClick={() => setSelectedTime(slot.value)}
                className={`py-2 rounded border font-semibold ${
                  selectedTime === slot.value ? 'bg-gold text-white' : 'bg-white text-black border-black'
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4">Altri Orari</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {otherSlots.map((slot) => (
              <button
                key={slot.value}
                onClick={() => setSelectedTime(slot.value)}
                className={`py-2 rounded border font-semibold ${
                  selectedTime === slot.value ? 'bg-gold text-white' : 'bg-gray-100 text-black border-gray-400'
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Telefono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-900"
            >
              Conferma Prenotazione
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SelectTimeSlot;