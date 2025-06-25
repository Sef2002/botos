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

      try {
        const response = await fetch('https://tjysjdbdwxhjwxuhthzh.functions.supabase.co/dynamic-slots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeXNqZGJkd3hoand4dWh0aHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDg2NTgsImV4cCI6MjA2Mjg4NDY1OH0.Z7hqDei0FJpIUyNDX-rroJXlHYg3BrzUuzQXBJ6yxo',
          },
          body: JSON.stringify(body),
        });

        const result = await response.json();
        setPerfectSlots(result.perfect || []);
        setOtherSlots(result.other || []);
      } catch (error) {
        console.error('Error fetching slots:', error);
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
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Scegli l'orario</h1>

        <div className="mb-6 flex justify-center">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date!)}
            dateFormat="dd/MM/yyyy"
            className="border rounded p-2 text-black"
          />
        </div>

        {perfectSlots.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Orari perfetti</h3>
            <div className="grid grid-cols-3 gap-2">
              {perfectSlots.map((slot) => (
                <button
                  key={slot.value}
                  className={`border rounded p-2 text-sm ${
                    selectedTime === slot.value ? 'bg-[#5D4037] text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTime(slot.value)}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {otherSlots.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Altri orari disponibili</h3>
            <div className="grid grid-cols-3 gap-2">
              {otherSlots.map((slot) => (
                <button
                  key={slot.value}
                  className={`border rounded p-2 text-sm ${
                    selectedTime === slot.value ? 'bg-[#5D4037] text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTime(slot.value)}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {perfectSlots.length === 0 && otherSlots.length === 0 && (
          <p className="text-center text-gray-500 mb-6">Nessun orario disponibile</p>
        )}

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2 text-black"
          />
          <input
            type="tel"
            placeholder="Telefono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded p-2 text-black"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-[#5D4037] text-white px-6 py-2 rounded shadow w-full"
        >
          Conferma Prenotazione
        </button>
      </div>
    </main>
  );
};

export default SelectTimeSlot;