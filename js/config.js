// ============================
// SUPABASE CONFIG
// ============================

const supabaseClient = window.supabase.createClient(
  'https://laixkfncclwojayzwifa.supabase.co',
  'sb_publishable_YFaPUMHnFUMqsOmLbMn5qw_Lcgd5uFM'
);

window.supabaseClient = supabaseClient;