// WRP-11: Clean Supabase Integration (Post-Table Fix)

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Replace with your actual project values
const supabaseUrl = 'https://gnifkithkysdukuudzcq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaWZraXRoa3lzZHVrdXVkemNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2OTg2OTQsImV4cCI6MjA1OTI3NDY5NH0.I2KhAme9hyVppJKru5_7ZFoDs1qL1tt1DhM_A8bkxk4'; // Make sure it's your real anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// 🔍 Bad query: Fetch all users, filter on frontend
async function getActiveUsersBad() {
  console.time("bad-query");

  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) {
    console.error("❌ Bad query error:", error);
    return;
  }

  const activeUsers = data.filter(user => user.is_active);
  console.timeEnd("bad-query");
  console.log("⚠️ Active users (frontend filter):", activeUsers);
}

// ✅ Optimized query: Server-side filtering
async function getActiveUsersOptimized() {
  console.time("good-query");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("is_active", true);

  if (error) {
    console.error("❌ Optimized query error:", error);
    return;
  }

  console.timeEnd("good-query");
  console.log("✅ Active users (DB filter):", data);
}

getActiveUsersBad();
getActiveUsersOptimized();
