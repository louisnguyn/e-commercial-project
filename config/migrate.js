import fs from 'fs';
import path from 'path';
import sql from './db.js';
const migrationsFolder = './migrations';
async function runMigration(fileName) {
    const filePath = path.join(migrationsFolder, fileName);
    const sqlQuery = fs.readFileSync(filePath, 'utf-8');
    try {
        console.log(`Running migration: ${fileName}`);
        await sql.unsafe(sqlQuery);
        console.log(`Migration ${fileName} executed successfully.`);
    } catch (error) {
        console.error(`Failed to execute migration ${fileName}:`, error.message);
    }
}
async function migrate() {
    const files = fs.readdirSync(migrationsFolder).filter(file => file.endsWith('.sql'));
    for (const file of files) {
        await runMigration(file);
    }
    console.log('All migrations executed.');
    process.exit(0);
}
migrate();