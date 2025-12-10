const db = require('../utils/db');
const argon2 = require('argon2');

const onboardTenant = async (companyName, managerName, managerEmail) => {
  const client = await db.pool.connect(); // Use the pool from db.js
  try {
    await client.query('BEGIN');

    // 1. Create the tenant
    const tenantQuery = 'INSERT INTO tenants (name) VALUES ($1) RETURNING id';
    const tenantResult = await client.query(tenantQuery, [companyName]);
    const tenantId = tenantResult.rows[0].id;

    // 2. Create the manager user for this tenant
    const tempPassword = 'DefaultPassword123!'; // In a real app, this would be generated
    const passwordHash = await argon2.hash(tempPassword);
    const userQuery = 'INSERT INTO users (tenant_id, full_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id';
    const userResult = await client.query(userQuery, [tenantId, managerName, managerEmail, passwordHash]);
    const userId = userResult.rows[0].id;

    // 3. Assign the 'manager' role to the new user
    const roleQuery = 'SELECT id FROM roles WHERE name = $1';
    const roleResult = await client.query(roleQuery, ['manager']);
    const managerRoleId = roleResult.rows[0].id;

    const userRoleQuery = 'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)';
    await client.query(userRoleQuery, [userId, managerRoleId]);

    await client.query('COMMIT');
    return { tenantId, userId, message: 'Tenant onboarded successfully.' };
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

const resetDatabase = async () => {
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Wipe the tables in the correct order to respect foreign keys
    await client.query('TRUNCATE TABLE user_roles, users, tenants RESTART IDENTITY CASCADE');

    // 2. Re-seed the system admin user (same logic as your initial SQL script)
    const adminPasswordHash = await argon2.hash("AdminPassword123!"); // Ensure this matches your known password
    const adminUserQuery = 'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id';
    const userResult = await client.query(adminUserQuery, ['System Admin', 'admin@abclimited.com', adminPasswordHash]);
    const adminUserId = userResult.rows[0].id;

    const roleQuery = 'SELECT id FROM roles WHERE name = $1';
    const roleResult = await client.query(roleQuery, ['system_admin']);
    const adminRoleId = roleResult.rows[0].id;

    const userRoleQuery = 'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)';
    await client.query(userRoleQuery, [adminUserId, adminRoleId]);
    
    await client.query('COMMIT');
    return { message: 'Database reset to initial state.' };
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

module.exports = {
  onboardTenant,
  resetDatabase
};