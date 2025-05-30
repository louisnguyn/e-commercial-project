import sql from '../config/db.js';

export async function addReview({ productId, sellerId, userId, rating, feedback }) {
    return await sql`
        INSERT INTO review (productid, sellerid, userid, rating, feedback)
        VALUES (${productId}, ${sellerId}, ${userId}, ${rating}, ${feedback})
    `;
}

export async function getReviewsByProductId(productid) {
    return await sql`
        SELECT r.*, u.fullname AS reviewer_name
        FROM review r
        JOIN users u ON r.userid = u.id
        WHERE r.productid = ${productid}
        ORDER BY r.createdat DESC
    `;
}

export async function getAverageRatingBySellerId(sellerid) {
    return await sql`
        SELECT AVG(r.rating) as avg_rating, COUNT(r.id) as total_reviews
        FROM review r
        WHERE r.sellerid = ${sellerid}
    `;
}

export async function hasUserReviewProduct(productId, userId){
    const result = await sql`
        SELECT EXISTS(
            SELECT 1 FROM review 
            WHERE productid = ${productId} AND userid = ${userId}
        ) as has_reviewed
    `;
    return result[0].has_reviewed;
}