import db from '../config/db.js';

exports.fetchUsers = async () => {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
};