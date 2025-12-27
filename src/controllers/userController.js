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
        return res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (err) {
        return res.status(500).json({ error: 'Database error', details: err.message });
    }

};

export default {
    createUserAsync
};