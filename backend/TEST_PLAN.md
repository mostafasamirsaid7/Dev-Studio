# Backend Test Plan
## Focus: Drizzle Folder Move & Database Layer

### **Executive Summary**
This test plan focuses on verifying the successful migration of the `drizzle` folder from `backend/drizzle` to `backend/src/infrastructure/database/drizzle` and ensuring all database operations continue to work correctly.

### **Current Status** ✅
- ✅ Drizzle folder successfully moved to new location
- ✅ `drizzle.config.ts` updated with correct path: `"./src/infrastructure/database/drizzle"`
- ✅ All existing tests passing (91 tests)
- ✅ Drizzle configuration tests created and passing (6 tests)
- ✅ Migration files preserved: `0001_activity_logs.sql`, `0002_notifications.sql`

### **Test Categories**

#### **1. Configuration Tests** (COMPLETE)
- [x] Verify `drizzle.config.ts` paths are correct
- [x] Verify migration folder exists in new location
- [x] Verify schema.ts file exists and exports correctly
- [x] Verify database index.ts exists and exports correctly
- [x] Verify seed.ts file exists and exports correctly
- [x] Verify seed folder structure exists

#### **2. Database Operation Tests** (PRIORITY)
**2.1 Connection Tests**
- [ ] Test database connection establishment
- [ ] Test connection pooling
- [ ] Test environment variable fallbacks
- [ ] Test SSL configuration for Neon PostgreSQL

**2.2 Migration Tests**
- [ ] Test `drizzle-kit push` command works
- [ ] Test `drizzle-kit generate` creates migrations in new location
- [ ] Test applying existing migrations
- [ ] Test migration rollback

**2.3 Seed Tests**
- [ ] Test `npm run db:seed` command
- [ ] Verify seed data inserts correctly
- [ ] Test idempotent seeding (no duplicates)
- [ ] Test individual seed file imports

#### **3. Repository Layer Tests** (HIGH PRIORITY)
**3.1 Base Repository Tests**
- [ ] Test `DrizzleBaseRepository` CRUD operations
- [ ] Test find methods (findAll, findById, findBy)
- [ ] Test create/update/delete operations
- [ ] Test transaction support

**3.2 Specialized Repository Tests**
- [ ] Test `DrizzleUserProgressRepository` methods
- [ ] Test `DrizzlePlannerTasksRepository` date filtering
- [ ] Test `DrizzleInterviewQuestionsRepository` question filtering
- [ ] Test `DrizzleUnitOfWork` transaction handling

#### **4. Service Layer Tests** (MEDIUM PRIORITY)
**4.1 Base Service Tests**
- [ ] Test `BaseService` abstract class
- [ ] Test dependency injection
- [ ] Test error handling

**4.2 Domain Service Tests** (Sample critical services)
- [ ] Test `AuthService` registration/login
- [ ] Test `ChatService` message handling
- [ ] Test `CVService` profile operations
- [ ] Test `PlannerService` task management

#### **5. API Layer Tests** (MEDIUM PRIORITY)
**5.1 Controller Tests** (Existing tests passing)
- [x] Auth controller tests (50 tests)
- [x] Chat controller tests (2 tests)
- [ ] Additional controller tests needed

**5.2 Integration Tests**
- [ ] Test complete API request flow
- [ ] Test database operations in API context
- [ ] Test error scenarios

### **Test Implementation Timeline**

#### **Phase 1: Immediate (Week 1)**
1. **Database Connection Tests** - Create tests for `src/infrastructure/database/index.ts`
2. **Migration Command Tests** - Test drizzle-kit commands with new path
3. **Seed Command Tests** - Test `npm run db:seed` functionality

#### **Phase 2: Short-term (Week 2)**
1. **Base Repository Tests** - Test `DrizzleBaseRepository`
2. **Unit of Work Tests** - Test `DrizzleUnitOfWork` transactions
3. **Critical Service Tests** - Test `AuthService`, `ChatService`

#### **Phase 3: Medium-term (Week 3-4)**
1. **All Repository Tests** - Test all specialized repositories
2. **Remaining Service Tests** - Test all domain services
3. **Integration Tests** - End-to-end API tests

### **Test Environment Setup**

#### **Test Database Configuration**
```env
# .env.test
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dev_studio_test
TEST_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dev_studio_test
```

#### **Test Scripts** (Add to package.json)
```json
{
  "scripts": {
    "test:db": "vitest run src/tests/database/*.test.ts",
    "test:repos": "vitest run src/tests/repositories/*.test.ts",
    "test:services": "vitest run src/tests/services/*.test.ts",
    "test:api": "vitest run src/tests/api/*.test.ts",
    "test:integration": "vitest run src/tests/integration/*.test.ts",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest"
  }
}
```

### **Critical Test Cases for Drizzle Move**

#### **1. Migration Path Verification**
```typescript
test('drizzle-kit uses correct migration path', async () => {
  const result = await execa('npx', ['drizzle-kit', 'check']);
  expect(result.stdout).toContain('Everything\'s fine');
});
```

#### **2. Database Connection with New Structure**
```typescript
test('database connection works with moved drizzle', async () => {
  const { db, pool } = await import('../src/infrastructure/database/index.js');
  expect(db).toBeDefined();
  expect(pool).toBeDefined();
  
  // Test simple query
  const result = await db.select().from({} as any).limit(1);
  expect(result).toBeDefined();
});
```

#### **3. Seed Script Execution**
```typescript
test('seed script runs without errors', async () => {
  const { runSeeding } = await import('../src/infrastructure/database/seed.js');
  await expect(runSeeding()).resolves.not.toThrow();
});
```

### **Risk Assessment**

#### **High Risk Areas**
1. **Migration Path References** - Any hardcoded references to old path
2. **Database Connection** - Connection string resolution with new structure
3. **Seed Script Dependencies** - Import paths in seed files

#### **Mitigation Strategies**
1. **Comprehensive Search** - Already completed, found only test snippet reference
2. **Incremental Testing** - Test each layer independently
3. **Rollback Plan** - Keep backup of original structure until verified

### **Success Criteria**

#### **Immediate (Week 1)**
- [x] All existing tests pass ✓
- [x] Drizzle configuration tests pass ✓
- [ ] Database connection tests pass
- [ ] Migration command tests pass
- [ ] Seed command tests pass

#### **Short-term (Week 2)**
- [ ] Repository layer tests pass
- [ ] Critical service tests pass
- [ ] Test coverage > 70% for database layer

#### **Long-term (Month 1)**
- [ ] Full test suite for backend
- [ ] Test coverage > 80% overall
- [ ] Integration tests for all major features
- [ ] Performance tests for database operations

### **Next Steps**

1. **Create test database** - Set up isolated test database
2. **Implement connection tests** - Test database layer
3. **Test migration commands** - Verify drizzle-kit works
4. **Test seed script** - Verify data seeding works
5. **Expand test coverage** - Add repository and service tests

### **Documentation**
- [x] Test plan document created
- [ ] Test results log
- [ ] Coverage reports
- [ ] Performance benchmarks

---
**Last Updated**: May 24, 2026  
**Test Status**: 6/91 tests implemented (configuration layer complete)  
**Overall Progress**: Configuration verified, operational tests pending