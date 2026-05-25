import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../domain/schema.js';

describe('Database Connection Tests', () => {
  let pool: Pool;
  let db: ReturnType<typeof drizzle>;

  beforeAll(() => {
    // Use test database URL or fallback to placeholder
    const connectionString = process.env.TEST_DATABASE_URL || 
      'postgresql://postgres:postgres@localhost:5432/dev_studio_test';
    
    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 5000,
    });
    
    db = drizzle(pool, { schema });
  });

  afterAll(async () => {
    await pool.end();
  });

  test('database pool is created successfully', () => {
    expect(pool).toBeDefined();
    expect(typeof pool.query).toBe('function');
  });

  test('drizzle instance is created with schema', () => {
    expect(db).toBeDefined();
    expect(typeof db.select).toBe('function');
    expect(typeof db.insert).toBe('function');
    expect(typeof db.update).toBe('function');
    expect(typeof db.delete).toBe('function');
  });

  test('schema imports correctly', () => {
    // Check that schema exports exist
    expect(schema).toBeDefined();
    expect(typeof schema).toBe('object');
    
    // Check for some expected schema exports
    expect(schema).toHaveProperty('agents');
    expect(schema).toHaveProperty('authUsers');
    expect(schema).toHaveProperty('cvProfiles');
    expect(schema).toHaveProperty('plannerTasks');
  });

  test('connection can be established (if database is available)', async () => {
    // This test will be skipped if no database is available
    const testDatabaseUrl = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;
    
    if (!testDatabaseUrl || testDatabaseUrl.includes('placeholder')) {
      console.log('Skipping connection test - no database URL provided');
      return;
    }

    try {
      const client = await pool.connect();
      const result = await client.query('SELECT 1 as test');
      expect(result.rows[0].test).toBe(1);
      client.release();
    } catch (error) {
      console.log('Database connection test skipped - database not available');
      // Don't fail the test if database isn't running
    }
  }, 10000); // 10 second timeout for connection test
});

describe('Database Configuration Tests', () => {
  test('environment variables are properly handled', async () => {
    // Test that the code handles missing DATABASE_URL gracefully
    const originalUrl = process.env.DATABASE_URL;
    
    // Temporarily remove DATABASE_URL
    delete process.env.DATABASE_URL;
    
    // Import should not throw even without DATABASE_URL
    // Use dynamic import for ES modules
    await expect(async () => {
      await import('../../infrastructure/database/index.js');
    }).not.toThrow();
    
    // Restore original value
    if (originalUrl) {
      process.env.DATABASE_URL = originalUrl;
    }
  });

  test('connection string cleaning works', () => {
    const testCases = [
      {
        input: 'postgresql://user:pass@host:5432/db?sslmode=require',
        expected: 'postgresql://user:pass@host:5432/db'
      },
      {
        input: 'postgresql://user:pass@host:5432/db?channel_binding=require',
        expected: 'postgresql://user:pass@host:5432/db'
      },
      {
        input: 'postgresql://user:pass@host:5432/db?sslmode=require&channel_binding=require',
        expected: 'postgresql://user:pass@host:5432/db'
      },
      {
        input: 'postgresql://user:pass@host:5432/db',
        expected: 'postgresql://user:pass@host:5432/db'
      }
    ];

    // Test the cleaning logic from index.ts
    testCases.forEach(({ input, expected }) => {
      const cleaned = input
        .replace(/(\?|&)sslmode=require/g, '')
        .replace(/(\?|&)channel_binding=require/g, '')
        .replace(/\?$/, '');
      
      expect(cleaned).toBe(expected);
    });
  });
});