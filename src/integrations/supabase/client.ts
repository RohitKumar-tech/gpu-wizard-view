// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ikfnresmmqukhpfrrzpn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrZm5yZXNtbXF1a2hwZnJyenBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3ODY0NTcsImV4cCI6MjA2MjM2MjQ1N30.7C3bs0ONCVElj0jGKDNrgX1uQwhGedDMP8p9C-Cfib8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);