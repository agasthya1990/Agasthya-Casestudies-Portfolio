// WRP-11: Supabase Integration + Query Optimization Simulation

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Replace with your actual project values from Supabase → Project → API
const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co';
const supabaseKey = 'YOUR_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// ❌ BAD query: fetch all users, filter on frontend
console.time("bad-query");

async function getActiveUsersBad() {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) {
    console.error("Bad query error:", error);
    return;
  }

  const activeUsers = data.filter(user => user.is_active);
  console.timeEnd("bad-query");
  console.log("Active users (bad query - frontend filter):", activeUsers);
}

// ✅ GOOD query: filter at DB level
console.time("good-query");

async function getActiveUsersOptimized() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("is_active", true);

  if (error) {
    console.error("Optimized query error:", error);
    return;
  }

  console.timeEnd("good-query");
  console.log("Active users (optimized - DB filter):", data);
}

// Run both queries
getActiveUsersBad();
getActiveUsersOptimized();
