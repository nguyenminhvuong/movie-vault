import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

//user signup route
router.post('/signup', userController.createUserAsync);
router.post('/login', userController.loginUserAsync);
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out. Please try again.' });
        }
        res.redirect('/');
    });
});

export default router;