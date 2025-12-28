import express from 'express';
import db from '../config/db.js';
import md5 from 'md5';

const app = express();
const api = express.Router();

// Create new user
const createUserAsync = async (req, res) => {
    
    const error = [];

    if(!req.body.username) {
        error.push('Username is required');
    }

    if(!req.body.password) {
        error.push('Password is required');
    }

    if(!req.body.email) {
        error.push('Email is required');
    }

    const existingUser = await findUserByEmailAsync(req.body.email);

    console.log('Existing user:', existingUser);

    if(existingUser) {
        error.push('Email already in use');
    }

    if(error.length > 0) {
        return res.status(400).json({ errors: error });
    }

    const data = {
        username: req.body.username,
        password: md5(req.body.password),
        email: req.body.email   
    }

    const sql = 'INSERT INTO user (username, email, password_hash) VALUES (?, ?, ?)';
    const params = [data.username, data.email, data.password];

    try {
        const [result] = await db.query(sql, params);
        return res.redirect('/')
    } catch (err) {
        return res.status(500).json({ error: 'Database error', details: err.message });
    }

};


const findUserByEmailAsync = async (email) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    const params = [email];
    const [rows] = await db.query(sql, params);
    return rows[0];
};

export default {
    createUserAsync,
    findUserByEmailAsync
};