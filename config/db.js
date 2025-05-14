import postgres from "postgres";
import dotenv from 'dotenv';
dotenv.config();
const sql = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false,
})
export default sql;

(async () => {
    try {
        let result = await sql`SELECT NOW()`;
        console.log(`Connection was successful ${result[0].now}`);
    } catch (error) {
        console.error(`Failed to connect to the DB ${error}`);
    }
})();