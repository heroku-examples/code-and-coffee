#!/usr/bin/env node

/**
 * Database Initialization Script
 *
 * This script initializes the PostgreSQL database schema.
 * It can be run independently from the main application.
 *
 * Usage:
 *   node scripts/init-db.js
 *   or
 *   pnpm run db:init
 */

// Load environment variables
import 'dotenv/config';

// Import the database connection and initialization function
import { pool, initializeDatabase } from '../app/lib/db';

async function main() {
  console.log('🚀 Starting database initialization...');

  try {
    // Check if we can connect to the database
    console.log('📡 Testing database connection...');
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');

    // Initialize the database schema
    console.log('🔧 Creating database schema...');
    await initializeDatabase();
    console.log('✅ Database schema created successfully');

    // Test the schema by running a simple query
    console.log('🧪 Testing schema...');
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'quiz_responses'
    `);

    if (result.rows.length > 0) {
      console.log('✅ Schema validation successful - quiz_responses table exists');
    } else {
      console.log('❌ Schema validation failed - quiz_responses table not found');
      process.exit(1);
    }

    console.log('🎉 Database initialization completed successfully!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);

    // Provide helpful error messages for common issues
    if (error && typeof error === 'object' && 'code' in error) {
      const errorCode = (error as { code: string }).code;
      if (errorCode === 'ENOTFOUND') {
        console.error('\n💡 Hint: Make sure PostgreSQL is running and the DATABASE_URL is correct');
      } else if (errorCode === 'ECONNREFUSED') {
        console.error('\n💡 Hint: PostgreSQL server is not accepting connections');
      } else if (errorCode === '3D000') {
        console.error(
          '\n💡 Hint: The database does not exist. Create it first with: createdb coffee_quiz'
        );
      } else if (errorCode === '28P01') {
        console.error('\n💡 Hint: Authentication failed. Check your DATABASE_URL credentials');
      }
    }

    process.exit(1);
  } finally {
    // Close the database connection
    await pool.end();
    console.log('🔌 Database connection closed');
  }
}

// Handle process signals gracefully
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT. Closing database connection...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM. Closing database connection...');
  await pool.end();
  process.exit(0);
});

// Run the main function
main();
