import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const notConfiguredError = new Error(
  'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a .env file.'
);

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        // Fallback stub so the app doesn't crash when env vars are missing
        from: () => ({
          insert: async () => ({ error: notConfiguredError }),
          select: () => ({
            order: () => ({ data: null, error: notConfiguredError }),
          }),
          delete: () => ({
            eq: async () => ({ error: notConfiguredError }),
          }),
        }),
        auth: {
          getSession: async () => ({ data: { session: null }, error: notConfiguredError }),
          signInWithPassword: async () => ({ data: null, error: notConfiguredError }),
          signOut: async () => ({ error: notConfiguredError }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        },
      };
