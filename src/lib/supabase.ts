
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hwbrvzrxngbhbrgfkgxm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3YnJ2enJ4bmdiaGJyZ2ZrZ3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDE3MjcsImV4cCI6MjA1NzE3NzcyN30.johaJIu9MIyfgJwjds5t7rqZe95EKRO9Tv6VIaPiFHE';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Track phone calls in the database
export const trackPhoneCall = async (source: string) => {
  try {
    const { error } = await supabase
      .from('calls')
      .insert([{ 
        phone: '+12768007201', 
        source: source 
      }]);
    
    if (error) {
      console.error('Error tracking phone call:', error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
