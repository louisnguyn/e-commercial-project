import fs from 'fs';
import path from 'path';
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
});
const migrationsDir = path.join(path.resolve(), './migrations');

async function applyMigrations() {
  try {
    const files = fs.readdirSync(migrationsDir).filter(file => file.endsWith('.sql'));
    files.sort();
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sqlQuery = fs.readFileSync(filePath, 'utf8');
      console.log(`Applying migration: ${file}`);
      await sql.unsafe(sqlQuery);
      console.log(`Migration ${file} applied successfully.`);
    }
    console.log('All migrations applied successfully.');
  } catch (err) {
    console.error('Error applying migrations:', err);
  } finally {
    await sql.end();
  }
}

async function dropDatabase() {
  try {
    console.log('Dropping all tables...');
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
    `;
    for (const table of tables) {
      await sql.unsafe(`DROP TABLE IF EXISTS ${table.table_name} CASCADE;`);
      console.log(`Dropped table: ${table.table_name}`);
    }

    console.log('All tables dropped successfully.');
  } catch (err) {
    console.error('Error dropping tables:', err);
  } finally {
    await sql.end();
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Please provide a command: migrate or drop');
  process.exit(1);
}

const command = args[0];

if (command === 'migrate') {
  applyMigrations();
} else if (command === 'drop') {
  dropDatabase();
} else {
  console.log('Invalid command. Use "migrate" to apply migrations or "drop" to drop all tables.');
  process.exit(1);
}