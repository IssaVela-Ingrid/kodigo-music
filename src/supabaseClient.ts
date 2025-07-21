// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Accede a las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Opcional: Añadir una verificación para desarrollo
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Las variables de entorno de Supabase no están configuradas. Asegúrate de tener VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env.local');
  // Podrías lanzar un error o usar valores predeterminados para evitar que la app falle
  // throw new Error('Supabase credentials are not set');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);