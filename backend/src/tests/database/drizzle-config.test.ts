import { describe, test, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('Drizzle Configuration Tests', () => {
  test('drizzle.config.ts exists and has correct paths', () => {
    const configPath = join(process.cwd(), 'drizzle.config.ts');
    expect(existsSync(configPath)).toBe(true);
    
    const configContent = readFileSync(configPath, 'utf-8');
    
    // Check for new path
    expect(configContent).toContain('out: "./src/infrastructure/database/drizzle"');
    
    // Check for schema path
    expect(configContent).toContain('schema: "./src/domain/schema.ts"');
    
    // Check for dialect
    expect(configContent).toContain('dialect: "postgresql"');
  });
  
  test('migration folder exists in new location', () => {
    const migrationPath = join(process.cwd(), 'src', 'infrastructure', 'database', 'drizzle');
    expect(existsSync(migrationPath)).toBe(true);
    
    // Check for migration files
    const files = ['0001_activity_logs.sql', '0002_notifications.sql'];
    files.forEach(file => {
      const filePath = join(migrationPath, file);
      expect(existsSync(filePath)).toBe(true);
    });
    
    // Check for meta folder
    const metaPath = join(migrationPath, 'meta');
    expect(existsSync(metaPath)).toBe(true);
    
    // Check for journal file
    const journalPath = join(metaPath, '_journal.json');
    expect(existsSync(journalPath)).toBe(true);
  });
  
  test('schema.ts file exists and exports correctly', () => {
    const schemaPath = join(process.cwd(), 'src', 'domain', 'schema.ts');
    expect(existsSync(schemaPath)).toBe(true);
    
    const schemaContent = readFileSync(schemaPath, 'utf-8');
    
    // Check for exports from schema folder
    expect(schemaContent).toContain('export * from "./schema/core.js"');
    expect(schemaContent).toContain('export * from "./schema/auth.js"');
    expect(schemaContent).toContain('export * from "./schema/cv.js"');
  });
  
  test('database index.ts exists and exports db and pool', () => {
    const dbIndexPath = join(process.cwd(), 'src', 'infrastructure', 'database', 'index.ts');
    expect(existsSync(dbIndexPath)).toBe(true);
    
    const dbIndexContent = readFileSync(dbIndexPath, 'utf-8');
    
    // Check for imports
    expect(dbIndexContent).toContain('import { drizzle } from "drizzle-orm/node-postgres"');
    expect(dbIndexContent).toContain('import * as schema from "../../domain/schema.js"');
    
    // Check for exports
    expect(dbIndexContent).toContain('export const db = drizzle(pool, { schema })');
    expect(dbIndexContent).toContain('export const pool = new Pool({');
  });
});

describe('Database Seed Tests', () => {
  test('seed.ts file exists and exports runSeeding function', () => {
    const seedPath = join(process.cwd(), 'src', 'infrastructure', 'database', 'seed.ts');
    expect(existsSync(seedPath)).toBe(true);
    
    const seedContent = readFileSync(seedPath, 'utf-8');
    
    // Check for exports
    expect(seedContent).toContain('export async function runSeeding()');
    
    // Check for imports
    expect(seedContent).toContain('import { db, pool } from "./index.js"');
    expect(seedContent).toContain('import { count as countFn } from "drizzle-orm"');
  });
  
  test('seed folder structure exists', () => {
    const seedsPath = join(process.cwd(), 'src', 'infrastructure', 'database', 'seeds');
    expect(existsSync(seedsPath)).toBe(true);
    
    // Check for some seed files (they have .ts extensions)
    const seedFiles = [
      'interview-questions.ts',
      'prompts.ts',
      'agents.ts',
      'components.ts',
      'snippets.ts',
      'templates.ts',
      'cv.ts',
      'jobs.ts',
      'planner-tasks.ts',
      'conversations.ts'
    ];
    
    seedFiles.forEach(file => {
      const filePath = join(seedsPath, file);
      expect(existsSync(filePath)).toBe(true);
    });
  });
});