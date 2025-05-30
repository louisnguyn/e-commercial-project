import sql from '../config/db.js';

export async function getUserById(userId) {
    return await sql`
        SELECT fullname, email, phonenumber 
        FROM users WHERE id = ${userId}
    `;
}

export async function getUserPasswordById(userId) {
    return await sql`
        SELECT password FROM users WHERE id = ${userId}
    `;
}

export async function createUser({ fullName, email, phoneNumber, hashedPassword, securityQuestion, hashedAnswer }) {
    return await sql`
        INSERT INTO users (fullname, email, phonenumber, password, securityquestion, securityanswer)
        VALUES (${fullName}, ${email}, ${phoneNumber}, ${hashedPassword}, ${securityQuestion}, ${hashedAnswer})
    `;
}

export async function getUserByEmail(email) {
    return await sql`
        SELECT * FROM users WHERE email = ${email}
    `;
}
export async function checkExistingEmail(email, userId) {
    return await sql`
        SELECT id FROM users 
        WHERE email = ${email} AND id != ${userId}
    `;
}

export async function updateUserProfile({ userId, fullName, email, phoneNumber }) {
    return await sql`
        UPDATE users 
        SET fullname = ${fullName}, 
            email = ${email}, 
            phonenumber = ${phoneNumber}
        WHERE id = ${userId}
    `;
}

export async function updateUserPassword({ userId, hashedPassword }) {
    return await sql`
        UPDATE users 
        SET password = ${hashedPassword}
        WHERE id = ${userId}
    `;
}