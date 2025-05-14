import fs from 'fs';
import path from 'path';
import sql from './db.js';
const migrationsFolder = './migrations';
async function runDrop(fileName) {
    const filePath = path.join(migrationsFolder, fileName);
    const sqlQuery = fs.readFileSync(filePath, 'utf-8');
    try {
        console.log(`Running drop script: ${fileName}`);
        await sql.unsafe(sqlQuery);
        console.log(`Drop script ${fileName} executed successfully.`);
    } catch (error) {
        console.error(`Failed to execute drop script ${fileName}:`, error.message);
    }
}
async function drop() {
    const files = fs.readdirSync(migrationsFolder).filter(file => file.startsWith('drop') && file.endsWith('.sql'));
    for (const file of files) {
        await runDrop(file);
    }
    console.log('All drop scripts executed.');
    process.exit(0);
}
drop();