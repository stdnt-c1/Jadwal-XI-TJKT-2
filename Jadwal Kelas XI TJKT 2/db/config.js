import { createClient } from '@supabase/supabase-js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const ENV = process.env.NODE_ENV || 'development';

// Local SQLite configuration
const initLocalDb = async () => {
  const db = await open({
    filename: './assignments.db',
    driver: sqlite3.Database
  });
  
  // Create assignments table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      details TEXT NOT NULL,
      assigned_date TEXT,
      due_date TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  return db;
};

// Supabase configuration for live test and production
const getSupabaseClient = () => {
  const supabaseUrl = process.env.ASSIGNMENT_DB_SUPABASE_URL;
  const supabaseKey = ENV === 'production' 
    ? process.env.ASSIGNMENT_DB_SUPABASE_SERVICE_ROLE_KEY
    : process.env.ASSIGNMENT_DB_NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createClient(supabaseUrl, supabaseKey);
};

export const getDbClient = async () => {
  switch (ENV) {
    case 'development':
      return await initLocalDb();
    case 'test':
    case 'production':
      return getSupabaseClient();
    default:
      throw new Error('Invalid environment');
  }
};
