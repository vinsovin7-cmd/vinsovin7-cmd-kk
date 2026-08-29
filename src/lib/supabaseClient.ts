import { createClient } from '@supabase/supabase-js';

// supabaseMain: User accounts, task metrics, front-end balances
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'mock_key';
export const supabaseMain = createClient(supabaseUrl, supabaseAnonKey);

// supabaseVault: Monetization logs, Solana yield splitting, Telegram webhooks
const vaultUrl = import.meta.env?.VITE_SUPABASE_VAULT_URL || supabaseUrl;
const vaultAnonKey = import.meta.env?.VITE_SUPABASE_VAULT_ANON_KEY || supabaseAnonKey;
export const supabaseVault = createClient(vaultUrl, vaultAnonKey);

// Default export for backward compatibility
export const supabase = supabaseMain;
