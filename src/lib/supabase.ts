
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hwbrvzrxngbhbrgfkgxm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3YnJ2enJ4bmdiaGJyZ2ZrZ3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDE3MjcsImV4cCI6MjA1NzE3NzcyN30.johaJIu9MIyfgJwjds5t7rqZe95EKRO9Tv6VIaPiFHE';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize database tables if they don't exist
export const initializeTables = async () => {
  try {
    // Check if 'contacts' table exists, create it if it doesn't
    const { error: contactsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'contacts',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        name text not null,
        phone text not null,
        location text not null,
        reason text not null,
        time text not null,
        created_at timestamp with time zone default now()
      `
    });

    if (contactsError) {
      console.error('Error creating contacts table:', contactsError);
    }

    // Check if 'calls' table exists, create it if it doesn't
    const { error: callsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'calls',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        phone text not null,
        call_time timestamp with time zone default now(),
        source text,
        notes text
      `
    });

    if (callsError) {
      console.error('Error creating calls table:', callsError);
    }
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
};

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
