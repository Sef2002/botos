import { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

    const fetchSlots = async () => {
      const dateStr = format(date, 'yyyy-MM-dd');

      const res = await fetch('https://tjysjdbdwxhjwxuhthzh.functions.supabase.co/dynamic-slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          business_id: '[TUO_BUSINESS_ID]',
          barber_id: selectedBarber.id,
          service_id: storedServiceId,
          date: dateStr,
        }),
      });

      const data = await res.json();
      setPerfectSlots(data.perfect || []);
      setOtherSlots(data.other || []);
    };

    fetchSlots();
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
      customer_phone: phone,
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
    <main className="pt-24 bg-white min-h-screen">
      {/* Tutto il rendering UI rimane invariato */}
      {/* ... lo mantieni esattamente come nel tuo codice attuale */}
    </main>
  );
};

export default SelectTimeSlot;