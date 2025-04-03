// WRP-11: Supabase Integration + Query Optimization Simulation

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// ✅ Your actual project credentials
const supabaseUrl = 'https://gnifkithkysdukuudzcq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaWZraXRoa3lzZHVrdXVkemNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2OTg2OTQsImV4cCI6MjA1OTI3NDY5NH0.I2KhAme9hyVppJKru5_7ZFoDs1qL1tt1DhM_A8bkxk4';

const supabase = createClient(supabaseUrl, supabaseKey);

// ❌ Bad query: fetch all users, filter in frontend
async function getActiveUsersBad() {
  console.time("bad-query");

  const { data, error } = await supabase
    .from("public.users")
    .select("*");

  if (error) {
    console.error("❌ Bad query error:", error);
    return;
  }

  const activeUsers = data.filter(user => user.is_active);
  console.timeEnd("bad-query");
  console.log("⚠️ Active users (bad query - frontend filter):", activeUsers);
}

// ✅ Good query: filter directly in Supabase (DB-side)
async function getActiveUsersOptimized() {
  console.time("good-query");

  const { data, error } = await supabase
    .from("pubic.users")
    .select("*")
    .eq("is_active", null);

  if (error) {
    console.error("❌ Optimized query error:", error);
    return;
  }
  console.timeEnd("good-query");
  console.log("✅ Active users (optimized - DB filter):", data);
}

// 🚀 Run both for benchmark comparison
getActiveUsersBad();
getActiveUsersOptimized();
