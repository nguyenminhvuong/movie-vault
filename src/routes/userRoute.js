import express from 'express';

const router = express.Router();

//user signup route
router.post('/signup', async (req, res) => {

    console.log('Signup request received:', req.body);

});

export default router;