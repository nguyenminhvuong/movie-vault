import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

//user signup route
router.post('/signup', userController.createUserAsync);

export default router;