import { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAvailableTimeSlots } from '../lib/availability';

const SelectTimeSlot = () => {
  const navigate = useNavigate();
  const selectedBarber = JSON.parse(localStorage.getItem('selectedBarber') || '"any"');
  const storedServiceId = localStorage.getItem('selectedServiceId');

  const [date, setDate] = useState(new Date());
  const [perfectSlots, setPerfectSlots] = useState<{ label: string; value: string }[]>([]);
  const [otherSlots, setOtherSlots] = useState<{ label: string; value: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [duration, setDuration] = useState(30); // default fallback

  useEffect(() => {
    if (!storedServiceId) return;

    const fetchServiceDuration = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('duration_min')
        .eq('id', storedServiceId)
        .single();

      if (!error && data?.duration_min) {
        setDuration(data.duration_min);
      }
    };

    fetchServiceDuration();
  }, [storedServiceId]);

  useEffect(() => {
    if (!storedServiceId || !selectedBarber || selectedBarber === 'any') {
      setPerfectSlots([]);
      setOtherSlots([]);
      return;
    }

    const dateStr = format(date, 'yyyy-MM-dd');
    getAvailableTimeSlots(selectedBarber.id, dateStr, duration).then((result) => {
      setPerfectSlots(result.perfect);
      setOtherSlots(result.other);
    });
  }, [date, duration]);

  const checkIfSlotAvailable = async (barberId: string, dateStr: string, time: string, duration: number) => {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('appointment_time, duration_min')
      .eq('appointment_date', dateStr)
      .eq('barber_id', barberId);

    if (error) return false;

    const toMinutes = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };

    const slotStart = toMinutes(time);
    const slotEnd = slotStart + duration;

    return !(appointments || []).some(appt => {
      const start = toMinutes(appt.appointment_time);
      const end = start + appt.duration_min;
      return slotStart < end && slotEnd > start;
    });
  };

  const handleSubmit = async () => {
    if (!selectedTime || !name || !phone || !storedServiceId) {
      return alert('Compila tutti i campi.');
    }

    const dateStr = format(date, 'yyyy-MM-dd');
    const barberId = selectedBarber === 'any' ? null : selectedBarber.id;

    if (barberId) {
      const isAvailable = await checkIfSlotAvailable(barberId, dateStr, selectedTime, duration);
      if (!isAvailable) return alert("L'orario selezionato non è più disponibile. Riprova.");
    }

    const { error } = await supabase.from('appointments').insert({
      appointment_date: dateStr,
      appointment_time: `${selectedTime}:00`,
      duration_min: duration,
      customer_name: name,
      phone,
      barber_id: barberId,
      service_id: storedServiceId,
    });

    if (error) {
      console.error(error);
      alert('Errore durante la prenotazione.');
    } else {
      localStorage.setItem('customerName', name);
      localStorage.setItem('selectedTime', selectedTime);
      localStorage.setItem('selectedDate', dateStr);
      navigate('/prenota/successo');
    }
  };

  return (
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

      {/* Slot Rendering */}
      {perfectSlots.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2 text-center">ORARI DISPONIBILI CONSIGLIATI</h2>
          <div className="grid grid-cols-3 gap-2 mb-6">
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
        </>
      )}

      {(otherSlots.length > 0 || perfectSlots.length === 0) && (
        <>
          <h2 className="text-lg font-semibold mb-2 text-center">
            {perfectSlots.length > 0 ? 'ALTRI ORARI DISPONIBILI' : 'ORARI DISPONIBILI'}
          </h2>
          <div className="grid grid-cols-3 gap-2 mb-6">
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
            {perfectSlots.length === 0 && otherSlots.length === 0 && (
              <p className="col-span-3 text-center text-gray-500">Nessun orario disponibile</p>
            )}
          </div>
        </>
      )}

      {/* Form */}
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
  );
};

export default SelectTimeSlot;