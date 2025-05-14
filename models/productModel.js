import sql from '../config/db.js';

export async function getAllAvailableProducts() {
    return await sql `SELECT * FROM product WHERE status = 'Available'`;
}
export async function getProductById(productId) {
    return await sql`SELECT * FROM product WHERE id = ${productId}`;
}

export async function getProductsByUserId(userId) {
    return await sql`SELECT * FROM product WHERE userid = ${userId}`;
}