import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xnkkcpmdfpsktgrljytg.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhua2tjcG1kZnBza3RncmxqeXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNDYwNTAsImV4cCI6MjA2MjkyMjA1MH0.0qpqjnsXF0ux4NM-R8oJQ0Miquw1ciAHcY-eM0-6qN8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

