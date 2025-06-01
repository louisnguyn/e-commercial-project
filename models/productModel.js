import sql from '../config/db.js';

export async function getAllAvailableProducts() {
    return await sql `SELECT * FROM product WHERE status = 'Available'`;
}
export async function getProductById(productId) {
    return await sql`
        SELECT p.*, u.fullname AS seller_name
        FROM product p
        JOIN users u ON p.userid = u.id
        WHERE p.id = ${productId} 
    `;
}

export async function getProductsByUserId(userId) {
    return await sql`SELECT * FROM product WHERE userid = ${userId} ORDER BY id`;
}
export async function searchProduct(query) {
    return await sql`
        SELECT * FROM product
        WHERE status = 'Available' AND title ILIKE ${'%' + query + '%'}
    `;
}

export async function getFilteredAndSortedProducts({ query, category, sort, minPrice, maxPrice }){
    let products = sql`SELECT * FROM product WHERE status = 'Available'`;
    if (query) {
        products = sql`${products} AND title ILIKE ${'%' + query + '%'}`;
    }
    if (category) {
        const categories = Array.isArray(category) ? category : [category];
        products = sql`${products} AND category = ANY(${categories})`;
    }
    if (minPrice) {
        products = sql`${products} AND price >= ${minPrice}`;
    }
    if (maxPrice) {
        products = sql`${products} AND price <= ${maxPrice}`;
    }
    if (sort === 'price_asc') {
        products = sql`${products} ORDER BY price ASC`;
    } else if (sort === 'price_desc') {
        products = sql`${products} ORDER BY price DESC`;
    } else if (sort === 'date_newest') {
        products = sql`${products} ORDER BY date DESC`;
    } else if (sort === 'date_oldest') {
        products = sql`${products} ORDER BY date ASC`;
    }
    return await products;
}

export async function createProduct({ title, price,status, quantity,date, description, category, image, userId }) {
    return await sql`
        INSERT INTO product (title, price,status, quantity,date, description, category, image, userid)
        VALUES (${title}, ${price},${status}, ${quantity}, ${date}, ${description}, ${category}, ${image}, ${userId})
        RETURNING *
    `;
}

export async function updateProduct({ id, title, price, quantity, description, category, image }) {
    return await sql`
        UPDATE product
        SET title = ${title}, price = ${price}, quantity = ${quantity}, description = ${description}, category = ${category}, image = ${image}
        WHERE id = ${id}
    `;
}

export async function deleteProduct(productId) {
    return await sql`
        DELETE FROM product WHERE id = ${productId}
    `;
}

export async function toggleProductStatus(productId) {
    return await sql`
        UPDATE product
        SET status = CASE WHEN status = 'Available' THEN 'Unavailable' ELSE 'Available' END
        WHERE id = ${productId}
    `;
}