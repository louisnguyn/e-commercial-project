import sql from '../config/db.js';

export async function addToCart({ userId, productId, quantity }) {
    const [product] = await sql`
        SELECT quantity FROM product WHERE id = ${productId}
    `;
    if (!product) throw new Error('Product not found');
    const [cartItem] = await sql`
        SELECT quantity FROM cart WHERE userid = ${userId} AND productid = ${productId}
    `;
    const cartQuantity = cartItem ? cartItem.quantity : 0;
    const maxAddable = product.quantity - cartQuantity;
    const addQuantity = Math.max(0, Math.min(quantity, maxAddable));

    if (addQuantity === 0) {
        return { success: false, message: 'Cannot add more than available stock' };
    }

    if (cartItem) {
        await sql`
            UPDATE cart SET quantity = quantity + ${addQuantity}
            WHERE userid = ${userId} AND productid = ${productId}
        `;
    } else {
        await sql`
            INSERT INTO cart (userid, productid, quantity)
            VALUES (${userId}, ${productId}, ${addQuantity})
        `;
    }
    return { success: true, added: addQuantity };
}

export async function getCartByUserId(userId) {
    return await sql`
        SELECT c.*, p.title, p.price, p.image, p.quantity as product_quantity
        FROM cart c
        JOIN product p ON c.productid = p.id
        WHERE c.userid = ${userId}
        ORDER BY price ASC
    `;
}

export async function removeFromCart({ userId, productId }) {
    return await sql`
        DELETE FROM cart WHERE userid = ${userId} AND productid = ${productId}
    `;
}

export async function getProductQuantityById(productId){
    return await sql`
        SELECT quantity FROM product WHERE id = ${productId}
    `;
}

export async function getProductQuantityInCart({userId,productId}){
    return await sql`
        SELECT quantity FROM cart WHERE userid = ${userId} AND productid = ${productId}
    `;
}

export async function updateCartQuantityByProduct({userId,productId,quantity}){
    return await sql`
        UPDATE cart SET quantity = ${quantity}
        WHERE userid = ${userId} AND productid = ${productId}
    `;
}