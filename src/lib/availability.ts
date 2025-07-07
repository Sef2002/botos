// src/lib/availability.ts
import { supabase } from './supabase';

interface Slot {
  label: string;
  value: string;
}

interface EdgeFunctionResponse {
  perfect: Slot[];
  standard: Slot[]; // Assuming 'standard' is the key for 'other' slots from the function
  overlapping: Slot[];
}

export async function getAvailableTimeSlots(
  barberId: string,
    date: string, // Expected format: "yyyy-MM-dd"
  duration: number // Duration in minutes
): Promise<{ perfect: Slot[]; other: Slot[]; overlapping: Slot[] }> {
  try {
    const { data, error } = await supabase.functions.invoke('overlapping-calendar-website', {
      body: {
        barberId,
        date,
        serviceDuration: duration, // Assuming the function expects 'serviceDuration'
        // Add any other parameters your function expects
      },
    });
    
     if (error) {
      console.error('Error calling Supabase function:', error);
      return { perfect: [], other: [], overlapping: [] };
    }

    // Assuming the function returns data in the structure:
    // { perfect: Slot[], standard: Slot[], overlapping: Slot[] }
    // We map 'standard' to 'other' to maintain compatibility with SelectTimeSlot.tsx for now
    const result = data as EdgeFunctionResponse;
    return {
      perfect: result.perfect || [],
      other: result.standard || [], // Map 'standard' to 'other'
      overlapping: result.overlapping || [],
    };

  } catch (e) {
    console.error('Exception calling Supabase function:', e);
    return { perfect: [], other: [], overlapping: [] };
  }
}